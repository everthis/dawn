/**
 * [exports description]
 * @type {Object}
 * @author everthis
 * to fix: The style-loader already includes hot replacement code. so twice '[WDS] Hot Module Replacement enabled.'
 */
'use strict';
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let autoprefixer = require('autoprefixer');
let envVars = process.env;
let assetsDistPath = path.join(__dirname, '..', 'app', 'assets');

let serverConfig = {
  protocol: 'http://',
  host: '10.0.0.9',
  port: 8676
};
let devServerOrigin = '' + 
                    serverConfig.protocol + 
                    serverConfig.host + 
                    ':' + 
                    serverConfig.port;
let devServerHref = '' + devServerOrigin + '/assets/';

module.exports = {
    context: __dirname,
    entry: {
        application: [
          'webpack-dev-server/client?' + devServerOrigin,
          path.join(__dirname, '/javascripts/application.js')
        ]
    },
    output: {
        path: assetsDistPath,
        filename: '[name]-bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: devServerHref
    },
    module: {
        loaders: [{
          test: /\.css$/,
          loader: 'style!css'
        }, {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
        }]
    },
    postcss: [ autoprefixer({ browsers: ['last 3 versions', '> 1%'] }) ],
    devServer: {
      host: '0.0.0.0',
      port: 8676,
      headers: {
        "Access-Control-Allow-Origin": "http://10.0.0.9:8678",
        "Access-Control-Allow-Credentials": "true"
      },
      // It suppress error shown in console, so it has to be set to false.
      quiet: false,
      // It suppress everything except error, so it has to be set to false as well
      // to see success build.
      noInfo: false,
      stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components', 'web_modules']
    },
    plugins: [  
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[name]-bundle.css', {
        allChunks: true
      })
    ]
};
