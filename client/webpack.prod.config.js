let merge = require('webpack-merge');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');
let baseConfig = require('./webpack.base.config').defaults;
let prodConfig = {};

let cl = console.log;
prodConfig = merge.smartStrategy({
    'entry': 'prepend',
    'module.loaders': 'prepend'
})({}, baseConfig, {
    output: {
      publicPath: '/assets/'
    },
    performance: {
      hints: false
    },
    module: {
        rules: [{
            test: /\.css$/,
            // loader: 'style-loader!css-loader'
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
        }]
    },
    plugins: [
      new ExtractTextPlugin({ filename: '[name]-bundle.css', disable: false, allChunks: true }),
      new ManifestPlugin({
        fileName: 'client_manifest.json'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    ]
});
module.exports = prodConfig;
// console.(prodConfig);
// console.log(JSON.stringify(prodConfig, null, 4));
