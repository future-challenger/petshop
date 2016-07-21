var mongoose        = require('./base'),
    Accessory = require('./accessory');

var Schema = mongoose.BaseSchema;
var AccessorySchema = Accessory.schema;
var AccessoryModel = Accessory.model;

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number,
    accessories: [AccessorySchema]
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

    var accessory = new AccessoryModel();
    accessory.name = options.accName;
    accessory.price = options.accPrice;

    pet.accessories.push(accessory);

    return pet.save(callback);
});

module.exports = mongoose.model('pet', petSchema);