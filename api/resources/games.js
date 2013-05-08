"use strict";

var Resource = require('../core/resource'),
    Game = require('../models/game');

module.exports = Resource.extend({

    name: 'games',
    populate: ['user'],

    exclude: ['password'],
    allowedMethods: ['get', 'post'],
    modelName: Game.modelName,

    dehydrate: function (object, data) {
        data.user = object.user.username;
    },

});