#!/usr/bin/env node

var requirejs = require('requirejs'),
    fs = require('fs'),
    exec = require('child_process').exec,
    file = require('file'),
    config = require('./config'),
    lessViews = [];

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

module.exports = {

    buildJS: function () {
        requirejs.optimize(   
            config,
            null,
            function (error) {
                console.log(error);
            }
        );
    },

    buildLessModulesFile: function () {
        file.walkSync('client/app', function (dirPath, dirs, fileNames) {
            fileNames.forEach(function (fileName) {
                if (fileName.endsWith('.less')) {
                    lessViews.push("@import '/" + dirPath + '/' + fileName + "';");
                }
            });
        });
        fs.writeFileSync('client/assets/less/views.less', lessViews.join('\n'));
    },

    buildCSS: function () {
        exec('lessc -x client/assets/less/main.less client/assets/css/ironwar.css', function (error, stdout, stderr) {
            if (!!stderr) console.log(stderr);
        });
    },

    build: function () {
        console.log('Build Less modules file ...');
        this.buildLessModulesFile();
        console.log('Build CSS ...');
        this.buildCSS();
        console.log('Build JS ...');
        this.buildJS();
    },

};