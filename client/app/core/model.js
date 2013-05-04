/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        IronWarObject = require('core/object'),
        modelOptions = ['url', 'urlRoot', 'collection'],
        IronWarModel;

    IronWarModel = Backbone.Model.extend({

        construct: function (options) {
            var defaults,
                attrs = {};
            options = options || {};
            this.cid = _.uniqueId('c');
            this.attributes = {};
            _.extend(this, _.pick(options, modelOptions));
            if (options.parse) {
                attrs = this.parse(attrs, options) || {};
            }
            defaults = _.result(this, 'defaults');
            if (defaults) {
                attrs = _.defaults({}, attrs, defaults);
            }
            this.set(attrs, options);
            this.changed = {};
            this.initialize(options);
        }

    });

    return IronWarObject.extendable(IronWarModel);

});