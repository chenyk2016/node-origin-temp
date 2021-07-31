import express from 'express'
import DBSelfStock from '../common/model/user_stock'
const router = express.Router()

// 查询分组
router.get('/group', (req, res, next) => {
  DBSelfStock.queryByGroup().then(data => {
    res.send(data)
  })
})

export default router