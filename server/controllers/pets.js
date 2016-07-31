var Promise  = require('bluebird'),
    _   = require('lodash'),
    dataProvider = require('../models'),
    
    pets;

pets = {
    browse: function(options) {
        function queryModel(options) {
            var conditions = {}; // I'm going to find all pets.
            return dataProvider.Pet.find(conditions);
        }

        return queryModel(options);
    },

    add: function add(object, options) {
        function queryModel(options) {
            return dataProvider.Pet.saveOne(options);
        }
    }
};

module.exports = pets;