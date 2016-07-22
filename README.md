# Petshop

This is a simple NodeJs server based Express. Database is MongoDB. The package that connect server and db is mongoose.

The main purpose is to do OAuth2 in server side. It based on `oauth2orize` and `passport`.

Nearly all database access code is `Promisify`-ed by `bluebird`. like:
```javascript
    User.findOne({ username: username }).exec().then(function (u) {
        if (!u) {
            done(null, false);
            return;
        }
        var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
        verifyPasswordAsync(password).then(function (match) {
            console.log('password match ' + match);
            if (!match) {
                console.log('is match ' + match);
                done(null, false);
            } else {
                done(null, u);
            }
        });
    }).catch(function (err) {
        done(err);
    });
```
but first all `Model`s are used a base `mongoose`:
```javascript
var mongoose = require('mongoose'),
    Promise = require('bluebird');
    
mongoose.Promise = Promise;

module.exports = mongoose;
```
Use this "mongoose" to implement `Models`:
```javascript
var mongoose    = require('./base'),
    bcrypt      = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return callback(err);
        }

        callback(null, match);
    });
};

module.exports = mongoose.model('User', userSchema);
```

But the method `verifyPassword` is not promisified. But when use it later, you can use `bluebird` to promisify it like this:
```javascript
var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
```
**Do remember to set context**, or it may not work.

##Mongoose, add instance methods or static methods to model
to add an instance method, just use the `Schema.methods.methodName = function(){}` or `Schema.method{'methodName', fn}`. eg:
```javascript
// eg 1
var schema = kittySchema = new Schema(..);

schema.method('meow', function () {
  console.log('meeeeeoooooooooooow');
})

var Kitty = mongoose.model('Kitty', schema);

var fizz = new Kitty;
fizz.meow(); // meeeeeooooooooooooow

// eg 2
var schema = kittySchema = new Schema(..);
...
schema.methods.meow = function () {
  console.log('meeeeeoooooooooooow');
})
...
```
static methods to model. 
```javascript
petSchema.static('anotherFindOne', function(options, callback) {
    var conditions = options || {};
    return this.findOne(conditions, callback);
});

Pet.anotherFindOne({'_id': req.params.pet_id}).exec().then(function(pet) {
        res.json({message: 'done', data: pet});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
```
You would notice that even the customized static method can be used in the promisified way.

