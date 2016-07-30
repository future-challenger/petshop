var _       = require('lodash'),

    exports,
    models;

exports = module.exports;

models = [
    'accessory',
    'client',
    'code',
    'pet',
    'token',
    'user'
];

function init() {
    exports.Base = require('/base');

    models.forEach(function(name) {
        _.extend(exports, require('./' + name));
    });
}

// exports.init = init;
exports.init = init();