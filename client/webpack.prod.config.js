let merge = require('webpack-merge')
let webpack = require('webpack')
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let ManifestPlugin = require('webpack-manifest-plugin')
let baseConfig = require('./webpack.base.config').defaults
let assetsDistPath = path.join(__dirname, '..', 'app', 'assets', 'javascripts')
let prodConfig = {}

let cl = console.log
prodConfig = merge.smartStrategy({
  'entry': 'prepend',
  'module.loaders': 'prepend'
})({}, baseConfig, {
  output: {
    path: assetsDistPath,
    publicPath: '/assets/'
  },
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin({ filename: '../stylesheets/[name]-bundle.css', disable: false, allChunks: true }),
    new ManifestPlugin({
      fileName: 'client_manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
})
module.exports = prodConfig
// console.(prodConfig);
// console.log(JSON.stringify(prodConfig, null, 4));
