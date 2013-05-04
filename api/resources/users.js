var Resource = require('../core/resource'),
    User = require('../models/user');

module.exports = Resource.extend({

    allowedMethods: ['get', 'post', 'put'],
    exclude: ['password', 'email'],
    name: 'users',
    modelName: User.modelName

});