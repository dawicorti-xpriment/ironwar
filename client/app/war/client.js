/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        IronWar = require('core/namespace'),
        SockJS = require('sockjs');

    return IronWar.Object.extend({

        initialize: function () {
            this.socket = new SockJS('/war');
            this.socket.onmessage = this.onMessage;
            this.callbacks = {};
        },

        onMessage: function (rawData) {
            var data = JSON.parse(rawData);
            console.log(data);
            if (_.has(this.callbacks, data.name)) {
                this.callbacks[data.name](this, data);
            }
        },

        on: function (name, callback) {
            this.callbacks[name] = callback;
        },

        emit: function (name, body) {
            var data = body || {};
            body.name = name;
            this.socket.send(JSON.stringify(data));
        }


    });

});