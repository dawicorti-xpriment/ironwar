/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        IronWarObject = require('core/object'),
        IronWarView;

    IronWarView = Backbone.View.extend({

        initialize: function (options) {
            this.cid = _.uniqueId('view');
            this._configure(options || {});
            this._ensureElement();
            this.delegateEvents();
        },

        render: function () {
            if (_.isString(this.template)) {
                if (!_.isFunction(this.getPrototype()._template)) {
                    this.getPrototype()._template = Handlebars.compile(this.template);
                }
                this.$el.html(this.getPrototype()._template(this));                
            }
            return this;
        },

    });

    return IronWarObject.extendable(IronWarView);

});
