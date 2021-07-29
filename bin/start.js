const shell = require('shelljs')

shell.echo('state.js 开始执行')

let res = shell.exec('npm run start')

if(res.code === 0) {
  shell.echo('执行成功')
  shell.exit(1)
}