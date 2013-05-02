/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        local = {};

    function IronWarObject(options) {
        this.construct(options);
    }

    IronWarObject.prototype.construct = function (options) {
        this.initialize(options);
    };
    IronWarObject.prototype.initialize = function (options) {};

    local.addChildUtils = function (ChildConstructor, constructor) {
        ChildConstructor.prototype.getPrototype = function () {
            return ChildConstructor.prototype;
        };
    };

    local.getChildConstructor = function (constructor, definition) {
        function ChildConstructor(options) {
            _.bindAll(this);
            this.construct(options);
        }
        _.extend(ChildConstructor.prototype, constructor.prototype);
        _.extend(ChildConstructor.prototype, definition);
        local.addChildUtils(ChildConstructor, constructor);
        return ChildConstructor;
    };

    IronWarObject.extendable = function (constructor) {
        constructor.extend = function (definition) {
            return local.getChildConstructor(constructor, definition);
        };
        return constructor;
    };

    return IronWarObject.extendable(IronWarObject);

});