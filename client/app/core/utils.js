/*global define,window*/
"use strict";

define(function (require) {

    var IronWarObject = require('core/object');

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
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },

    });

});
