var path = require('path')
var _ = require('lodash')
var webpack = require('webpack')
var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')

var config = {
  context: path.join(__dirname, '..'),
  entry: {
    application: path.join(__dirname, '/javascripts/application.js')
  },
  output: {
    path: assetsPath,
    filename: '[name]-bundle-[chunkhash].js',
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
        loader: 'url?limit=8192&name=[name]-[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        loader: 'url?limit=8192&name=[name]-[hash].[ext]'
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
    new ExtractTextPlugin('[name]-bundle-[chunkhash].css', {
      allChunks: true
    }),
    new ManifestPlugin({
      fileName: 'client_manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

module.exports = config
