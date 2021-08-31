import express from 'express'
import insertTodayDataTask, { doBaseDataTask } from './work-inset-today-data'

const router = express.Router()
// 查询分组
router.get('/update-today', (req, res, next) => {
  doBaseDataTask().then(data => {
    res.send(data)
  })
})

router.get('/insert-today', (req, res, next) => {
  insertTodayDataTask.start().then(data => {
    res.send(data)
  })
})

export default router