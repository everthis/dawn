const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { env } = require('../configuration.js')

const isProd = env.NODE_ENV === 'production'

module.exports = [{
  test: /\.(scss|sass|css)$/i,
  /* exclude codemirror styles since the size of its css file is only serveral KBs */
  exclude: /codemirror\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: { minimize: isProd } },
      { loader: 'postcss-loader', options: { sourceMap: !isProd } },
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: !isProd } }
    ]
  })
}, {
  test: /codemirror\.css$/,
    // loader: 'style-loader!css-loader'
  use: [
    'style-loader',
    { loader: 'css-loader',
      options: {
        minimize: isProd
      }
    }
  ]
}]
