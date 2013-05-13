/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        Client = require('war/client');

    return IronWar.Object.extend({

        initialize: function () {
            this.client = new Client();
        }

    });


});