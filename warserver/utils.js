/*jslint nomen: true*/
"use strict";

var utils = {},
    _ = require('underscore');

function Wrapper(socket, callback) {
    _.bindAll(this);
    this.socket = socket;
    this.callback = callback;
}

Wrapper.prototype.run = function (data) {
    this.callback(this.socket, data);
};

utils.serve = function (socket, messages) {
    var message, wrapper;
    for (message in messages) {
        if (messages.hasOwnProperty(message)) {
            wrapper = new Wrapper(socket, messages[message]);
            socket.on(message, wrapper.run);
        }
    }
};

module.exports = utils;