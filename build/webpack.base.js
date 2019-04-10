const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const entry = require('./entry');
const loaders = require('./loaders');
const plugins = require('./plugins');
const config = require('../config');
const isDev = process.env.NODE_ENV === 'development';

const UglifyJS = new UglifyJSPlugin({
  sourceMap: true,
  uglifyOptions: {
    compress: {
      warnings: false,
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
});

const webpackConfig = {
  entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: isDev ? config.dev.assetsPublicPath : config.build.assetsPublicPath,
    filename: '[name].js'
  },
  plugins,
  module: {
    rules: loaders
  },
  resolve: {
    extensions: ['.js', '.css', '.scss', '.sass']
  },
  optimization: {
    minimizer: [ UglifyJS ],
    concatenateModules: true
  }
};

module.exports = webpackConfig;