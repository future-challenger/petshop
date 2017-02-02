import mongoose from './base'
import bcrypt from 'bcryptjs'
// import Promise from 'bluebird'
import validator from 'validator'

const PASSWORD_LEN = 6

// let bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
// let bcryptHash = Promise.promisify(bcrypt.hash)
// let bcryptCompare = Promise.promisify(bcrypt.compare)
let bcryptGenSalt = () => (new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      reject(err)
      return
    }

    resolve(salt)
  })
}))

let bcryptHash = (password, salt) => (new Promise((resolve, reject) => {
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      reject(err)
      return
    }

    resolve(hash)
  })
}))

/**
 * @argument password, this one is what the text like `123456`
 * @argument hash, this one the hashed `123456`
 */
let bcryptCompare = (password, hash) => (new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) {
      reject(err)
      return
    }

    resolve(res)
  })
}))

function validatePasswordLength(password) {
  return validator.isLength(password, PASSWORD_LEN);
}

/**
 * generate a random salt and then hash the password with that salt
 */
function generatePasswordHash(password) {
  return bcryptGenSalt().then((salt) => {
    return bcryptHash(password, salt);
  });
}

var Schema = mongoose.BaseSchema;

var userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
  var self = this;

  if (!self.isModified('password')) {
    return next();
  }

  if (!validatePasswordLength(self.password)) {
    return next(new Error('password length not enough!'))
  }

  (() => generatePasswordHash(self.password).then(hash => {
    self.password = hash
    console.log('=====> user modal save', self.password)
    next()
  }).catch(err => {
    console.log('=====>user model save error', { self, err })
    next(err)
  })
  )()

  // bcrypt.genSalt(5, function (err, salt) {
  //   if (err) {
  //     return next(err);
  //   }

  //   bcrypt.hash(self.password, salt, null, function (err, hash) {
  //     if (err) {
  //       return next(err);
  //     }

  //     self.password = hash;
  //     next();
  //   });
  // });
});

userSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      return callback(err);
    }

    callback(null, match);
  });
};

module.exports = {
  User: mongoose.model('User', userSchema)
};