var mongoose = require('mongoose'),
    util     = require('util');
    Promise  = require('bluebird');
    
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        createdBy: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now() },
        updatedBy: { type: String, required: true },
        updatedAt: { type: Date, required: true, default: Date.now() }
    });
}

util.inherites(BaseSchema, Schema);

module.exports = mongoose;
module.exports.BaseSchema = BaseSchema;