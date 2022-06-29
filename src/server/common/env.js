// 全局变量
import dotenv from 'dotenv'
import path from 'path'

process.env.rootPath = path.resolve('./')
process.env.rootServerPath = path.resolve('./src/server')
dotenv.config({ path: path.resolve('./.env') })
