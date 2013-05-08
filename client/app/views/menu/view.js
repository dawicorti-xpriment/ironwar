/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        template = require('hbs!views/menu/template');

    return IronWar.View.extend({
        className: 'menu',
        template: template,

        events: {
            'click button.join': 'onClickJoin'
        },

        onClickJoin: function () {
            IronWar.router.navigate('join', {trigger: true});
        }

    });

});