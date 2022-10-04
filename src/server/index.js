// 注册alias别名
import 'module-alias/register'
// 注册环境变量
import '@server/common/env'
// 全局错误捕获
import '@server/common/node-error-handle'
// 路由
import app from '@server/router'
// https
import certificate from '@root/public/certificate'
import https from 'https'
import myRedis from '@/server/redis/redis';

// 启动服务
async function startServer () {
  // 解析环境变量
  let serverConfig;
  try {
    const SERVER_CONFIG = process.env.SERVER_CONFIG
    serverConfig = JSON.parse(SERVER_CONFIG)
  } catch (error) {
    throw new Error("环境变量配置错误")
  }

  if (serverConfig.useHttps) {
    https.createServer(certificate, app).listen(serverConfig.port, serverConfig.host, () => {
      console.log(`项目运行在： https://${serverConfig['host']}:${serverConfig['port']}`)
    })
  } else {
    app.listen(serverConfig.port, serverConfig.host, () => {
      console.log(`项目运行在： http://${serverConfig['host']}:${serverConfig['port']}`)
    })
  }
}

async function doAfterStarted() {
  // 启动服务后运行的任务
  // myRedis.connect();
}

startServer().then(() => {
  doAfterStarted()
})
