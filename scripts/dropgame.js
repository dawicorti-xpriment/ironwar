#!/usr/bin/env node

var app = require('../app').commands.initDB(),
    Game = require('../api/models/game');

Game.remove({}, function (err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log('All games were successfully removed');
    }
    process.exit();
});
