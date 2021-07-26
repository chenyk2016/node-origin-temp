
require('./common/global-var')
require('./common/node-error-handle')
const port = 3456
const app = require('./router')

app.listen(port, () => {
  console.log(`项目运行在： http://localhost:${port}`)
})