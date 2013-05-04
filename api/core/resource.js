/*jslint nomen: true*/
"use strict";

var _ = require('underscore'),
    ExcludeFilter = require('./excludefilter');

function Resource(options) {
    _.bindAll(this);
    this.initialize(options);
}

_.extend(Resource.prototype, {

    allowedMethods: [],
    defaultFilters: [ExcludeFilter],

    initialize: function (options) {
        this.req = options.req;
        this.res = options.res;
        this.model = require('../models/' + this.modelName);
        this.filters = _.union(this.filters || [], this.defaultFilters);
    },

    filterObjects: function (objects) {
        var filteredObjects = _.map(objects, function (o) { return o.toObject(); });
        _.each(this.filters, function (FilterType) {
            var filterObj = new FilterType({resource: this});
            filteredObjects = filterObj.filter(filteredObjects);
        }, this);
        return filteredObjects;
    },

    send: function (error, objects) {
        this.res.send({
            data: {
                objects: this.filterObjects(objects)
            },
            error: error
        });
    },

    read: function () {
        this.model.find(this.send);
    },

    onError: function (error) {
        if (error) {
            this.res.status(400);
            this.send(error, []);
        }
    },

    create: function () {
        var Model = this.model,
            options = _.pick(this.req.body, _.keys(Model.schema.tree)),
            entry;
        try {
            _.extend(options, this.hydrate());
        } catch (error) {
            this.onError(error);
        }
        entry = new Model(options);
        entry.save(this.onError);
    },

    hydrate: function () {
        return {};
    },

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

