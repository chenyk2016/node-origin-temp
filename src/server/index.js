// 注册alias别名
import 'module-alias/register'

// 注册环境变量
import './common/env'

// 全局错误捕获
import './common/node-error-handle'

import app from './router'
import certificate from '../../public/certificate'
import https from 'https'

const SERVER_CONFIG = process.env.SERVER_CONFIG
const serverConfig = JSON.parse(SERVER_CONFIG)

// app.listen(serverConfig.port, serverConfig.host, () => {
//   console.log(`项目运行在： http://${serverConfig['host']}:${serverConfig['port']}`)
// })

https.createServer(certificate, app).listen(serverConfig.port, serverConfig.host, () => {
  console.log(`项目运行在： https://${serverConfig['host']}:${serverConfig['port']}`)
})