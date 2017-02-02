var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'built/client');
var APP_DIR = path.resolve(__dirname, 'client/H5');

var config = {
  entry: ['babel-polyfill', APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: '/assets/bundle.js'
  },

  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: [
    //       'babel-loader',
    //     ],
    //     include: [
    //       // path.resolve(__dirname, "app")
    //       APP_DIR
    //     ],
    //   },
    //   {
    //     test: /\.css$/,
    //     use: [
    //       'style-loader',
    //       'css-loader?modules',
    //       'postcss-loader',
    //     ]
    //   }
    // ]
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          // path.resolve(__dirname, "app")
          APP_DIR
        ],
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Petshop',
      filename: 'index.html',
      template: APP_DIR + '/assets/index.ejs',
      files: {
        js: ['assets/bundle.js'],
        chunks: {
          head: {
            entry: 'assets/bundle.js'
          }
        }
      }
    })
  ],
};

module.exports = config;
