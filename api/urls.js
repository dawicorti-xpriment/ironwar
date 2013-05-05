/*jslint nomen: true*/
"use strict";

var _ = require('underscore'),
    auth = require('./core/auth');

module.resources = [
    require('./resources/users'),
    require('./resources/games')
];

module.exports = {

    routes: [
        {url: '^/api/%name%$', cb: 'create', method: 'post'},
        {url: '^/api/%name%(/.*)*$', cb: 'read', method: 'get'},
    ],

    registerUrl: function (app, ResourceType, route) {
        var name = ResourceType.prototype.name;
        app[route.method](
            new RegExp(route.url.replace('%name%', name)),
            ResourceType.prototype.auth || auth.ensureAuthenticated,
            function (req, res) {
                var resource = new ResourceType({req: req, res: res});
                resource[route.cb]();
            }
        );
    },

    register: function (app, ResourceType) {
        _.each(this.routes, function (route) {
            if (_.indexOf(ResourceType.prototype.allowedMethods, route.method) >= 0) {
                this.registerUrl(app, ResourceType, route);
            }
        }, this);
    },

    registerAll: function (app) {
        _.each(module.resources, function (ResourceType) {
            this.register(app, ResourceType);
        }, this);
    }

};

_.bindAll(module.exports);