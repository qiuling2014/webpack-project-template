const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = merge.smart(baseConfig, {})
config.plugins.concat([
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(false),
  }),
  new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] })
]);

module.exports = config