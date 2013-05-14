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
    criteria: {},
    populate: [],

    initialize: function (options) {
        this.req = options.req;
        this.res = options.res;
        this.model = require('../models/' + this.modelName.toLowerCase());
        this.filters = _.union(this.filters || [], this.defaultFilters);
    },

    filterObjects: function (objects) {
        var datas = [];
        _.each(objects, function (object) {
            var data = object.toObject();
            this.dehydrate(object, data);
            datas.push(data);
        }, this);
        _.each(this.filters, function (FilterType) {
            var filterObj = new FilterType({resource: this});
            datas = filterObj.filter(datas);
        }, this);
        return datas;
    },

    send: function (error, objects) {
        if (error) {
            this.res.status(400);
        }
        this.res.send({
            data: {
                objects: this.filterObjects(objects)
            },
            error: error
        });
    },

    read: function () {
        this.model = this.model.find(this.criteria);
        _.each(this.populate, function (field) {
            this.model = this.model.populate(field);
        }, this);
        this.model.exec(this.send);
    },

    create: function () {
        var Model = this.model,
            options = _.pick(this.req.body, _.keys(Model.schema.tree)),
            object = new Model(options);
        this.hydrate(object);
        object.save(_.bind(function (error) {
            this.send(error, [object]);
        }, this));
    },

    hydrate: function (object) {},

    dehydrate: function (object, data) {},

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

