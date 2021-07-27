const DB = require('../common/mysql')
const readExcel = require('../wheel/excel-read').readExcel
const path = require('path')
const doSqlQuery = DB.doSqlQuery
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  const env = process.env.NODE_ENV
  res.send(`Hi，当前运行环境 ${env}`)
})

router.get('/user', (req, res) => {
  doSqlQuery('select * from user').then(data => {
    res.send(JSON.stringify(data))
  }).catch(e => {
    res.send(e)
  })
})

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

router.get('/file', (req, res) => {
  const referer = req.headers.referer
  const hostname = referer && new URL(referer).hostname

  if(hostname === 'localhost' || hostname === 'fsgame.huaxiaoinfo.com' || hostname === '47.110.249.94') {
    res.download(path.resolve('./public/static/test.txt'), 'test.txt', function(err) {
      if(err) {
        res.send(err.stack)
      }
    })
  } else {
    res.send('下载非法')
  }
})

module.exports = router