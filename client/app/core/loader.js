/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        $ = require('jquery'),
        IronWarObject = require('core/object'),
        IronWarLoader;

    IronWarLoader = IronWarObject.extend({

        types: {
            image: 'loadImageResource',
            collection: 'loadCollectionResource'
        },

        initialize: function (options) {
            this.resources = options.resources;
            this.resourcesLeft = _.clone(options.resources);
            this.loadedResources = {};
        },

        load: function (options) {
            this.onProgress = options.progress || $.noop;
            this.onComplete = options.complete || $.noop;
            this.loadNextResource();
        },

        loadCollectionResource: function (resource) {
            resource.collection.fetch({success: this.onResourceLoaded});
        },

        loadImageResource: function (resource) {
            var image = $('<img />');
            image.load(this.onResourceLoaded);
            this.loadedResources[resource.name] = image;
            image.attr('src', resource.path);
        },

        loadNextResource: function () {
            if (this.resourcesLeft.length > 0) {
                var resource = this.resourcesLeft[0];
                this.resourcesLeft = _.rest(this.resourcesLeft);
                this[this.types[resource.type]](resource);
            } else {
                this.onComplete(this.loadedResources);
            }
        },

        onResourceLoaded: function () {
            this.onProgress({
                count: this.resources.length,
                state: this.resources.length - this.resourcesLeft.length
            });
            this.loadNextResource();
        }

    });

    return IronWarLoader;

});