/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _  = require('underscore'),
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

        onTrackLoaded: function () {
            if ($('.' + ParticlesBackground.prototype.className, $('body')).length === 0) {
                $('body').append((new ParticlesBackground()).render().el);
            }
            this.render(this.next.ViewType, this.next.options);
        },

        renderInterfaceSpace: function (ViewType, options) {
            var IronWar = require('core/namespace');
            if (IronWar.audioPlayer.currentTrack !== this.interfaceTrack) {
                this.next = {
                    ViewType: ViewType,
                    options: options
                };
                IronWar.audioPlayer.play({
                    url: this.interfaceTrack,
                    loop: true,
                    load: this.onTrackLoaded
                });
            } else {
                if ($('.' + ParticlesBackground.prototype.className, $('body')).length === 0) {
                    $('body').append((new ParticlesBackground()).render().el);
                }
                this.render(ViewType, options);
            }
        },

        render: function (ViewType, options) {
            var view = new ViewType(options || {});
            this.container.html(view.render().el);
        },

        start: function () {
            _.bindAll(this);
            this.container = $('<div></div>').attr('id', 'iron-war');
            $(window.document.body).html(this.container);
            Backbone.history.start();
        }

    });

});
