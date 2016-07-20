var mongoose = require('mongoose'),
    util     = require('util');
    Promise  = require('bluebird');
    
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        createdBy: { type: String, default: 'admin'},
        createdAt: { type: Date, required: true, default: Date.now() },
        updatedBy: { type: String, default: 'admin'},
        updatedAt: { type: Date, required: true, default: Date.now() }
    });
}

util.inherits(BaseSchema, Schema);

module.exports = mongoose;
module.exports.BaseSchema = BaseSchema;