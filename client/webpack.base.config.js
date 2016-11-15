/**
 * [exports description]
 * @type {Object}
 * @author everthis
 */
'use strict';
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let envVars = process.env;
let assetsDistPath = path.join(__dirname, '..', 'app', 'assets');
console.log("assetsDistPath");
console.log(assetsDistPath);

let serverConfig = {
  protocol: 'http://',
  host: '0.0.0.0',
  port: 8676
};
let devServerHref = '' + 
                    serverConfig.protocol + 
                    serverConfig.host + 
                    ':' + 
                    serverConfig.port + 
                    '/assets/';
console.log("devServerHref");
console.log(devServerHref);

module.exports = {
    context: __dirname,
    entry: {
        application: [
          'webpack-dev-server/client?' + devServerHref,
          'webpack/hot/only-dev-server',
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
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
              test: /\.js$/,
              loader: 'babel',
              exclude: /node_modules/
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
    },
    devServer: {
      host: '0.0.0.0',
      port: 8676
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
