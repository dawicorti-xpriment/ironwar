/*global define,window*/
"use strict";

define(function (require) {

    var Router = require('core/router');

    function Game() {
        this.router = new Router();
    }

    Game.prototype.start = function () {
        this.router.start();
    };

    return Game;
});
