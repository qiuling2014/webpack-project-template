const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base');
const config = require('../config');

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
      'publicPath': config.build.assetsPublicPath
    })
  ]
});

if (config.build.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;
