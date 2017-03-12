/**
 * Created by Uncle Charlie, 2017/03/01
 */

import * as  _ from 'lodash';

// let exports = module.exports;

// let models = [
//   'accessory',
//   'client',
//   'code',
//   'pet',
//   'token',
//   'user'
// ];

// function init() {
//   exports.Base = require('./base');

//   models.forEach(function (name) {
//     _.extend(exports, require('./' + name));
//   });
// }

// // exports.init = init;
// exports.init = init;


import _user from './user';
import _accessory, { AccessorySchema } from './accessory';
import _client from './client';
import _code from './code';
import _pet from './pet';
import _token from './token';

export default {
  User: _user,
  Accessory: _accessory,
  Client: _client,
  Code: _code,
  Pet: _pet,
  Token: _token,
  AccessorySchema,
  init: () => { console.log('===> models init()') }
};