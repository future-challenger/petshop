/**
 * Created by Uncle Charlie, 2017/03/01
 */

import mongoose  from './base';

var clientSchema = new mongoose.BaseSchema({
    name: {type: String, unique: true, required: true},
    id: {type: String, required: true},
    secret: {type: String, required: true},
    userId: {type: String, required: true}
});

export default mongoose.model('client', clientSchema);