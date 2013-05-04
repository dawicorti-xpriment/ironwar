/*jslint nomen: true*/
"use strict";

var _ = require('underscore');

function ExcludeFilter(options) {
    _.bindAll(this);
    this.initialize(options);
}

_.extend(ExcludeFilter.prototype, {

    defaultExclude: ['_id', '__v'],

    initialize: function (options) {
        this.req = options.resource.req;
        this.res = options.resource.res;
        this.exclude = _.union(options.resource.exclude || [], this.defaultExclude);
    },

    filter: function (objects) {
        var filteredObjects = [];
        _.each(objects, function (object) {
            filteredObjects.push(_.omit(object, this.exclude));
        }, this);
        return filteredObjects;
    },

});

module.exports = ExcludeFilter;


