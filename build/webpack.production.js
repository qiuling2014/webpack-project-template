const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const config = require('../config');

const webpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? '#source-map' : false,
})

webpackConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': require('../config/prod.env'),
    'publicPath': config.build.assetsPublicPath
  })
]);

module.exports = webpackConfig;
