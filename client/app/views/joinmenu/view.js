/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        Games = require('collections/games'),
        template = require('hbs!views/joinmenu/template');

    return IronWar.View.extend({

        template: template,
        className: 'join-menu',

        resources: {
            required: [
                {name: 'games', type: 'collection', collection: new Games()}
            ]
        },

        games: function () {
            return this.resources.loaded.games.toJSON();
        }
    });

});