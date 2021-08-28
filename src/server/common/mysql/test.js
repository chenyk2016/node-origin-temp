const TABLE_NAME = 'test_table'
const COLUMNS = ['col_1', 'col_2']
import DB from './index'

async function test_insert() {
  await DB.insert(TABLE_NAME, COLUMNS, [
    [1,2],
    [3,4]
  ])

  return '插入测试成功'
}

async function test_insert_by_obj() {
  await DB.insertByObj(TABLE_NAME, [
    {
      col_1: 5,
    }
  ])

  return '对象形式插入测试成功'
}



async function doTest () {
  const msg = []
  msg.push(await test_insert())
  msg.push(await test_insert_by_obj())

  return msg.join(',\n')
}

export default doTest