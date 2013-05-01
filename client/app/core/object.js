/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        local = {};

    function IronWarObject(options) {
        this.initialize(options);
    }

    IronWarObject.prototype.initialize = function (options) {};

    local.addChildUtils = function (ChildConstructor, constructor) {
        ChildConstructor.prototype.getPrototype = function () {
            return ChildConstructor.prototype;
        };
        ChildConstructor.prototype.super = function () {
            var funcName = arguments[0],
                args = _.rest(arguments);
            constructor.prototype[funcName].apply(this, args);
        }
    };

    local.getChildConstructor = function (constructor, definition) {
        function ChildConstructor(options) {
            _.bindAll(this);
            this.initialize(options);
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