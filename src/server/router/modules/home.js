import readExcel from '@server/lib/excel-read'
import path from 'path'
import express from 'express'

const router = express.Router()


router.get('/excel', (req, res) => {
  readExcel(path.resolve('./public/data.xls')).then(data => {

    res.send(data)
    // const tableName = ['user_stock', 'user_stock', 'china_stock']
    // let tableInfo = []

    // // 创建表
    // data.forEach((table, indexI) => {
    //   console.log(indexI)

    //   // const createTableColumns = table.data[0].map((column, indexJ) => {
    //   //   return `${table.data[1][indexJ]} ${table.data[2][indexJ]} COMMENT '${column}'`
    //   // }).join(',').slice(1)

    //   // console.log(createTableColumns)

    //   const columnsData = table.data.slice(3).filter(row => {
    //     if(row.length === 0) {
    //       return false
    //     }

    //     return true
    //   })

    //   tableInfo[indexI] = {
    //     name: tableName[indexI],
    //     columns: table.data[1],
    //     // createTable: `create Table ${tableName[indexI]}(${createTableColumns})`,
    //     data: columnsData,
    //   }
    // })

    // DB.insert(tableInfo[2].name, tableInfo[2].columns, tableInfo[2].data).then((data) => {
    //   // console.log('插入数据成功')
    //   res.send(data)
    // })
  }).catch(e => {
    res.send(e)
  })
})

router.get('/file/:filename', (req, res) => {
  const filename = req.params.filename
  const referer = req.headers.referer
  const hostname = referer && new URL(referer).hostname
  let whiteHost = ['fsgame.huaxiaoinfo.com'] // 空都允许

  if(process.env.NODE_ENV === 'development') {
    whiteHost = ['app.chen.com']
  }
  if(whiteHost.length === 0 || whiteHost.includes(hostname)) {
    res.download(path.resolve(`./public/download/${filename}`), filename, function(err) {
      if(err) {
        res.send(err.status === 404 ? '文件不存在' : '读取文件失败')
      }
    })
  } else {
    res.send('下载地址不合法, 请前往 <a href="https://fsgame.huaxiaoinfo.com">https://fsgame.huaxiaoinfo.com</a> 下载')
  }
})

export default router