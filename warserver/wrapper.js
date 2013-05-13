/*jslint nomen: true*/
"use strict";

var wrapper = {},
    _ = require('underscore');

function Wrapper(socket, messages) {
    _.bindAll(this);
    this.socket = socket;
    this.socket.emit = this.emit;
    this.messages = messages;
}

Wrapper.prototype.emit = function (name, body) {
    var data = body || {};
    data.name = name;
    this.socket.write(JSON.stringify(data));
};

Wrapper.prototype.onData = function (rawData) {
    var data;
    try {
        data = JSON.parse(rawData);
        if (this.messages.hasOwnProperty(data.name)) {
            this.messages[data.name](this.socket, data);
        }
    } catch (err) {
        console.log(err);
    }
};

wrapper.wrap = function (socket, messages) {
    var message, wrapper;
    wrapper = new Wrapper(socket, messages);
    socket.on('data', wrapper.onData);
};

module.exports = wrapper;
