# petshop

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
