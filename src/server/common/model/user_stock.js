import DB from '../mysql'

class UserStock{
  constructor() {
    this.tableName = 'user_stock'
  }

  init() {

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
    order by group_id , short_name , create_dt
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

  async updateStock(filters, values) {
    const res = DB.update('user_stock', {
      short_name: '中公教育'
    }, {
      code: '00',
    })

    return res
  }
}

export default new UserStock()
