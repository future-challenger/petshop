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