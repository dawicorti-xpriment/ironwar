/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        User = require('models/user');

    return IronWar.Collection.extend({

        name: 'users',
        model: User

    });

});