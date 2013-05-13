/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        War = require('war/war'),
        Header = require('views/header/view'),
        Menu = require('views/menu/view');

    return IronWar.View.extend({
        className: 'create-page page',

        fill: function () {
            var war = new War();
            IronWar.View.prototype.fill.apply(this);
            this.$el.append(
                new Header().render().el,
                new Menu().render().el
            );
            return this;
        }

    });

});