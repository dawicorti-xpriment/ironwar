var Resource = require('../core/resource'),
    User = require('../models/user');

module.exports = Resource.extend({

    name: 'users',

    allowedMethods: ['post', 'get'],
    exclude: ['password', 'email'],
    modelName: User.modelName

});