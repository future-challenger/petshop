/**
 * Created by Uncle Charlie, 2017/03/01
 */

var _ = require('lodash');

var errors = {
    logError: function(errMsg) {
        console.log(`###Error:- ${errMsg}`);
    },

    logWarn: function(msg) {
        console.log(`###Warn:- ${msg}`);
    },

    logAndThrowError: function(msg) {
        this.logError(msg);
        this.throwError(msg);
    },

    throwError: function (err) {
        if (!err) {
            err = new Error('errors.errors.anErrorOccurred');
        }

        if (_.isString(err)) {
            throw new Error(err);
        }

        throw err;
    }
};

errors.logError = function(errMsg) {
    console.log(`###Error:- ${errMsg}`);
};

errors.logWarn = function(msg) {
    console.log(`###Warn:- ${msg}`);
};

module.exports = errors;
