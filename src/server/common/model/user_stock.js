const DB = require('../mysql')

class UserStock{
  constructor() {
    this.tableName = 'user_stock'
  }

  init() {

  }

  async queryByGroup() {
    const sql = `
    SELECT * from user_stock
    where group_id != 'ST'
    order by group_id , short_name , create_dt
    `
    const res = DB.doSqlQuery(sql)
    return res
  }

  async queryStGroup() {
    const sql = `
    SELECT * from user_stock
    where group_id == 'ST'
    order by group_id , short_name , create_dt
    `
    const res = DB.doSqlQuery(sql)
    return res
  }
}

module.exports = UserStock()
