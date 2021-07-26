const express = require('express')
require('./common/express-error-handle')
require('./common/node-error-handle')
const DB = require('./common/mysql')
const port = 3456
const readExcel = require('./wheel/excel-read').readExcel
const path = require('path')

const app = express()
const doSqlQuery = DB.doSqlQuery

app.get('/', (req, res) => {
  res.send('Hi')
})

app.get('/user', (req, res) => {
  doSqlQuery('select * from user').then(data => {
    res.send(data)
  }).catch(e => {
    res.send(e)
  })
})

app.get('/excel', (req, res) => {
  readExcel(path.resolve(__dirname, '../../public/data.xls')).then(data => {
    const tableName = ['user_stock', 'user_stock', 'china_stock']
    let tableInfo = []

    // 创建表
    data.forEach((table, indexI) => {
      console.log(indexI)

      // const createTableColumns = table.data[0].map((column, indexJ) => {
      //   return `${table.data[1][indexJ]} ${table.data[2][indexJ]} COMMENT '${column}'`
      // }).join(',').slice(1)

      // console.log(createTableColumns)

      const columnsData = table.data.slice(3).filter(row => {
        if(row.length === 0) {
          return false
        }

        return true
      })

      tableInfo[indexI] = {
        name: tableName[indexI],
        columns: table.data[1],
        // createTable: `create Table ${tableName[indexI]}(${createTableColumns})`,
        data: columnsData,
      }
    })

    DB.insert(tableInfo[2].name, tableInfo[2].columns, tableInfo[2].data).then((data) => {
      // console.log('插入数据成功')
      res.send(data)
    })
  }).catch(e => {
    res.send(e)
  })
})

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

app.listen(port, () => {
  console.log(`项目运行在： http://localhost:${port}`)
})