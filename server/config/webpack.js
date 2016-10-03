const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../../webpack.config');

const compiler = webpack(webpackConfig);

module.exports = (app) => {
  module.exports.devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
      colors: true,
    },
    publicPath: webpackConfig.output.publicPath,
  });
  app.use(module.exports.devMiddleware);
  app.use(webpackHotMiddleware(compiler));
};
