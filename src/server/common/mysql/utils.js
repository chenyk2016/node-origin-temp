/**
 * 对象转换成sql需要的数据
 * {a: 1, b: 2} => 'a = 1, b =2'
 */
export function objToSqlStr(values = {}, split = ',') {
  let str = Object.keys(values).reduce((arr, key, i) => {
    arr.push(`${key} = '${values[key]}'`)
    return arr
  }, []).join(split)

  return str
}

/**
 * 删除obj中的undefined和null
 * @param {*} obj
 */
export function cleanObj(obj = {}) {
  const newData = {}
  Object.keys(obj).map(key => {
    const v = obj[key]
    if(v !== undefined && v !== null) {
      newData[key] = v
    }
  })

  return newData
}

export default {
  cleanObj,
  objToSqlValStr(values) {
    return objToSqlStr(values, ',')
  },
  objToSqlFiledStr(values) {
    return objToSqlStr(values, 'and')
  }
}