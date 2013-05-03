var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User;

User = mongoose.model('user', new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}));

module.exports = User;