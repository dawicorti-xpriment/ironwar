"use strict";

var Resource = require('../core/resource'),
    Token = require('../models/token'),
    uuid = require('node-uuid');

module.exports = Resource.extend({

    name: 'token',

    allowedMethods: ['post'],
    modelName: Token.modelName,

    hydrate: function (object) {
        object.user = this.req.user;
        object.token = uuid.v4();
        object.createdAt = new Date();
    }

});