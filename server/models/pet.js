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

petSchema.static('saveOne', function(options, callback) {
    var pet = new this();
    pet.name = options.name;
    pet.type = options.type;
    pet.quantity = options.quantity;

    // pet.save().then(function(pet) {
    //     callback(null, pet);
    // }).catch(function(err){
    //     callback(err);
    // });

    return pet.save(callback);
});

module.exports = mongoose.model('pet', petSchema);