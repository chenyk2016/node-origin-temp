import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

export async function renderReact(componentName) {
  const Component = require(path.resolve(`./src/web/page/${componentName}.js`)).default
  return new Promise((resolve, reject) => {
    resolve(ReactDOMServer.renderToString(<Component />))
  })
}