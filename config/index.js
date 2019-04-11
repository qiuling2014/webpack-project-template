'use strict'
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    bundleAnalyzerReport: true // 性能分析
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    host: 'localhost',
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
    notifyOnErrors: true,
    errorOverlay: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cssSourceMap: true
  }
};
