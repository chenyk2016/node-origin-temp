import express from 'express'
import router from './routeConf';
import '@server/common/express-promise-error-handle';
import myRedis from '@server/redis/redis';
import path from 'path';

const app = express()

myRedis.connect();

// 全局处理
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
// app.use(express.urlencoded()) // 需要验证
// app.use(express.query()) // 需要验证

//static file
app.use('/public', express.static(process.env.rootPath + '/public'));

app.use(myRedis.useSession())

app.use(router);

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.status(500).send(err.stack)
})

export default app