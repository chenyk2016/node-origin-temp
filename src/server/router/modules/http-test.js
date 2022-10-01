// 测试http请求
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.query)
  // const query = req.query
  // const cacheControlRes = query.ch
  // res.setHeader('Cache-Control', 'public')
  // res.setHeader('Cache-Control', 'no-cache')
  // res.setHeader('Cache-Control', 'public')
  // res.setHeader('Expires', new Date(Date.now() + 100000).toUTCString())
  res.setHeader('ETag', '11112')
  // res.removeHeader('ETag')
  res.setHeader('Last-Modified', new Date('2021/1/2').toUTCString())

  res.send('1234567891')
})


router.post('/', (req, res) => {
  console.log(req.query)
  // const query = req.query
  // const cacheControlRes = query.ch
  res.setHeader('Cache-Control', 'public')
  // res.setHeader('Cache-Control', 'no-cache')
  // res.setHeader('cache-control', 'max-age=0')
  res.setHeader('ETag', '34323')
  // res.removeHeader('ETag')
  res.setHeader('Expires', `${Date.now() + 1000000}`)

  res.send({a:2})
})


export default router