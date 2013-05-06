#!/usr/bin/env node

var app = require('../app').commands.initDB(),
    nconf = require('nconf'),
    User = require('../api/models/user'),
    Game = require('../api/models/game'),
    username = nconf.get('u') || nconf.get('username'),
    name = nconf.get('n') || nconf.get('name');

User.find({username: username}, function (err, user) {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        var game = new Game({name: name, user: user.id});
        game.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('game "' + name + '" was successfully created');
            }
            process.exit();
        });
    }
});
