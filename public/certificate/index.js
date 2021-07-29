const fs = require('fs')
const path = require('path')

// 根据项目的路径导入生成的证书文件
const privateKey = fs.readFileSync(path.resolve(__dirname, './server.key'), 'utf8')
const certificate = fs.readFileSync(path.resolve(__dirname, './server.crt'), 'utf8')

module.exports = {
  key: privateKey,
  cert: certificate,
}
