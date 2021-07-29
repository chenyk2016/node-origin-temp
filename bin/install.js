const { execFile, execFileSync, exec } = require('child_process')

async function execProcess(params) {
  console.log(params)
  return new Promise((resolve, reject) => {
    exec(params, function(err, stdout, stderr) {
      if(err) throw err
      console.log(stdout)
      resolve()
    })
  })
}

execProcess('cd ../').then(() => {
  return execProcess('pwd')
}).then(() => {
  return execProcess('npm install')
}).then(() => {
  execFileSync('start.js', () => {

  })
})
