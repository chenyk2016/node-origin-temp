/*
 * @Author: 鹿鸣
 * @Date: 2021-09-06 19:12:17
 * @LastEditTime: 2021-09-06 20:48:43
 * @LastEditors: 鹿鸣
 * @Description: 时间距离的处理
 */


// export function format(time, format) {

// }

/**
 * 时间距离格式化
 * @param {*} time
 * @param {*} format
 */
export default function (timeDistance, format) {

  const units = [12, 24, 60, 60, 1000]

  const timeStep = (units) => {
    return +Math.floor(timeDistance / units.reduce((t, v) => t * v, 1))
  }

  const map = {
    yyyy: timeStep(units),
    M: timeStep(units.slice(0)),
    d: timeStep(units.slice(1)),
    H: timeStep(units.slice(2)),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: (`${date.getMonth() + 101}`).substr(1),
    dd: (`${date.getDate() + 100}`).substr(1),
    HH: (`${date.getHours() + 100}`).substr(1),
    mm: (`${date.getMinutes() + 100}`).substr(1),
    ss: (`${date.getSeconds() + 100}`).substr(1)
  }
  return timeDistance()

  const y = timeDistance
}