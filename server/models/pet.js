var mongoose    = require('./base');

var Schema = mongoose.BaseSchema;

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number
});

petSchema.static('anotherFindOne', function(options, callback) {
    var conditions = options || {};
    return this.findOne(conditions, callback);
});

module.exports = mongoose.model('pet', petSchema);