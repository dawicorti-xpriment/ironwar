/*global define,window*/
"use strict";

define(function (require) {

    var Backbone = require('backbone'),
        $ = require('jquery'),
        LoginPage = require('views/loginpage/view');

    return Backbone.Router.extend({

        routes: {
            'login': 'login',
        },

        login: function () {
            this.render(LoginPage);
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
