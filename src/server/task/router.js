import express from 'express'
import manager from './manager'

const router = express.Router()
// 查询分组
// router.get('/update-today', (req, res, next) => {
//   doBaseDataTask().then(data => {
//     res.send(data)
//   })
// })

router.get('/', (req, res, next) => {
  manager.status().then(msg => {
    res.send(msg)
  })
})

export default router