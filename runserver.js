#!/usr/bin/env node
var client = require('./client/index');
    nconf = require('nconf'),
    express = require('express'),
    app = express(),
    ironwar = {};

nconf.argv().env();
nconf.file({file: 'config.json'});
client.build();

ironwar.client = function (req, res) {
    client.index(req, res);
};


app.get(/^(.+)$/, ironwar.client);
port = nconf.get('webserver').port

app.listen(port);
console.log('[ The Game Server is running now, at port ' + port + ' ]');
