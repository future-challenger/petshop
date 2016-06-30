var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function (next) {
    var self = this;

    if (!self.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return next(err);
        }

        self.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);