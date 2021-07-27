// 全局变量
const dotenv = require('dotenv')
const path = require('path')

process.env.rootPath = path.resolve('./')
process.env.rootServerPath = path.resolve('./src/server')
dotenv.config({ path: path.resolve('./.env.local') })
