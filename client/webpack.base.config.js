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
let defaults = {
    context: __dirname,
    entry: {
        globalA: [
            path.join(__dirname, '/javascripts/globalA.js')
        ],
        homepage: [
            path.join(__dirname, '/javascripts/entries/homepage.js')
        ],
        newCiNpmPackages: [
            path.join(__dirname, '/javascripts/entries/newCiNpmPackages.js')
        ],
        ciNpmPackages: [
            path.join(__dirname, '/javascripts/entries/ciNpmPackages.js')
        ],
        createOrEditDocumentation: [
            path.join(__dirname, '/javascripts/entries/createOrEditDocumentation.js')
        ],
        documentation: [
            path.join(__dirname, '/javascripts/modules/documentation.js')
        ],
        apiOperation: [
            path.join(__dirname, '/javascripts/entries/apiOperation.js')
        ]
    },
    output: {
        path: assetsDistPath,
        filename: '[name]-bundle.js',
        chunkFilename: '[id].chunk.js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
            // loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader!sass-loader' })
        }]
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
          'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: '[name]-bundle.css', disable: false, allChunks: true }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer({
                    browsers: ['last 3 versions', '> 1%']
                })]
            }
        }),
    ]
};
module.exports.defaults = defaults;
module.exports.extend = function merge(config) {
    return _.extend({}, defaults, config);
};
