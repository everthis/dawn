/**
 * [exports description]
 * @type {Object}
 * @author everthis
 */
'use strict';
let path = require('path');
let webpack = require('webpack');
let envVars = process.env;
let assetsDistPath = path.join(__dirname, 'dist', 'assets');
console.log("assetsDistPath");
console.log(assetsDistPath);

module.exports = {
    context: __dirname,
    entry: {
        application: path.join(__dirname, '/javascripts/application.js')
    },
    output: {
        path: assetsDistPath,
        filename: '[name]-bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components', 'web_modules']
    }
};
