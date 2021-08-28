import express from 'express'
import home from './home'
import self from './self'
import web from './web'
import task from '@server/task'
import test from './test'
import '../common/express-error-handle'

const app = express()

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

app.use('/api', home)
app.use('/api/self', self)
app.use('/api/task', task.router)
app.use('/api/test', test)

app.use('/web', web)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.send(err.stack)
})

export default app