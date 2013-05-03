/*jslint nomen: true*/
"use strict";

var _ = require('underscore');

function Resource(options) {
    _.bindAll(this);
    this.initialize(options);
}

_.extend(Resource.prototype, {

    initialize: function (options) {
        this.req = options.req;
        this.res = options.res;
    },

    send: function (error, objects) {
        this.res.send({
            data: {
                objects: objects
            },
            error: error
        });
    },

    read: function () {
        var Model = require('../models/' + this.model);
        Model.find(this.send);
    },

    onError: function (error) {
        this.res.status(400);
        this.send(error, []);
    },

    create: function () {
        var Model = require('../models/' + this.model),
            options = {},
            model;
        _.each(_.keys(Model.schema.tree), function (name) {
            if (_.has(this.req.body, name)) {
                options[name] = this.req.body[name];
            }
        }, this);
        model = new Model(options);
        model.save(this.onError);
    }

});

Resource.extend = function (def) {
    var constructor = Resource;
    function ChildConstructor(options) {
        _.bindAll(this);
        this.initialize(options);
    }
    _.extend(ChildConstructor.prototype, constructor.prototype);
    _.extend(ChildConstructor.prototype, def);
    return ChildConstructor;
};

module.exports = Resource;

