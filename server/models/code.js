/**
 * Created by Uncle Charlie, 2017/03/01
 */

import mongoose   from './base';
var Schema = mongoose.BaseSchema;

var codeSchema = new Schema({
    value: {type: String, required: true},
    redirectUri: {type: String, required: true},
    userId: {type: String, required: true},
    clientId: {type: String, required: true}
});

module.exports = {
    Code: mongoose.model('code', codeSchema)
};