var Resource = require('../core/resource'),
    User = require('../models/user');

module.exports = Resource.extend({

    name: 'user',

    allowedMethods: ['get'],
    exclude: ['password', 'email'],
    modelName: User.modelName

});