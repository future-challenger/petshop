/**
 * Created by Uncle Charlie, 2017/03/01
 */

import mongoose from 'mongoose'
import util from 'util'
// Promise = require('bluebird');

mongoose.Promise = Promise;

const Schema = mongoose.Schema;

function BaseSchema(...args) {
  Schema.apply(this, args);

  this.add({
    createdBy: { type: String, default: 'admin' },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedBy: { type: String, default: 'admin' },
    updatedAt: { type: Date, required: true, default: Date.now() },
  });
}

util.inherits(BaseSchema, Schema);

module.exports = mongoose;
module.exports.BaseSchema = BaseSchema;
