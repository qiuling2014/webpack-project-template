const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const entry = require('./entry');
const loaders = require('./loaders');
const plugins = require('./plugins');
const isDev = process.env.NODE_ENV === 'development';

const config = {
  devtool: false,
  entry,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: isDev ? '' : '',
    filename: 'js/[name].js'
  },
  plugins,
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.sass']
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            // screw_ie8: false, // default关键字问题
            drop_console: !isDev // 去掉console
          },
          parallel: true, // 多线程
          output: {
            beautify: false,
            comments: isDev, // 去掉注释内容
            preamble: `/**${new Date().toLocaleString()} **/`
          },
          ie8: true,
          keep_classnames: false,
          keep_fnames: false
        }
      })
    ]
  }
};

module.exports = config;