// const http = require('http')
import axios from 'axios'
import iconv from 'iconv-lite'
import dayjs from 'dayjs'
import DB from '@server/common/mysql'

// 获取股票数据: https://www.codenong.com/cs106212578/

const API = {
// 0: 未知
// 1: 名字
// 2: 代码
// 3: 当前价格
// 4: 昨收
// 5: 今开
// 6: 成交量（手）
// 7: 外盘
// 8: 内盘
// 9: 买一
// 10: 买一量（手）
// 11-18: 买二 买五
// 19: 卖一
// 20: 卖一量
// 21-28: 卖二 卖五
// 29: 最近逐笔成交
// 30: 时间
// 31: 涨跌
// 32: 涨跌%
// 33: 最高
// 34: 最低
// 35: 价格/成交量（手）/成交额
// 36: 成交量（手）
// 37: 成交额（万）
// 38: 换手率
// 39: 市盈率
// 40:
// 41: 最高
// 42: 最低
// 43: 振幅
// 44: 流通市值
// 45: 总市值
// 46: 市净率
// 47: 涨停价
// 48: 跌停价
  baseData: 'http://qt.gtimg.cn/q='
}


let TaskTimeId = null
let nextJobStep = 0
const stockCloseTime = '15:05:00' // 股市关闭时间，（延迟5分钟）

// function log() {
//   console.log(dataStr, 'doBaseDataTask: 时间未到收盘后')
// }

async function insertBaseData(codes) {
  const url = `${API.baseData}${codes}`
  return axios.get(url, {
    headers: {
      'Content-Type': 'text/html; charset=GBK',
      responseType: 'text/html; charset=GBK',
    },
    responseType: 'arraybuffer',
    transformResponse: [function (res) {
      var strJson = iconv.decode(res, 'gbk')
      return strJson
    }]
  })
    .then((res) => {
      if(/pv_none_match/.test(res)) {
        throw '未查询到数据'
      }
      const date = dayjs(`${dayjs().format('YYYY-MM-DD')} 15:05:00`)
      const nowDateTs = Date.now()
      const endDayTs = date.valueOf()

      let list = res.data.split(';').slice(0, -1).map(item => {
        const listItem = item.split('~')
        const code = listItem[0].match(/_(.*)=/)[1].toUpperCase()
        return {
          dt: date.format('YYYY-MM-DD'),
          ts: nowDateTs,
          is_day_end: nowDateTs > endDayTs ? '1' : '0',
          name: listItem[1],
          code: code,
          current_price: listItem[3],
          yesterday_price: listItem[4],
          today_price_start: listItem[5],
          deal_amount: listItem[6],
          exchange_rate: listItem[32],
          pe: listItem[39],
          pb: listItem[46],
          price_rate: listItem[32],
          origin_data: item,
        }
      })

      return list
    })
    .then(list => {
      return DB.insertByObj('stock_current_base_data', list)
    })
}

export async function doBaseDataTask() {
  // 每天收盘后执行
  const dataStr = dayjs().format('YYYY-MM-DD')
  const date = dayjs(`${dataStr} ${stockCloseTime}`)
  const endDayTs = date.valueOf()
  const nowDateTs = Date.now()

  if (nowDateTs < endDayTs) {
    console.log(dataStr, 'doBaseDataTask: 时间未到收盘后')
    return ''
  }

  console.log(dataStr, 'doBaseDataTask: 开始任务')
  let stockList = await DB.query('user_stock', 'code')
  stockList = stockList.map(v => {

    let code = v.code.toLowerCase()
    if(v.code.indexOf('.') !== -1) {
      const arr = code.split('.')
      code = `${arr[1]}${arr[0]}`
    }
    return code
  })

  let total = stockList.length
  const step = 20
  let pos = 0
  const promise = []
  try {
    do {
      const codes = stockList.slice(pos, pos + step).join(',')
      pos += step
      promise.push(insertBaseData(codes))
    } while (pos < total)

    await Promise.all(promise)

    console.log(dataStr, 'doBaseDataTask: 任务成功')
  } catch (error) {
    console.log(dataStr, 'doBaseDataTask: 任务失败')
    // console.log(error.message)
  }
}

async function loop () {
  if(TaskTimeId) {
    clearTimeout(TaskTimeId)
  }
  const nowDate = Date.now()
  const dataStr = dayjs().format('YYYY-MM-DD')
  const datelineToday = dayjs(`${dataStr} ${stockCloseTime}`)
  const datelineTomorrow = dayjs(`${dayjs().add(1, 'day').format('YYYY-MM-DD')} ${stockCloseTime}`)
  let msg

  if(nowDate > datelineToday.valueOf()) {
    msg = `开始执行同步数据任务 ${dataStr}`

    nextJobStep = datelineTomorrow - nowDate
    doBaseDataTask()
  } else {
    nextJobStep = datelineToday - nowDate
    msg = `未到收盘时间, 任务将在${nextJobStep / 3600/ 1000}h 后执行`
  }

  console.log(`下一次同步数据是在 ${nextJobStep/1000}s 后`)
  console.log(msg)

  TaskTimeId = setTimeout(() => {
    loop()
  }, nextJobStep)

  return msg
}


export default {
  async start() {
    if(TaskTimeId) return `任务已经在运行, 下次任务在${nextJobStep / 3600 / 1000}s之后运行`
    return await loop()
  },
}