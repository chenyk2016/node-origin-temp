// 注册alias别名
import 'module-alias/register'

// 注册环境变量
import './common/env'

// 全局错误捕获
import './common/node-error-handle'
import DB from '@server/common/mysql'
import Task from '@server/task'

import app from './router'
import certificate from '../../public/certificate'
import https from 'https'

const SERVER_CONFIG = process.env.SERVER_CONFIG
const serverConfig = JSON.parse(SERVER_CONFIG)

DB.connect().then(() => {
  return new Promise((resolve) => {
    app
      .listen(serverConfig.port, serverConfig.host, () => {
        resolve()
      })
      // .on('error', (err) => {
      //   reject(err)
      // })
  })
}).then(() => {
  console.log(`项目运行在： http://${serverConfig['host']}:${serverConfig['port']}`)

  // 启动固定任务
  Task.manager.start()
})



// https.createServer(certificate, app).listen(serverConfig.port, serverConfig.host, () => {
//   console.log(`项目运行在： https://${serverConfig['host']}:${serverConfig['port']}`)
// })