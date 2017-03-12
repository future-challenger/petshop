/**
 * Created by Uncle Charlie, 2017/03/01
 */

import mongoose from './base';

var Schema = mongoose.BaseSchema;

var AccessorySchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

export default {
    schema: AccessorySchema,
    model: mongoose.model('accessories', AccessorySchema)
};
