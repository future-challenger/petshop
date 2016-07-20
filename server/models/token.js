var mongoose    = require('./base');
var Schema = mongoose.BaseSchema;

var tokenSchema = new Schema({
    value: {type: String, required: true},
    userId: {type: String, required: true},
    clientId: {type: String, required: true}
});

module.exports = mongoose.model('token', tokenSchema);