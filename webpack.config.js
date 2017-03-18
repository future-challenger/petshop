var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'built/client');
var APP_DIR = path.resolve(__dirname, 'client/H5');
var ADMIN_DIR = path.resolve(__dirname, 'client/pethosp-admin');
var ADMIN_BUILD_DIR = path.resolve(__dirname, 'bhilt/pethosp-admin');

var config = {
  entry: ['babel-polyfill', APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'assets/bundle.js'
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
      scripts: [
        'assets/bundle.js',
      ]
    })
  ],
};

module.exports = config;
