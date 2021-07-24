const express = require('express')
const DB = require('./sql')
const port = 3456

const app = express()
const doSqlQuery = DB.doSqlQuery

app.get('/', (req, res) => {
  res.send('Hi')
})

app.get('/user', (req, res) => {
  doSqlQuery('select * from user').then(data => {
    console.log('======doSqlQuery', data)

    res.send(data)
  }).catch(e => {
    console.log('======doSqlQuery', e)
    res.send(e)
  })
})

// 错误处理
app.use(function (err, req, res, next) {
  console.log('======err', err)
  res.status(500)
  res.render('error', { error: err })
})

app.listen(port, () => {
  console.log(`项目运行在： http://localhost:${port}`)
})