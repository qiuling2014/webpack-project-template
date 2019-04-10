const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /**html插件 */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 额外打包插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const config = require('../config');

const plugins = [
  new ExtractTextPlugin('css/[name].[hash:7].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../static'),
    to: config.build.assetsSubDirectory,
  }]),
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    inject: true,
    hash: true,
    chunksSortMode: 'manual',
    chunks: ['index'],
    minify: {
      collapseWhitespace: false,
      removeAttributeQuotes: false
    }
  })
];

module.exports = plugins;