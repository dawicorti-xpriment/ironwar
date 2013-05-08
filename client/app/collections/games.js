/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        Game = require('models/game');

    return IronWar.Collection.extend({

        name: 'games',
        model: Game

    });

});