// 处理，express路由里面的promise错误，不会被全局错误处理捕获的问题
import Layer from 'express/lib/router/layer'

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
          .catch((err) => {
            // next需要是 Error 类型，才会进入express错误处理程序
            if (Object.prototype.toString.call(err) === '[object Error]') {
              next(err);
            } else {
              next(new Error(err));
            }
          })
    }
  },
})