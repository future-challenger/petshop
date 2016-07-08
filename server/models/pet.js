var mongoose    = require('./base'),
    autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number
});

petSchema.plugin(autoIncrement.plugin, {model: 'pet', field: 'petId', startAt: 1});
module.exports = mongoose.model('pet', petSchema);