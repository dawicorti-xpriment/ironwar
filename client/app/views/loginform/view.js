/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        sha256 = require('sha256'),
        template = require('hbs!views/loginform/template');

    return IronWar.View.extend({

        template: template,
        className: 'login-form',

        events: {
            'click .connect': 'auth',
            'keypress input': 'checkKey'
        },

        checkKey: function (event) {
            if (event.which === 13) {
                this.auth();
            }
        },

        auth: function () {
            $.post('/login', {
                username: $('.user', this.$el).val(),
                password: sha256($('.password', this.$el).val())
            }).done(this.onAuthSuccess).fail(this.onAuthFail);
        },

        onAuthSuccess: function () {
            IronWar.router.navigate('home', {trigger: true});
        },

        onAuthFail: function () {
            $('.error', this.$el).html('Authentication failed : Bad login or password');
        },


    });

});