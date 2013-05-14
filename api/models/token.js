var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Token', new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    token: String,
    createdAt: {type: Date, expires: 60}
}));
