var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User;

module.exports = mongoose.model('user', new Schema({
    username: {type: String, match: /^[\w]{4,16}$/, required: true},
    email: {type: String, match: /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*\s+&lt;(\w[\-._\w]*\w@\w[\-._\w]*\w\.\w{2,3})&gt;$|^(\w[\-._\w]*\w@\w[\-._\w]*\w\.\w{2,3})$/, required: true, unique: true},
    password: {type: String, match: /^[\w]{64}$/, required: true}
}));
