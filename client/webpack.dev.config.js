var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.config').defaults;
var devConfig = {};
let serverConfig = {
    protocol: 'http://',
    host: '0.0.0.0',
    port: 8679
};

let devServerOrigin = '' + serverConfig.protocol + serverConfig.host + ':' + serverConfig.port;
let devServerHref = '' + devServerOrigin + '/assets/';
let devServerEntry = 'webpack-dev-server/client?' + devServerOrigin;
// for (var name in baseConfig.entry) {
//     if (baseConfig.entry.hasOwnProperty(name)) {
//       baseConfig.entry[name].unshift(devServerEntry)
//     }
// };
var cl = console.log;
devConfig = merge.smartStrategy({
    'entry': 'prepend',
    'module.loaders': 'prepend'
})({}, baseConfig, {
    // output: {
    //     publicPath: devServerHref
    // },
    // devServer: {
    //     host: '0.0.0.0',
    //     port: 8679,
    // }
});
module.exports = devConfig;
