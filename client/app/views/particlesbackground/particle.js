/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery');


    IronWar.View.Particle = IronWar.Object.extend({

        maxVelocity: 0.3,
        minVelocity: 0.1,
        maxSize: 20,
        minSize: 2,
        gravity: 0.001,

        image: $('<img />').attr('src', '/assets/images/particle.png').get(0),

        initialize: function (options) {
            this.ctx = options.ctx;
            this.$canvas = options.$canvas;
            this.wind = options.wind;
            this.direction = Math.random() * 2 < 1 ? -1 : 1;
            this.id = IronWar.utils.uuid();
            this.gradientWidth = Math.random() * this.$canvas.width() / 2;
            this.velocity = {
                x: this.direction * (Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity),
                y: (Math.random() * 2 < 1 ? -1 : 1) * Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity
            };
            this.x = (this.$canvas.width() / 2) - (this.direction * this.$canvas.width() / 2);
            this.y = Math.random() * this.$canvas.height();
            this.size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
            this.lastDrawTime = Date.now();
        },

        draw: function () {
            var velocity = {
                    x: this.velocity.x + this.wind.x,
                    y: this.velocity.y + this.wind.y
                },
                currentTime = Date.now();
            this.x += (currentTime - this.lastDrawTime) * velocity.x;
            this.y += (currentTime - this.lastDrawTime) * velocity.y;
            this.lastDrawTime = currentTime;
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
            this.velocity.y += this.gravity;
        }

    });

    return IronWar.View.Particle;

});