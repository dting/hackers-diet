const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: false,
  context: path.join(__dirname, './client'),
  entry: [
    'whatwg-fetch',
    './index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production',
      'process.env.HUMAN_API_ID': `${process.env.HUMAN_API_ID || ''}`,
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.template.html',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.scss$/,
      loaders: [
        ExtractTextPlugin.extract('style'),
        'css',
        'postcss',
        'resolve-url',
        'sass',
      ],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'url?prefix=font/&limit=5000',
    }, {
      test: /\.(png|jpg|jpeg|gif|woff)$/,
      loader: 'url-loader?limit=8192',
    }],
  },
  postcss: () => [autoprefixer],
};
