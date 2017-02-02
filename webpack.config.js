var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'built/client/assets');
var APP_DIR = path.resolve(__dirname, 'client/H5');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
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
        loader: 'babel',
        include: [
          // path.resolve(__dirname, "app")
          APP_DIR
        ],
      },
    ]
  }
};

module.exports = config;
