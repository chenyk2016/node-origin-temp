import DB from '../mysql'
import dayjs from 'dayjs'

class UserStock{
  constructor() {
    this.tableName = 'user_stock'
  }

  init() {

  }

  async tableInfo() {
    const columns = await DB.tableColumns(this.tableName)
    return columns
  }

  // 找出所有的的groupId
  async selectAllGroupId() {
    const sql = 'select DISTINCT group_id from user_stock'
    const data = await DB.doSqlQuery(sql)
    return data.map(v => v.group_id)
  }

  async selectByGroupId(group_id) {
    const sql = `
    SELECT * from user_stock
    where group_id = '${group_id}'
    order by create_dt desc
    `
    return DB.doSqlQuery(sql)
  }

  async queryGroupData() {
    let groups = await this.selectAllGroupId()
    groups = groups.filter(v => v !== 'ST')

    let promise = []
    groups.forEach(id => {
      promise.push(this.selectByGroupId(id))
    })

    return Promise.all(promise).then((values) => {
      return values.map((item, i) => {
        return {
          group_id: groups[i],
          data: item,
        }
      })
    })
  }

  async queryAllData() {
    const sql = `
    SELECT * from user_stock
    where group_id != 'ST'
    order by create_dt desc
    `

    return DB.doSqlQuery(sql)
  }

  /**
   *
   * @param {obj} objData {}
   * @param {str} filterKey 'code'
   * @returns
   */
  async updateStock(objData, filterKey = 'code') {
    const data = {
      ...objData,
      update_dt: dayjs().format('YYYY-MM-DD HH-mm-ss'),
    }
    const res = await DB.updateByObj(this.tableName, data, filterKey)

    return res
  }

  /**
   *
   * @param {obj} objData {}
   * @param {str} filterKey 'code'
   * @returns
   */
  async add(objData) {
    const data = {
      ...objData,
      create_dt: dayjs().format('YYYY-MM-DD HH-mm-ss'),
    }
    const res = await DB.insertByObj(this.tableName, data)

    return res
  }
}

export default new UserStock()
