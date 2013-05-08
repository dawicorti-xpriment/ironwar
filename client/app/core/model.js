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
        }

    });

    return IronWarObject.extendable(IronWarModel);

});