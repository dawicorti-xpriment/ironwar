#!/usr/bin/env node

var requirejs = require('requirejs'),
    fs = require('fs'),
    exec = require('child_process').exec,
    file = require('file'),
    lessViews = [];

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

file.walkSync('client/app', function (dirPath, dirs, fileNames) {
    fileNames.forEach(function (fileName) {
        if (fileName.endsWith('.less')) {
            lessViews.push("@import '/" + dirPath + '/' + fileName + "';");
        }
    });
});


console.log('Build JS File ...')

requirejs.optimize({
        paths: {
            text: '../lib/require-text',
            hbs: '../lib/require-tpl',        
            jquery: '../lib/jquery-1.9.1',
            handlebars: '../lib/handlebars',
            underscore: '../lib/underscore',
            backbone: '../lib/backbone'
        },
        shim: {
            hbs: {
                deps: ['text']
            },
            handlebars: {
                exports: 'Handlebars',
            },
            underscore: {
                exports: '_'
            },
            jquery: {
                exports: '$'
            },
            backbone: {
                deps: ['jquery', 'underscore'],
                exports: 'Backbone'
            }
        },
        deps: ['hbs'],
        baseUrl: "client/app",
        optimize: 'none',
        name: 'core/game',
        out: 'client/ironwar.js'
    },
    null,
    function (error) {
        console.log(error);
    }
);

console.log('Build CSS File ...')
fs.writeFileSync('client/assets/less/views.less', lessViews.join('\n'));
exec('lessc -x client/assets/less/main.less client/assets/css/ironwar.css', function (error, stdout, stderr) {
    if (!!stderr) console.log(stderr);
});
