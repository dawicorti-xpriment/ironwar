var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('Game', new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: String,
    password: String,
    active: Boolean,
    full: Boolean
}));
