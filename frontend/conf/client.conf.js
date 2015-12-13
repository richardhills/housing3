var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var assetsPath = path.join(__dirname, '../lib/');
var rootFolder = path.join(__dirname, '../');
var pack = JSON.parse(
  fs.readFileSync(path.join(rootFolder, 'package.json'), 'utf-8')
);
var env = process.env.NODE_ENV || 'development';
var isDev = env === 'development';
var cssLoaderOptions = [
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
].join('&');

var jsFileName = 'js/housing3.js';

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  // Fix for: https://github.com/request/request/issues/1529
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __filename: true,
    __dirname: true
  },
  entry: [
    './app/index.js'
  ],
  output: {
    path: assetsPath,
    filename: jsFileName,
    chunkFilename: jsFileName
  },
  module: {
    // babel-loader must be first loader.
    loaders: [
      {
        test: /(\.js$)|(\.jsx$)/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=1000'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?' + cssLoaderOptions + '!postcss-loader'
      },
      // don't use local scope for css from 3rd-party libraries
      // {
      //     test: /\.css$/,
      //     loader: ExtractTextPlugin.extract('css-loader!cssnext-loader'),
      //     exclude: /app\/components/
      // },
    ]
  },
  progress: true,
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ],
    alias: {
        vex: 'vex-js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(env),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new webpack.IgnorePlugin(/\.\/dev/, /\/conf$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    })
  ],
  postcss: [
    require('cssnext')()
  ]
};
