import express from 'express'
import home from './home'
import self from './self'
import '../common/express-error-handle'

const app = express()

app.use('/', home)
app.use('/self', self)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

export default app