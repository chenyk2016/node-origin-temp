/**
 * 对象转换成sql需要的数据
 * {a: 1, b: 2} => 'a = 1, b =2'
 */
export function objToSqlStr(values = {}, split = ',') {
  let str = Object.keys(values).reduce((res, key, i) => {
    return res += `${key} = '${values[key]}'`
  }, '')
  console.log(str)

  return str.replace('&', `${split} `)
}

export default {
  objToSqlValStr(values) {
    return objToSqlStr(values, ',')
  },
  objToSqlFiledStr(values) {
    return objToSqlStr(values, 'and')
  }
}