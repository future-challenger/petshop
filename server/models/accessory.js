var mongoose = require('./base');

var Schema = mongoose.BaseSchema;

var AccessorySchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = {
    schema: AccessorySchema,
    model: mongoose.model('accessories', AccessorySchema)
};
