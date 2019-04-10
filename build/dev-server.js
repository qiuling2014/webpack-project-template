process.env.NODE_ENV = 'development';

const config = require('../config');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const opn = require('opn');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.development');


const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false
});

compiler.hooks.compilation.tap('compilation', function (compilation) {
  compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb && cb();
  })
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
})

app.use(devMiddleware);
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = 'http://localhost:' + port;

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  if (autoOpenBrowser) {
    opn(uri);
  }
})

app.listen(port);