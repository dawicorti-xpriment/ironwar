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
            var trackId = '732520';
            this.track = new Audio();
            this.track.addEventListener('loadedmetadata', this.onTrackReady);
            this.track.src = '/assets/music/la_busqueda_de_lanna.ogg';
            return this;
        }

    });

});

