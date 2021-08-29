import express from 'express'
import DBSelfStock from '../common/model/user_stock'
const router = express.Router()

// 查询分组
router.get('/group', (req, res, next) => {
  DBSelfStock.queryGroupData().then(data => {
    res.send(data)
  })
})

router.get('/all', (req, res, next) => {
  DBSelfStock.queryAllData().then(data => {
    res.send(data)
  })
})

router.post('/group', (req, res, next) => {
  DBSelfStock.updateStock(req.body).then(data => {
    res.send(data)
  })
})

router.post('/add', (req, res, next) => {
  DBSelfStock.add(req.body).then(data => {
    res.send(data)
  })
})

router.get('/conf', (req, res, next) => {
  DBSelfStock.tableInfo().then(data => {
    res.send(data)
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