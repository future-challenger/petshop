/**
 * Created by Uncle Charlie, 2017/03/01
 */

import * as    _ from 'lodash';
import dataProvider from '../models';


export default {
    browse: function (options) {
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
