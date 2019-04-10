const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const config = require('../config');

const webpackConfig = merge.smart(baseConfig, {
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
})

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': require('../config/dev.env'),
    'publicPath': JSON.stringify(config.dev.assetsPublicPath)
  })
);

module.exports = webpackConfig;
