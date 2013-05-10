/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery'),
        SpinnerView = require('views/spinner/view'),
        ParticlesBackground = require('views/particlesbackground/view');

    return IronWar.View.extend({
        className: 'interface',
        resources: {
            required: [
                {name: 'track', type: 'audio', url: '/assets/music/la_busqueda_de_lanna.ogg'}
            ]
        },

        initialize: function (options) {
            this.child = options.child;
        },

        load: function () {
            this.$el.html(new SpinnerView({left: window.innerWidth / 2, top: window.innerHeight / 2}).render().el);
            IronWar.View.prototype.load.apply(this);
        },

        fill: function () {
            IronWar.View.prototype.fill.apply(this);
            this.resources.loaded.track.loop();
            this.$el.empty();
            this.$el.append(
                new ParticlesBackground().render().el,
                this.child.render().el
            );
        },

        setChild: function (child) {
            this.child.remove();
            this.child = child;
            this.$el.append(this.child.render().el);
        }

    });

});