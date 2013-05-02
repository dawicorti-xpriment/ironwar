/*global define,window*/
"use strict";

define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        ParticlesBackground = require('views/particlesbackground/view'),
        LoginForm = require('views/loginform/view');

    return Backbone.Router.extend({

        interfaceTrack: '/assets/music/la_busqueda_de_lanna.ogg',

        routes: {
            'login': 'login'
        },

        login: function () {
            this.renderInterfaceSpace(LoginForm);
        },

        renderInterfaceSpace: function (ViewType, options) {
            var IronWar = require('core/namespace');
            if ($('.' + ParticlesBackground.prototype.className, $('body')).length === 0) {
                $('body').append((new ParticlesBackground()).render().el);
            }
            if (IronWar.audioPlayer.currentTrack !== this.interfaceTrack) {
                IronWar.audioPlayer.play({
                    url: this.interfaceTrack,
                    loop: true
                });
            } else {
                this.render(ViewType, options);
            }
        },

        render: function (ViewType, options) {
            var view = new ViewType(options || {});
            this.container.html(view.render().el);
        },

        start: function () {
            this.container = $('<div></div>').attr('id', 'iron-war');
            $(window.document.body).html(this.container);
            Backbone.history.start();
        }

    });

});
