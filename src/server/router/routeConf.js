import home from './modules/home'
import reactSsr from './modules/react-ssr'
import httpTest from './modules/http-test'
import puppeteer from './modules/puppeteer';

const routes = [
  {
    path: '/',
    router: home,
    name: '',
  },
  {
    path: '/react-ssr',
    router: reactSsr,
    name: 'react-ssr',
  },
  {
    path: '/http-test',
    router: httpTest,
    name: 'httpTest',
  },
  {
    path: '/puppeteer',
    router: puppeteer,
    name: 'puppeteer',
  },
]

export default routes;