/**
 * [exports description]
 * @type {Object}
 * @author everthis
 * to fix: The style-loader already includes hot replacement code. so twice '[WDS] Hot Module Replacement enabled.'
 */
'use strict'
let path = require('path')
let fs = require('fs')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let autoprefixer = require('autoprefixer')
let envVars = process.env
let assetsDistPath = path.join(__dirname, '..', 'public', 'static')
let entryPath = path.join(
  __dirname,
  '..',
  'app',
  'javascript',
  'packs',
  'entries'
)
let basename = path.basename(module.filename)
let jsonStr = JSON.stringify
let entries = {}

fs
  .readdirSync(entryPath)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    entries[path.basename(file, '.js')] = path.join(entryPath, file)
  })

let defaults = {
  context: __dirname,
  entry: entries,
  output: {
    path: assetsDistPath,
    publicPath: '/static/dawn',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /codemirror\.css$/,
        // loader: 'style-loader!css-loader'
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /codemirror\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!postcss-loader!sass-loader'
        })
      }
    ]
  },
  devServer: {
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    }
  },
  resolve: {
    modules: ['node_modules', 'bower_components', 'web_modules'],
    alias: {
      vue$: 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 3 versions', '> 1%']
          })
        ]
      }
    })
  ]
}
module.exports.defaults = defaults
module.exports.extend = function merge(config) {
  return _.extend({}, defaults, config)
}
