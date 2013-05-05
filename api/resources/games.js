var Resource = require('../core/resource'),
    Game = require('../models/game');

module.exports = Resource.extend({

    name: 'games',

    exclude: ['password'],
    allowedMethods: ['get', 'post'],
    modelName: Game.modelName

});