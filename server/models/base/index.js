var mongoose = require('mongoose'),
    Promise = require('bluebird');
    
mongoose.Promise = Promise;

module.exports = mongoose;