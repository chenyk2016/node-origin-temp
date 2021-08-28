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

async function queryBaseData(codes) {
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
  let stockList = await DB.query('user_stock', 'code', 'group_id != \'st\'')
  // console.log(stockList)
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
  do {
    const codes = stockList.slice(pos, pos + step).join(',')
    console.log(codes)
    pos += step
    promise.push(queryBaseData(codes))
  } while (pos < total)

  await Promise.all(promise)
  return '任务成功'
}