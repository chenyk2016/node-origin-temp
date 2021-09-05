import mysql from 'mysql'
const MYSQL_CONFIG = process.env.MYSQL_CONFIG
import utils from './utils'
import _ from '@/utils'
class DB {
  constructor() {
    this.pool = null

    this.init()
    this.utils = utils
  }

  init() {
    if(!MYSQL_CONFIG) {
      throw new Error('MYSQL_CONFIG变量不存在')
    }
    const config = JSON.parse(MYSQL_CONFIG)

    this.pool = mysql.createPool({
      connectionLimit : 10,
      host: config.host, //域名,
      port: config.port, //端口,
      user: config.user, //用户,
      password: config.password, //密码,
      database: config.database , //数据库表,
    })

    this.doSqlQuery('SELECT 1 + 1 AS solution').then(() => {
      console.log(`mysql connected ${config.user}@${config.host} success!`)
    }).catch(e => {
      console.log(`mysql connected ${config.user}@${config.host} error!!!`, e.message)
    })
  }

  async doSqlQuery(sql) {
    // getConnection
    console.log('====sql:', sql)

    return new Promise((resolve, reject) => {
      this.pool.query(sql, function (error, results, fields) {
        if (error) {
          console.log('====sql error:', error)

          reject(error)
        }
        resolve(results, fields)
      })
    })
  }

  async tableExist(tableName) {
    return new Promise((resolve) => {
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
    const columnsArr = await this.doSqlQuery(sql)

    const resObj = _columns.reduce((resObj, columnName) => {
      if(columnsArr.some(row => row.column_name === columnName) ) {
        resObj[columnName] = true
      }
    }, {})

    return resObj
  }

  // 获取表的列数据和描述
  async tableColumns(tableName) {
    const sql = `
      select column_name column_name,column_comment column_comment from information_schema.Columns where table_name='${tableName}'
    `
    const columnsArr = await this.doSqlQuery(sql)
    return columnsArr
  }

  /**
   *
   * @param {*} tableName
   * @param {*} columnsName ['col_1', 'col_2']
   * @param {*} dataArr ['col_1_value', 'col_2_value']
   * @returns
   */
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

  /**
   * 通过对象的形式插入数据，
   * 会过滤掉 undefined 和 null
   * @param {*} tableName
   * @param {*} dataObjArr | dataObj [{col_1: col_1_value}]
   * @returns
   */
  async insertByObj(tableName, dataObjArr) {
    if(_.isObject(dataObjArr)) {
      dataObjArr = [dataObjArr]
    }
    if(!dataObjArr.length) return '未传插入数据'

    const columnsName = Object.keys(dataObjArr[0])
    // [{col_1: col_1_value}] -> [[col_1_value]]
    const dataArr = dataObjArr.map(item => {
      return columnsName.map(colKey => item[colKey])
    })
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


  // 待验证
  async update(tableName, filters, values) {
    const cleanData = this.utils.cleanObj(values)

    let valueStr = this.utils.objToSqlValStr(cleanData)
    let filterStr = this.utils.objToSqlFiledStr(filters)

    const sql = `
    UPDATE ${tableName} SET ${valueStr} WHERE ${filterStr}
    `
    return sql
  }

  /**
   *
   * @param {*} tableName
   * @param {obj} objValues
   * @param {str} filterKey
   * @returns
   */
  async updateByObj(tableName, objValues, filterKey) {
    const cleanData = this.utils.cleanObj(objValues)

    const filters = `${filterKey} = '${cleanData[filterKey]}'`
    if(!filters) throw `${filterKey}未传`

    let valueStr = this.utils.objToSqlValStr(cleanData)

    const sql = `
    UPDATE ${tableName} SET ${valueStr} WHERE ${filters}
    `

    await this.doSqlQuery(sql)
    return '更新成功'
  }

  /**
   *
   * @param {*} tableName
   * @param {*} columnsStr 'col_1,col_2'
   * @param {*} filterStr ''
   * @returns
   */
  async query (tableName, columnsStr, filterStr) {
    // 设置一个默认条件
    filterStr = filterStr ? filterStr : '1 = 1'

    const sql = `
    select ${columnsStr} from ${tableName} WHERE ${filterStr}
    `

    const data = await this.doSqlQuery(sql)
    return data
  }
}

export default new DB()
