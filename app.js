#!/usr/bin/env node
var express = require('express'),
    app = express(),
    nconf = require('nconf'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    auth = require('./api/core/auth'),
    client = require('./client/index'),
    urls = require('./api/urls')
    sockjs  = require('sockjs'),
    http = require('http'),
    warserver = require('./warserver/warserver');

nconf.argv().env();
nconf.file({file: 'config.json'});
app.command = nconf.get('c') || nconf.get('command');

app.commands = {

    initDB: function () {
        mongoose.connect(nconf.get('mongodb').url);
        return app;
    },

    build: function () {
        client.build();
        return app;
    },

    prepareExpress: function () {
        app.configure(function () {
            app.set('port', nconf.get('webserver').port);
            app.use(express.logger());
            app.use(express.cookieParser());
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.session({secret: nconf.get('webserver').secret}));
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(app.router);
        });
        return app;
    },

    runserver: function () {
        var sockServer = sockjs.createServer()
            webServer = http.createServer(app);
        sockServer.installHandlers(webServer, {prefix:'/war'});
        this.initDB();
        this.build();
        auth.init();
        app.commands.prepareExpress();
        urls.registerAll(app);
        auth.listen(app);
        app.get(/^(.+)$/, client.index);
        console.log('Server is now running on port %d', app.get('port'));
        webServer.listen(app.get('port'), '0.0.0.0');
        sockServer.on('connection', warserver.start);
        return app;
    }

};

if (app.commands.hasOwnProperty(app.command)) {
    app.commands[app.command]();
}

module.exports = app;