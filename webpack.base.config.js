const path = require('path')

module.exports = {
  entry: '',
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
}