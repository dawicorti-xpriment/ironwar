/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        Users = require('collections/users'),
        template = require('hbs!views/home/template');

    return IronWar.View.extend({
        template: template,
        resources: {
            required: [
                {name: 'users', type: 'collection', collection: new Users()}
            ]
        },
    });

});