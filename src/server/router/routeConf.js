import express from 'express';
import { auth } from './auth';

import { downloadFIle, parseExcel } from './modules/home'
import { reactSsr } from './modules/react-ssr'
import { getEtag, postEtag } from './modules/http-test'
import { puppeteerStart } from './modules/puppeteer';
import { login, logout } from './modules/login';

const routes = [
  {
    path: '/login',
    method: 'get', // get|post 默认get
    router: login,
    meta: {
      name: '',
      auth: false, // 默认true
    }
  },
  {
    path: '/logout',
    router: logout,
    method: 'get',
  },
  { path: '/file/:filename', router: downloadFIle },
  { path: '/excel/parse', router: parseExcel },
  { path: '/ssr', router: reactSsr },
  { path: '/http', method: 'get', router: getEtag },
  { path: '/http', method: 'post', router: postEtag },
  { path: '/puppeteer', router: puppeteerStart },
]

routes.unshift({
  path: '/',
  router: (req, res) => {
    const env = process.env.NODE_ENV;
    const { username, view } = req.session;
    res.send({
      message: `Hi ${username}，当前运行环境 ${env}, 访问页面${view}次`,
      routers: routes.map(item => ({
        name: item.name,
        path: item.path,
      }))
    })
  },
  name: '路由列表',
})

const router = express.Router()

routes.forEach(route => {
  let authFns = [auth]
  if (route?.meta?.auth === false) {
    authFns = []
  }

  const method = route.method || 'get';

  if (typeof route.router !== 'function') {
    throw new Error(`route conf: ,path: ${route.path}: ${router.name} mast be function`)
  }

  router[method](route.path, [...authFns, route.router])
})

export default router;