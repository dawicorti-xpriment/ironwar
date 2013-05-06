#!/usr/bin/env node

var app = require('../app').commands.initDB(),
    nconf = require('nconf'),
    crypto = require('crypto'),
    User = require('../api/models/user'),
    username = nconf.get('u') || nconf.get('username'),
    password = nconf.get('p') || nconf.get('password'),
    email = nconf.get('e') || nconf.get('email'),
    user = new User({
        username: username,
        password: crypto.createHash("sha256").update('' + password).digest('hex'),
        email: email
    });

user.save(function (err, doc) {
    if (err) {
        console.log(err);
    } else {
        console.log('user "' + username + '" was successfully created');
    }
    process.exit();
});

