/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        Users = require('collections/users'),
        Header = require('views/header/view'),
        Menu = require('views/menu/view');

    return IronWar.View.extend({
        className: 'home-page page',
        resources: {
            required: [
                {name: 'users', type: 'collection', collection: new Users()}
            ]
        },

        fill: function () {
            IronWar.View.prototype.fill.apply(this);
            this.$el.append(
                new Header().render().el,
                new Menu().render().el
            );
            return this;
        }

    });

});