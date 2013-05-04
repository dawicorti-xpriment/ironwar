/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        sha256 = require('sha256'),
        template = require('hbs!views/loginform/template');

    return IronWar.View.extend({

        template: template,
        resources: {
            required: [
                {name: 'logo', type: 'image', path: '/assets/images/logo.png'}
            ]
        }

    });

});