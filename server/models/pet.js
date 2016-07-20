var mongoose    = require('./base'),
    autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.BaseSchema;

autoIncrement.initialize(mongoose.connection);

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number
});

petSchema.static('anotherFindOne', function(options, callback) {
    var conditions = options || {};
    return this.findOne(conditions, callback);
});

petSchema.plugin(autoIncrement.plugin, {model: 'pet', field: 'petId', startAt: 1});
module.exports = mongoose.model('pet', petSchema);