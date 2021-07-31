import mysql from 'mysql'
const MYSQL_CONFIG = process.env.MYSQL_CONFIG
class DB {
  constructor() {
    this.connection = null

    // this.init()
  }

  init() {
    if(!MYSQL_CONFIG) {
      throw new Error('MYSQL_CONFIG变量不存在')
    }
    const config = JSON.parse(MYSQL_CONFIG)

    this.connection = mysql.createConnection({
      host: config.host, //域名,
      port: config.port, //端口,
      user: config.user, //用户,
      password: config.password, //密码,
      database: config.database , //数据库表,
    })
    this.connection.connect(err => {
      if(err) throw err
      console.log('mysql connncted success!')
    })
  }

  async doSqlQuery(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, function (error, results, fields) {
        if (error) throw error
        resolve(results, fields)
      })
    })
  }

  async tableExist(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT table_name FROM information_schema.TABLES WHERE table_name ='${tableName}';
      `

      this.doSqlQuery(sql).then(arr => {
        if(arr.length === 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  /**
   * 判断列（多列）是否存在
   * @param {arr} columns 列数组,分割
   * @param {*} tableName
   */
  async columnsExist(columns, tableName) {
    if(!columns) {
      throw new Error('columnsExist: 未传入列名')
    }

    const _columns = columns.split(',')
    const tableExist = await this.tableExist(tableName)

    if(!tableExist) {
      throw new Error(`columnsExist: table-${tableName}不存在`)
    }

    const sql = `
      select column_name,column_comment,column_type,column_key from information_schema.Columns where table_name='${tableName}'
    `
    const columnsArr = this.doSqlQuery(sql)

    const resObj = _columns.reduce((resObj, columnName) => {
      if(columnsArr.some(row => row.column_name === columnName) ) {
        resObj[columnName] = true
      }
    }, {})

    return resObj
  }

  async insert(tableName, columnsName, dataArr) {
    const columnsNameStr = `(${columnsName.join(',')})`
    const dataStr = dataArr.map(data => {
      return `('${data.join('\',\'')}')`
    }).join(',')

    const sql = `
      insert into ${tableName} ${columnsNameStr} VALUES ${dataStr}
    `
    await this.doSqlQuery(sql)

    return '数据插入成功'
    // return sql
  }
}

export default new DB()
