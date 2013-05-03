#!/usr/bin/env node

var requirejs = require('requirejs'),
    nconf = require('nconf'),
    fs = require('fs'),
    exec = require('child_process').exec,
    file = require('file'),
    lessViews = [];

module.exports = {

    buildJS: function () {
        requirejs.optimize(   
            nconf.get("requirejs"),
            null,
            function (error) {
                console.log(error);
            }
        );
    },

    buildLessModulesFile: function () {
        file.walkSync('client/app', function (dirPath, dirs, fileNames) {
            fileNames.forEach(function (fileName) {
                if (fileName.match('\.less$')) {
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