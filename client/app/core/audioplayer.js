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
            this.currentTrack = null;
        },

        play: function (options) {
            var loadCallback = options.load || $.noop,
                loop = options.loop || false;
            this.stop();
            this.currentTrack = options.url;
            this.howl = new Howl({
                urls: [options.url],
                onload: loadCallback,
                loop: loop
            });
            this.howl.play();
        },

        stop: function () {
            if (_.isObject(this.howl)) {
                this.howl.stop();
            }
        }

    });

    return IronWarAudioPlayer;
});