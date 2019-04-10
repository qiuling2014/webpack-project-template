const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 额外打包插件
const utils = require('./utils');

const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 64 //设计稿宽度/10
  }
}

const loaders = [{
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      minimize: false,
      attrs: ['img:src', 'img:data-src']
    }
  }
}, {
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }, px2remLoader, {
      loader: 'sass-loader'
    }],
    fallback: 'style-loader'
  })
}, {
  test: /\.js$/,
  use: [{
    loader: 'happypack/loader?id=happybabel'
  }, {
    loader: 'eslint-loader',
    options: {
      fix: true
    }
  }],
  exclude: /node_modules/
}, {
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'image/[name].[hash:7].[ext]',
    }
  }]
}, {
  test: /\.json$/,
  exclude: /node_modules/,
  type: 'javascript/auto',
  use:[{
    loader: 'json-loader',
    options: {
      name: utils.assetsPath('static/[name].[hash:7].[ext]'),
    }
  }]
}, {
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: utils.assetsPath('media/[name].[hash:7].[ext]')
  }
}, {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
    }
  }]
}];

module.exports = loaders;