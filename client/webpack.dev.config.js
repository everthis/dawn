var merge = require('webpack-merge')
let webpack = require('webpack')
var baseConfig = require('./webpack.base.config').defaults
var devConfig = {}

var cl = console.log
devConfig = merge.smartStrategy({
  entry: 'prepend',
  'module.loaders': 'prepend'
})({}, baseConfig, {
  output: {
    publicPath: '/static/dawn'
  },
  devServer: {
    disableHostCheck: true
  },
  performance: {
    hints: false
  }
})
module.exports = devConfig
