const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.html/, loader: 'file?name=[name].[ext]'},
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['./babelRelayPlugin']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'relay prototype',
      template: './src/index.tpl.html',
      inject: true
    })
  ]
}