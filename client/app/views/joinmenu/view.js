/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        sha256 = require('sha256'),
        template = require('hbs!views/joinmenu/template');

    return IronWar.View.extend({

        template: template,
        className: 'join-menu',

    });

});