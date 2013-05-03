#!/usr/bin/env node
var clientBuilder = require('./client/builder');
    express = require('express'),
    app = express();

clientBuilder.build();

app.get(/^(.+)$/, function(req, res) {
    res.sendfile('client/' + req.params[0]);
});

console.log('[ The Game Server is running now ]');
app.listen(8000);