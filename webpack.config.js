var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'built/assets');
var APP_DIR = path.resolve(__dirname, 'client/H5');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
