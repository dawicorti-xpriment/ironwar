/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        ParticlesBackground = require('views/particlesbackground/view'),
        LoginForm = require('views/loginform/view');

    return IronWar.View.extend({

        className: 'login-page',

        onTrackReady: function () {
            this.track.play();
            this.track.addEventListener('ended', this.onTrackEnd);
            this.$el.append(
                (new ParticlesBackground()).render().el,
                (new LoginForm()).render().el
            );
        },

        onTrackEnd: function () {
            this.track.play();
        },

        render: function () {
            this.track = new Audio();
            this.track.addEventListener('loadedmetadata', this.onTrackReady);
            this.track.src = 'http://storage-new2.newjamendo.com/tracks/732520_96.mp3';
            return this;
        }

    });

});