#!/usr/bin/env node
var clientBuilder = require('./client/builder');
    nconf = require('nconf'),
    express = require('express'),
    app = express(),
    port = 80;

nconf.argv().env();
nconf.file({file: 'config.json'});
clientBuilder.build();

app.get(/^(.+)$/, function(req, res) {
    res.sendfile('client/' + req.params[0]);
});

port = nconf.get('webserver').port
console.log('[ The Game Server is running now, at port ' + port + ' ]');
app.listen(port);