import { renderReact } from '@/server/utils/index'

export function reactSsr (req, res) {
  // const env = process.env.NODE_ENV
  // res.send(`Hi，当前运行环境 ${env}`)
  renderReact('home').then(code => {
    res.status(200)
    res.set({
      'Content-Type': 'text/html'
    })
    res.send(code)
  })
}
