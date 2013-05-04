/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        template = require('hbs!views/home/template');

    return IronWar.View.extend({
        template: template
    });

});