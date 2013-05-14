/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        Client = require('war/client'),
        Token = require('models/token');

    return IronWar.Object.extend({

        initialize: function () {
            this.client = new Client();
            this.client.on('auth:request', this.onAuthRequest);
        },

        onAuthRequest: function () {
            this.token = new Token();
            this.token.save({success: this.onTokenCreated});
        },

        onTokenCreated: function () {
            this.client.emit('auth:authenticate', {token: this.token})
        }

    });


});