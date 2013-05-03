#!/usr/bin/env node
var express = require('express'),
    app = express(),
    nconf = require('nconf'),
    Jest = require('jest'),
    mongoose = require('mongoose'),
    client = require('./client/index'),
    urls = require('./api/urls'),
    ironwar = {};

nconf.argv().env();
nconf.file({file: 'config.json'});
client.build();
mongoose.connect(nconf.get('mongodb').url);

ironwar.client = function (req, res) {
    client.index(req, res);
};

urls.register(app);

app.get(/^(.+)$/, ironwar.client);

app.configure(function () {
    app.set('port', nconf.get('webserver').port);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.listen(app.get('port'), function(){
    console.log('Server is now running on port %d', app.get('port'));
})