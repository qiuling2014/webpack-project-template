const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /**html插件 */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 额外打包插件
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new ExtractTextPlugin('css/[name].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new CopyWebpackPlugin([{
    from: Path.join(__dirname, '../src/static'),
    to: Path.join(__dirname, '../dist/static'),
  }]),
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