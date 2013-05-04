/*global define,window*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        Router = require('core/router');

    function Game() {
    }

    Game.prototype.start = function () {
        IronWar.router = new Router({parent: IronWar});
        IronWar.Collection.prototype.router = IronWar.router;
        IronWar.Model.prototype.router = IronWar.router;
        IronWar.router.start();
    };

    return Game;
});
