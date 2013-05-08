/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        Users = require('collections/users'),
        Header = require('views/header/view'),
        Menu = require('views/menu/view'),
        JoinMenu = require('views/joinmenu/view');

    return IronWar.View.extend({
        className: 'join-page page',

        fill: function () {
            IronWar.View.prototype.fill.apply(this);
            this.$el.append(
                new Header().render().el,
                new Menu().render().el,
                new JoinMenu().render().el
            );
            return this;
        }

    });

});