/**
 * Created by Uncle Charlie, 2017/03/01
 */

import * as  _ from 'lodash';

let exports = module.exports;

let models = [
  'accessory',
  'client',
  'code',
  'pet',
  'token',
  'user'
];

function init() {
  exports.Base = require('./base');

  models.forEach(function (name) {
    _.extend(exports, require('./' + name));
  });
}

// exports.init = init;
exports.init = init;