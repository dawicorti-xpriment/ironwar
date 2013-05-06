/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        Spinner = require('spin');

    return IronWar.View.extend({
        className: 'spinner',

        radius: 55,

        initialize: function (options) {
            this.left = options.left - 2 * this.radius;
            this.top = options.top - 2 * this.radius;
        },

        render: function () {
            this.spinner = new Spinner({
                lines: 13,
                length: 14,
                width: 2,
                radius: this.radius,
                corners: 1,
                rotate: 0,
                direction: 1,
                color: '#CD5551',
                speed: 1,
                trail: 60,
                shadow: true,
                hwaccel: false,
                className: 'spinner',
                zIndex: 2e9,
                top: this.top,
                left: this.left
            }).spin(this.el);
            return this;
        }
    });

});
