import express from 'express'
import home from './home'
import self from './self'
import web from './web'
import '../common/express-error-handle'

const app = express()

app.use('/api', home)
app.use('/api/self', self)

app.use('/', web)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

export default app