const express = require('express')
const router = express.Router()
const DBSelfStock = require('../common/model/user_stock')

// 查询分组
router.get('/group', (req, res, next) => {
  DBSelfStock.queryByGroup().then(data => {
    res.send(data)
  })
})

module.exports = router