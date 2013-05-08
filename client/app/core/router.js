/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _  = require('underscore'),
        ParticlesBackground = require('views/particlesbackground/view'),
        LoginPage = require('views/loginpage/view'),
        HomePage = require('views/homepage/view'),
        JoinPage = require('views/joinpage/view'),
        InterfaceSpace = require('views/interfacespace/view');

    return Backbone.Router.extend({

        routes: {
            'home': 'home',
            'login': 'login',
            'join': 'join',
            '(:fallback)': 'fallback'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.parent = options.parent;
        },

        login: function () {
            this.renderInterfaceSpace(LoginPage);
        },

        fallback: function () {
            this.navigate('home', {trigger: true});
        },

        home: function () {
            this.renderInterfaceSpace(HomePage);
        },

        join: function () {
            this.renderInterfaceSpace(JoinPage);
        },

        renderInterfaceSpace: function (ViewType, options) {
            if (!this.interfaceSpace) {
                this.interfaceSpace = (new InterfaceSpace({
                    child: new ViewType(options)
                })).render();
            } else {
                this.interfaceSpace.setChild(new ViewType(options));
            }
            this.container.html(this.interfaceSpace.el);
        },

        render: function (ViewType, options) {
            var view = new ViewType(options || {});
            this.container.html(view.render().el);
        },

        start: function () {
            this.container = $('#iron-war');
            Backbone.history.start();
        }

    });

});
