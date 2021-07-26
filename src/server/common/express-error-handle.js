// 处理，express路由里面的错误，不会被全局错误处理捕获的问题

const Layer = require('express/lib/router/layer')
Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle
  },
  set(fn) {
    if (fn.length === 4) {
      this.__handle = fn
    } else {
      this.__handle = (req, res, next) =>
        Promise.resolve()
          .then(() => fn(req, res, next))
          .catch(next)
    }
  },
})