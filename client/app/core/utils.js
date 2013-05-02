/*global define,window*/
"use strict";

define(function (require) {

    var IronWarObject = require('core/object'),
        uuid = require('uuid');

    return IronWarObject.extend({

        requestAnimationFrame: function (callback) {
            var requestAnimationFrame =  window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame;
            requestAnimationFrame(callback);
        },

        uuid: function () {
            return uuid();
        },

    });

});
