const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = merge.smart(baseConfig, {
  devServer: {
    open: false,
    contentBase: 'dist',
    port: 8080,
    host: '127.0.0.1'
  }
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  })
);

module.exports = config;
