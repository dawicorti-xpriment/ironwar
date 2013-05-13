"use strict";

var wrapper = require('./wrapper'),
    authAPI = require('../api/core/auth'),
    auth = {};

auth.tokens = {};

auth.authenticated = function (socket, data, callback) {

};

auth.createToken = function (socket, data) {
    console.log(socket);
};

auth.messages = {
    'auth:token:create': auth.createToken
};

auth.start = function (socket) {
    wrapper.wrap(socket, auth.messages);
    socket.emit('auth:request');
};

module.exports = auth;