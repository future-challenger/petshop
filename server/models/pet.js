var mongoose        = require('./base'),
    Accessory = require('./accessory');

var Schema = mongoose.BaseSchema;
var AccessorySchema = Accessory.schema;
var AccessoryModel = Accessory.model;

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number,
    username: {type: String, required: true},
    accessories: [AccessorySchema]
});

petSchema.static('anotherFindOne', function(options, callback) {
    var conditions = options || {};
    return this.findOne(conditions, callback);
});

petSchema.static('saveOne', function(options, callback) {
    var pet = new this(); // *
    pet.name = options.name;
    pet.type = options.type;
    pet.quantity = options.quantity;
    // username as foreign key
    pet.username = options.username;

    // pet.save().then(function(pet) {
    //     callback(null, pet);
    // }).catch(function(err){
    //     callback(err);
    // });

    var accessory = new AccessoryModel();
    accessory.name = options.accName;
    accessory.price = options.accPrice;

    pet.accessories.push(accessory);

    return pet.save(callback); // return also returns the promise.
});

petSchema.static('findFull', function(options, callback) {
    var un = options.userName;
    return this.aggregate()/*.match({username: un})*/ // find all pets whose username field can left join users'.
        .lookup({
            from: 'users',
            localField: 'username',
            foreignField: 'username',
            as: 'users_doc'
        })
        .exec(callback);
});

module.exports = mongoose.model('pet', petSchema);