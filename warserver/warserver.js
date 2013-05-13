"use strict";

var auth = require('./auth'),
    warserver = {};

warserver.start = function (socket) {
    auth.start(socket);
};

module.exports = warserver;