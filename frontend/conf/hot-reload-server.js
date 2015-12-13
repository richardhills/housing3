var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var host = process.env.HOST || 'localhost';
var port = parseInt(process.env.PORT, 10) || 3000;
var root = 'http://' + host + ':' + port;
var config = require('./client.conf');

var options = {
  contentBase: root,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: root + '/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: {
    colors: true
  }
};

config.output.publicPath = root + '/';

config.devtool = 'eval';

config.entry = config.entry.concat([
  'webpack-dev-server/client?' + root,
  'webpack/hot/only-dev-server'
]);

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);

config.module.loaders[0].loaders.unshift('react-hot-loader');

var server = new WebpackDevServer(
  webpack(config),
  options
);

server.listen(port, host, function() {
  console.info(
    '==>  10to8 Hot-Reload Server listening on %s',
    port
  );
});
