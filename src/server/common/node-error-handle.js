// node错误全局捕获处理
process.on('uncaughtException',function(err){
  console.log('出错了:', err)
})