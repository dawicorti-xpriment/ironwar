"use strict";

var utils = require('./utils'),
    authAPI = require('../api/core/auth'),
    auth = {};

auth.tokens = {};

auth.authenticated = function (socket, data, callback) {

};

auth.createToken = function (socket, data) {
    console.log(socket);
};

auth.start = function (socket) {
    utils.serve({
        'auth:token:create': auth.createToken
    });
    socket.emit('auth:request');
};

module.exports = auth;