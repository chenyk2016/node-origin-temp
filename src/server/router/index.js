import express from 'express'
import web from './web'
import home from './home'
import httpTest from './http-test'
import '../common/express-error-handle'

const app = express()

app.set('etag', false)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS')

  if (req.method.toLowerCase() == 'options')
    res.send(200)  //让options尝试请求快速结束
  else
    next()
})

app.use(express.json())


app.use('/', home)
app.use('/web', web)
app.use('/http-test', httpTest)

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.status(500).send(err.stack)
})

export default app