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
            Backbone.Collection.apply(this, [[], options]);
            this.on('error', this.onError);
        },

        parse: function (response) {
            return response.data.objects;
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