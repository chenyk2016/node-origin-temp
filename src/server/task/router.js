import express from 'express'
import { doBaseDataTask } from './work'

const router = express.Router()
// 查询分组
router.get('/update-today', (req, res, next) => {
  doBaseDataTask().then(data => {
    res.send(data)
  })
})

export default router