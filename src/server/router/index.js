import express from 'express'
import routes from './routeConf';

const app = express()

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

// 注册用户路由
app.get('/', (req, res) => {
  const env = process.env.NODE_ENV;
  res.send({
    message: `Hi，当前运行环境 ${env}`,
    routers: routes.map(item => ({
      name: item.name,
      path: item.path,
    }))
  })
})


routes.forEach(route => {
  app.use(route.path, route.router);
})

app.get('*', (req, res) => {
  res.status(404).send('路径不存在')
})

// 路由全局错误处理
app.use(function (err, req, res, next) {
  res.status(500).send(err.stack)
})

export default app