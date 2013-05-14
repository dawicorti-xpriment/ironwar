/*jslint nomen: true*/
"use strict";

var wrapper = require('./wrapper'),
    authAPI = require('../api/core/auth'),
    auth = {};

auth.authenticated = function (callback) {
    auth._callback = callback;
};

auth.messages = {
    'auth:token:create': auth.createToken
};

auth.start = function (socket) {
    wrapper.wrap(socket, auth.messages);
    socket.emit('auth:request');
};

module.exports = auth;