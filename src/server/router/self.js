const express = require('express')
const router = express.Router()
const DBSelfStock = require('../common/model/user_stock')

// 查询分组
router.get('/group', (req, res, next) => {
  DBSelfStock.queryByGroup().then(data => {
    const groups = []
    const groupsName = []
    data.forEach(item => {
      const groupId = item.group_id
      const index = groupsName.findIndex(v => v === groupId)

      if(index !== -1) {
        groups[index].children.push(item)
      } else {
        groupsName.push(groupId)
        groups[groupsName.length - 1] = {
          name: groupId,
          children: [item],
        }
      }
    })

    res.send(groups)
  })
})

module.exports = router