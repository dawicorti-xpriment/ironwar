/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _  = require('underscore'),
        ParticlesBackground = require('views/particlesbackground/view'),
        LoginForm = require('views/loginform/view'),
        Home = require('views/home/view');

    return Backbone.Router.extend({

        interfaceTrack: '/assets/music/la_busqueda_de_lanna.ogg',

        routes: {
            'home': 'home',
            'login': 'login',
            '(:fallback)': 'fallback'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.parent = options.parent;
        },

        login: function () {
            this.renderInterfaceSpace(LoginForm);
        },

        fallback: function () {
            this.navigate('home', {trigger: true});
        },

        home: function () {
            this.renderInterfaceSpace(Home);
        },

        onTrackLoaded: function () {
            if ($('.' + ParticlesBackground.prototype.className, $('body')).length === 0) {
                $('body').append((new ParticlesBackground()).render().el);
            }
            this.render(this.next.ViewType, this.next.options);
        },

        renderInterfaceSpace: function (ViewType, options) {
            if (this.parent.audioPlayer.currentTrack !== this.interfaceTrack) {
                this.next = {
                    ViewType: ViewType,
                    options: options
                };
                this.parent.audioPlayer.play({
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
            this.container = $('<div></div>').attr('id', 'iron-war');
            $(window.document.body).html(this.container);
            Backbone.history.start();
        }

    });

});
