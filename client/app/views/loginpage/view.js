/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        sha256 = require('sha256'),
        template = require('hbs!views/loginpage/template');

    return IronWar.View.extend({

        template: template,
        className: 'login-page',

        resources: {
            required: [
                {name: 'logo', type: 'image', path: '/assets/images/logo.png'}
            ]
        },

        events: {
            'click .login-form .connect': 'auth',
            'keypress .login-form input': 'checkKey'
        },

        checkKey: function (event) {
            if (event.which === 13) {
                this.auth();
            }
        },

        auth: function () {
            $.post('/login', {
                username: $('.login-form .user', this.$el).val(),
                password: sha256($('.login-form .password', this.$el).val())
            }).done(this.onAuthSuccess).fail(this.onAuthFail);
        },

        onAuthSuccess: function () {
            IronWar.router.navigate('home', {trigger: true});
        },

        onAuthFail: function () {
            $('.error', this.$el).html('Authentication failed : Bad login or password');
        }

    });

});