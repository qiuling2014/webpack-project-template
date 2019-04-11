process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder');
const baseConfig = require('./webpack.base');
const config = require('../config');
const utils = require('./utils');

const webpackConfig = merge.smart(baseConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      'publicPath': JSON.stringify(config.dev.assetsPublicPath)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: false,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    }
  }
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => { // 用于判断当前端口是否占用
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      webpackConfig.devServer.port = port
      webpackConfig.plugins.push(new FriendlyErrorsPlugin({ // 清理webpack编译时输出的无用信息
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback
          : undefined
      }))
      resolve(webpackConfig)
    }
  });
});
