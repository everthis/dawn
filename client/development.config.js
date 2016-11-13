var path = require('path')
var _ = require('lodash')
var webpack = require('webpack')
var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = {
  context: path.join(__dirname, '..'),
  entry: {
    /* 定義進入點與其檔案名稱 */
    application: [
      path.join(__dirname, '/javascripts/application.js')
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.coffee', '.json']
  },
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: require.resolve('jquery'),
        loader: 'expose?jQuery'
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose?$'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.coffee$/,
        loader: 'coffee'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
        loader: 'url?limit=8192&name=[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        loader: 'url?limit=8192&name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('[name]-bundle.css', {
      allChunks: true
    })
  ]
}

module.exports = config
