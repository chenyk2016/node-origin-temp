const mysql = require('mysql')

const connection = mysql.createConnection({
  host:'127.0.0.1', //域名,
  port:'3306', //端口,
  user:'root', //用户,
  password:'chenyksql' , //密码,
  database:'node_origin_temp' , //数据库表,
})

connection.connect(err => {
  if(err) throw err
  console.log('mysql connncted success!')
})

async function doSqlQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (error, results, fields) {
      if (error) throw error
      resolve(results)
    })
  })
}

module.exports = {
  doSqlQuery,
}
