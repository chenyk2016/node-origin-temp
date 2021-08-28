const express = require('express')
require('../common/express-error-handle')
const app = express()
const home = require('./home')
const self = require('./self')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() == 'options')
    res.send(200)  //让options尝试请求快速结束
  else
    next()
})
app.use('/', home)
app.use('/self', self)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

module.exports = app