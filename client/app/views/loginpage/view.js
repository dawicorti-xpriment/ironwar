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

        onTrackLoaded: function () {
            this.$el.append(
                (new ParticlesBackground()).render().el,
                (new LoginForm()).render().el
            );
        },

        render: function () {
            IronWar.audioPlayer.play({
                url: '/assets/music/la_busqueda_de_lanna.ogg',
                load: this.onTrackLoaded
            });
            return this;
        }

    });

});

