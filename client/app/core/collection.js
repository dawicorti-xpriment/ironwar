/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        IronWarObject = require('core/object'),
        IronWarCollection;

    IronWarCollection = Backbone.Collection.extend({

        construct: function (options) {
            options  = options || {};
            if (options.url) {
                this.url = options.url;
            }
            if (options.model) {
                this.model = options.model;
            }
            if (options.comparator) {
                this.comparator = options.comparator;
            }
            this._reset();
            this.on('error', this.onError);
            this.initialize(options);
        },

        onError: function () {
            IronWarCollection.prototype.router.navigate('login', {trigger: true});
        },

        url: function () {
            return '/api/' + this.name;
        }

    });

    return IronWarObject.extendable(IronWarCollection);

});