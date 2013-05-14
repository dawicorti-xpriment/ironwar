/*jslint nomen: true*/
"use strict";

var wrapper = require('./wrapper'),
    Token = require('../api/models/token'),
    auth = {};

auth.authenticated = function (callback) {
    auth._callback = callback;
};

auth.populateUser = function (socket, data, token) {
    token.populate('user').exec(function (error, token) {
        if (error) {
            socket.emit('auth:authenticate:fail', {error: 'token incorrect : no user found'});
        } else {
            socket.user = token.toObject().user;
            socket.emit('auth:authenticate:success');
        }
    });
};

auth.findToken = function (socket, data) {
    Token.findOne({token: data.token}, function (error, token) {
        if (error) {
            socket.emit('auth:authenticate:fail', {error: 'token does not exist'});
        } else {
            auth.populateUser(socket, data, token);
        }
    });
};

auth.authenticate = function (socket, data) {
    if (!data.hasOwnProperty('token')) {
        socket.emit('auth:authenticate:fail', {error: 'No token has been sent'});
    } else {
        auth.findToken(socket, data);
    }
};

auth.messages = {
    'auth:authenticate': auth.authenticate
};

auth.start = function (socket) {
    wrapper.wrap(socket, auth.messages);
    socket.emit('auth:request');
};

module.exports = auth;