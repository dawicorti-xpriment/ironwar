/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        template = require('hbs!views/loginpage/template'),
        LoginForm = require('views/loginform/view');

    return IronWar.View.extend({

        template: template,
        className: 'login-page page',

        resources: {
            required: [
                {name: 'logo', type: 'image', path: '/assets/images/logo.png'}
            ]
        },

        fill: function () {
            IronWar.View.prototype.fill.apply(this);
            this.$el.append(new LoginForm().render().el);
        }

    });

});