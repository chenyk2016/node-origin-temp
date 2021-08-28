
require('./common/env')
require('./common/node-error-handle')
const app = require('./router')
const certificate = require('../../public/certificate')
const https = require('https')

const SERVER_CONFIG = process.env.SERVER_CONFIG
const serverConfig = JSON.parse(SERVER_CONFIG)

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`项目运行在： http://${serverConfig['host']}:${serverConfig['port']}`)
})

// https.createServer(certificate, app).listen(+serverConfig.port+1, serverConfig.host, () => {
//   console.log(`项目运行在： https://${serverConfig['host']}:${+serverConfig['port'] + 1}`)
// })