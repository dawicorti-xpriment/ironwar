/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        IronWarObject = require('core/object'),
        IronWarLoader = require('core/loader'),
        IronWarView;

    IronWarView = Backbone.View.extend({

        initialize: function (options) {
            this.cid = _.uniqueId('view');
            this._configure(options || {});
            this._ensureElement();
            this.delegateEvents();
        },

        load: function () {
            var loader = new IronWarLoader({resources: this.resources.required});
            loader.load({complete: this.onResourcesLoaded});
        },

        onResourcesLoaded: function (loadedResources) {
            this.resources.loaded = loadedResources;
            this.fill();
        },

        fill: function () {
            if (_.isString(this.template)) {
                if (!_.isFunction(this.getPrototype()._template)) {
                    this.getPrototype()._template = Handlebars.compile(this.template);
                }
                this.$el.html(this.getPrototype()._template(this));
            }
        },

        render: function () {
            if (_.isObject(this.resources) && _.isArray(this.resources.required)) {
                this.load();
            } else {
                this.fill();
            }
            return this;
        }

    });

    return IronWarObject.extendable(IronWarView);

});
