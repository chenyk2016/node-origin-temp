import express from 'express'
const router = express.Router()
import testDb from '@server/common/mysql/test'

// 查询分组
router.get('/testsql', (req, res, next) => {
  testDb().then(msg => {
    res.send(msg)
  })

})

// 更新数据

// router.get('/code', (req, res, next) => {
//   DBSelfStock.updateStock({
//     short_name: '中公教育'
//   }, {
//     code: '001'
//   }).then(data => {
//     res.send(data)
//   })
// })

export default router