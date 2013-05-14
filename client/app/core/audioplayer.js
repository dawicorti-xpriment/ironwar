/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        $ = require('jquery'),
        Howl = require('Howler').Howl,
        IronWarObject = require('core/object'),
        IronWarAudioPlayer;

    IronWarAudioPlayer = IronWarObject.extend({

        initialize: function (options) {
            this.howl = null;
        },

        load: function (options) {
            var loadCallback = options.load || $.noop;
            this.howl = new Howl({
                urls: [options.url],
                onload: loadCallback
            });
        },

        play: function () {
            this.howl.loop(false);
            this.howl.play();
        },

        loop: function () {
            this.howl.loop(true);

                            /* TO DELETE
            this.howl.play();*/
        },

        stop: function () {
            if (_.isObject(this.howl)) {
                this.howl.stop();
            }
        }

    });

    return IronWarAudioPlayer;
});