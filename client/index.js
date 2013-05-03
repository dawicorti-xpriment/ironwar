#!/usr/bin/env node

var requirejs = require('requirejs'),
    nconf = require('nconf'),
    fs = require('fs'),
    exec = require('child_process').exec,
    file = require('file'),
    Handlebars = require('handlebars'),
    lessViews = [];

module.exports = {

    buildJS: function (id) {
        var config = nconf.get("requirejs");
        config.out = 'client/ironwar-' + id + '.js'
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
                if (fileName.match('\.less$')) {
                    lessViews.push("@import '/" + dirPath + '/' + fileName + "';");
                }
            });
        });
        fs.writeFileSync('client/assets/less/views.less', lessViews.join('\n'));
    },

    buildCSS: function (id) {
        exec('lessc -x client/assets/less/main.less client/assets/css/ironwar-' + id + '.css', function (error, stdout, stderr) {
            if (!!stderr) console.log(stderr);
        });
    },

    build: function () {
        var id = Date.now();
        this.clean();
        this.buildLessModulesFile();
        this.buildCSS(id);
        this.buildJS(id);
        return id;
    },

    getVersionId: function () {
        var versionId = null;
        fs.readdirSync('client').forEach(function (fileName) {
            pattern = fileName.match('^ironwar\-([0-9]+)\.js$')
            if (pattern) {
                versionId = pattern[1];
            }
        });
        return versionId;
    },

    index: function (req, res) {
        var versionId = this.getVersionId();
        if (req.url.match('^[/]?$')) {
            console.log(req.url);
            res.send(Handlebars.compile(
                '' + fs.readFileSync('client/index.hbs')
            )({id: versionId}));
        } else {
            res.sendfile('client/' + req.params[0]);  
        }
    },

    clean: function () {
        var versionId = this.getVersionId();
        if (versionId !== null) {
            fs.unlinkSync('client/assets/css/ironwar-' + versionId + '.css');
            fs.unlinkSync('client/ironwar-' + versionId + '.js');
        }
    }

};