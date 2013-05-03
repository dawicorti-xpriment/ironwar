/*jslint nomen: true*/
"use strict";

var _ = require('underscore');

module.resources = [
    require('./resources/users')
];

module.exports = {

    routes: [
        {url: '^/api/%name%(/.*)*$', cb: 'read', method: 'get'},
        {url: '^/api/%name%$', cb: 'create', method: 'post'},
    ],

    registerUrl: function (app, ResourceType, route) {
        var name = ResourceType.prototype.name;
        app[route.method](
            new RegExp(route.url.replace('%name%', name)),
            function (req, res) {
                var resource = new ResourceType({req: req, res: res});
                resource[route.cb]();
            }
        );
    },

    register: function (app, ResourceType) {
        _.each(this.routes, function (route) {
            this.registerUrl(app, ResourceType, route);
        }, this);
    },

    registerAll: function (app) {
        _.each(module.resources, function (ResourceType) {
            this.register(app, ResourceType);
        }, this);
    }

};

_.bindAll(module.exports);