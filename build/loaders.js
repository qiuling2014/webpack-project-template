const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 额外打包插件
const isDev = process.env.NODE_ENV === 'development';

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
    loader: 'babel-loader'
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
      limit: 1,
      name: '[path][name].[ext]',
      publicPath: isDev ? '../' : '../',
      context: './src'
    }
  }]
}, {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      publicPath: isDev ? '../' : '',
      outputPath: isDev ? '' : '/font'
    }
  }]
}];

module.exports = loaders;