## extend mongoose.Schema
You can refer to the mongoose doc [here](http://mongoosejs.com/docs/api.html#model_Model.discriminator)
But the doc is not enough. When i have a `BaseSchema` i would like to use it everywhere like how i use `Schema`. So i define it in the existing *base* doc *index.js* file, then exports it.
```javascript
var mongoose = require('mongoose'),
    util     = require('util');
    Promise  = require('bluebird');
    
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        createdBy: { type: String, default: 'admin'},
        createdAt: { type: Date, required: true, default: Date.now() },
        updatedBy: { type: String, default: 'admin'},
        updatedAt: { type: Date, required: true, default: Date.now() }
    });
}

util.inherits(BaseSchema, Schema);

module.exports = mongoose;
module.exports.BaseSchema = BaseSchema;
```
In this extended `BaseSchema`, there are four fields added. All models defined by this Schema will automatically has these four fields.

Then use it like this:
```javascript
var mongoose    = require('./base');

var Schema = mongoose.BaseSchema;

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number
});
```
Pet model will have thoese added fields:
```javascript
var petModel = mongoose.model('pet', petSchema);
```
Use post add a pet model in mongodb, then
```
db.pets.find().pretty()
```
output will be:
```
{
	"_id" : ObjectId("578f6130b107a82173533c76"),
	"quantity" : 12345,
	"type" : "1",
	"name" : "YoYo123456",
	"updatedAt" : ISODate("2016-07-20T11:31:54.011Z"),
	"updatedBy" : "admin",
	"createdAt" : ISODate("2016-07-20T11:31:54.011Z"),
	"createdBy" : "admin",
	"__v" : 0
}
```

## MongoDB aggregate? 
It's a good news that lots of new stuff added in MongoDB 3.2, expecially the "left outer join" one. Use `$lookup` you can do this in MongoDB. 
### Sub-doc
When I try to find something related to this stuff in Mongoose i find **sub-doc** first. It's interesting to use this, let's give it a shot.
As we have pets now and we shall pets' accessories too. So we add a accessory schema in *models/accessory.js* file.
```javascript
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
```  
`module.exports` exported an object with two fileds `schema` and `model`. This is because besides the schema we may want to use the model.

Now go to *models/pet.js* file. 
require accessory stuff:
```javascript
var Accessory = require('./accessory');

var AccessorySchema = Accessory.schema;
var AccessoryModel = Accessory.model;
```

Use AccessorySchema in pet schema:
```javascript
var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number,
    accessories: [AccessorySchema]
});
```
`accessories` is the *sub-doc*. Well, let's add one pet with accessories in the static method `saveOne`:
```javascript
petSchema.static('saveOne', function(options, callback) {
    var pet = new this();
    pet.name = options.name;
    pet.type = options.type;
    pet.quantity = options.quantity;

    // To add accessory, here's what need to do.
    var accessory = new AccessoryModel();
    accessory.name = options.accName;
    accessory.price = options.accPrice;

    pet.accessories.push(accessory);

    return pet.save(callback);
});
```
**NOTE:**
    You can just leave the Accessory model alone. Just use this {name: 'some name', price: 'some price'} to push in the accessories field in pet model, it also works.

Create an accessory model instance and *push* it in the pet's accessories array. And save it. After one pet with accessories saved, you may find a doc in MongoDB. It looks like this:
```
{
	"_id" : ObjectId("5790c505797c1e070d2b9b37"),
	"quantity" : 12345,
	"type" : "1",
	"name" : "SP3",
	"updatedAt" : ISODate("2016-07-21T12:50:02.706Z"),
	"updatedBy" : "admin",
	"createdAt" : ISODate("2016-07-21T12:50:02.706Z"),
	"createdBy" : "admin",
	"accessories" : [
		{
			"_id" : ObjectId("5790c505797c1e070d2b9b38"),
			"name" : "Some Acc",
			"price" : 123,
			"updatedAt" : ISODate("2016-07-21T12:50:02.698Z"),
			"updatedBy" : "admin",
			"createdAt" : ISODate("2016-07-21T12:50:02.698Z"),
			"createdBy" : "admin"
		}
	],
	"__v" : 0
}
```
The accessory model is actually a part of the pet json. It has nothing to do with the **let join** thing.

###$lookup
Now let's find out how to do the "left outer join" `$lookup` aggregate by adding a static method in *models/pets.js* file.
```javascript
petSchema.static('findFull', function(options, callback) {
    console.log('###find full method');
}
```
use mongoose aggregate api in it:
```javascript
petSchema.static('findFull', function(options, callback) {
    console.log('###find full method');
    var un = options.username;
    return this.aggregate()/*.match({username: un})*/ // find all pets whose username field can left join users'.
        .lookup({
            from: 'users',
            localField: 'username',
            foreignField: 'username',
            as: 'users_doc'
        });
}
```
Then for test if it works, add a http request handler and related code in *controller*. Run it, you'll find results like this:
```
...

    {
      "_id": "5790c505797c1e070d2b9b37",
      "quantity": 12345,
      "type": "1",
      "name": "SP3",
      "updatedAt": "2016-07-21T12:50:02.706Z",
      "updatedBy": "admin",
      "createdAt": "2016-07-21T12:50:02.706Z",
      "createdBy": "admin",
      "accessories": [
        {
          "_id": "5790c505797c1e070d2b9b38",
          "name": "Some Acc",
          "price": 123,
          "updatedAt": "2016-07-21T12:50:02.698Z",
          "updatedBy": "admin",
          "createdAt": "2016-07-21T12:50:02.698Z",
          "createdBy": "admin"
        }
      ],
      "__v": 0,
      "users_doc": []
    },
    {
      "_id": "5790f0acbfe8010e17625b1c",
      "username": "jack",
      "quantity": 12345,
      "type": "1",
      "name": "SP4",
      "updatedAt": "2016-07-21T15:56:24.462Z",
      "updatedBy": "admin",
      "createdAt": "2016-07-21T15:56:24.462Z",
      "createdBy": "admin",
      "accessories": [
        {
          "_id": "5790f0acbfe8010e17625b1d",
          "name": "Some Acc",
          "price": 123,
          "updatedAt": "2016-07-21T15:56:24.454Z",
          "updatedBy": "admin",
          "createdAt": "2016-07-21T15:56:24.454Z",
          "createdBy": "admin"
        }
      ],
      "__v": 0,
      "users_doc": [
        {
          "_id": "5775c580f84a06e9fc025669",
          "username": "jack",
          "password": "$2a$05$gEdQimZ/FW8d7fILYpinKOIc3yVF0HV/rtVl/ptzVErUU82.UkFpa",
          "__v": 0
        }
      ]
    }

...
```
You can also find how to use mongoose aggregate api. It's almost the same.

But there's a problem, if i do the lookup thing like code below it does not work.
```javascript
    return this.aggregate({
        $lookup: {
            from: 'users',
            localField: 'username',
            foreignField: 'username',
            as: 'users_doc'
        }
    }, callback);
```