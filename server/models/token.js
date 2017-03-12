/**
 * Created by Uncle Charlie, 2017/03/01
 */

import mongoose from './base';
var Schema = mongoose.BaseSchema;

var tokenSchema = new Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

export default {
    Token: mongoose.model('token', tokenSchema)
};