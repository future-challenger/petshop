var mongoose    = require('./base');

var clientSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    id: {type: String, required: true},
    secret: {type: String, required: true},
    userId: {type: String, required: true}
});

module.exports = mongoose.model('client', clientSchema);