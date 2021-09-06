import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
const webpackBaseConfig = require('@root/webpack.base.config.js')

export async function renderReact(componentName) {
  const webpackConfig = merge(webpackBaseConfig, {
    entry: path.resolve(`./src/web/page/${componentName}`),
    output: {
      path: path.resolve('./dist'),
      filename: `${componentName}.bundle.js`,
    },
  })

  // console.log(webpackConfig)
  const compiler = webpack(webpackConfig)

  return new Promise((resolve, reject) => {
    compiler.run((err, status) => {
      if(err) throw err
      resolve(status)
    })
  })
    .then((status) => {
      const output = status.compilation.options.output
      const filePath = `${output.path}/${output.filename}`
      return new Promise((resolve) => {
        fs.readFile(filePath, function(err, data) {
          if (err) throw err
          resolve(data)
        })
      })
    }).then(component => {
      // console.log(component)
      return eval(component)
    })
}