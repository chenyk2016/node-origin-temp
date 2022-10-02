// 注册alias别名
import 'module-alias/register'

// 注册环境变量
import '@/common/env'

// 全局错误捕获
import '@server/common/node-error-handle'
import Task from '@server/task'

import app from '@server/router'
import certificate from '@/public/certificate'
import https from 'https'

const SERVER_CONFIG = process.env.SERVER_CONFIG

// 检查环境变量配置
if (!SERVER_CONFIG) {
  throw "环境变量配置错误";
}

const serverConfig = JSON.parse(SERVER_CONFIG)

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`项目运行在： http://${serverConfig['host']}:${serverConfig['port']}`)
})
// .on('error', (err) => {
//   reject(err)
// })



// https.createServer(certificate, app).listen(serverConfig.port, serverConfig.host, () => {
//   console.log(`项目运行在： https://${serverConfig['host']}:${serverConfig['port']}`)
// })