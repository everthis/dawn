var path = require('path')
var _ = require('lodash')
var webpack = require('webpack')
var assetsPath = path.join(__dirname, '..', 'public', 'assets')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var envVars = process.env

var entryJs = function (another) {
    return [path.join(__dirname, '/javascripts/application.js')];
};
console.log("envVars.HRM");
console.log(envVars.HRM ? 1 : 2);

var config = {
  context: path.join(__dirname, '..'),
  entry: {
    /* 定義進入點與其檔案名稱 */
    // application: envVars.HRM ? entryJs.call(this).unshift('webpack/hot/dev-server') : this.customEntryJs
    application: envVars.HRM ? ['webpack/hot/only-dev-server', path.join(__dirname, '/javascripts/application.js')] : [path.join(__dirname, '/javascripts/application.js')]
  },
  output: {
    path: assetsPath,
    filename: '[name]-bundle.js',
    publicPath: envVars.HRM ? 'http://0.0.0.0:8676/assets/' : '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.coffee', '.json']
  },
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  devtool: 'inline-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  devServer: {
    contentBase: assetsPath,
    inline: true,
    hot: true
  },
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
    new webpack.HotModuleReplacementPlugin(),
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
