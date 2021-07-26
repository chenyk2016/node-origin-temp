const express = require('express')
require('../common/express-error-handle')
const app = express()
const home = require('./home')
const self = require('./self')

app.use('/', home)
app.use('/self', self)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

module.exports = app