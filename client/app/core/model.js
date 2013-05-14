/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        IronWarObject = require('core/object'),
        IronWarModel;

    IronWarModel = Backbone.Model.extend({

        construct: function (options) {
            Backbone.Model.apply(this, [options]);
        },

        parse: function (response) {
            var objects = response.data.objects || [];
            return objects.length > 0 ? objects[0] : {};
        },

        url: function () {
            return '/api/' + this.name;
        }

    });

    return IronWarObject.extendable(IronWarModel);

});