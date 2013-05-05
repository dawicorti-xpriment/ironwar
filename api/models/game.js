var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('game', new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    name: String,
    password: String,
    active: Boolean,
    full: Boolean
}));
