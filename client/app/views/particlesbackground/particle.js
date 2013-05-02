/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var IronWar = require('core/namespace'),
        $ = require('jquery');


    IronWar.View.Particle = IronWar.Object.extend({

        maxVelocity: 0.2,
        minVelocity: 0.05,
        maxSize: 20,
        minSize: 2,
        image: $('<img />').attr('src', '/assets/images/particle.png').get(0),

        initialize: function (options) {
            this.ctx = options.ctx;
            this.$canvas = options.$canvas;
            this.direction = Math.random() * 2 < 1 ? -1 : 1;
            this.id = IronWar.utils.uuid();
            this.velocity = Math.random() * (this.maxVelocity - this.minVelocity) + this.minVelocity;
            this.x = (this.$canvas.width() / 2) - (this.direction * this.$canvas.width() / 2);
            this.y = Math.random() * this.$canvas.height();
            this.size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
            this.lastDrawTime = Date.now();
        },

        draw: function () {
            var currentTime = Date.now(),
                gradient;
            this.x += this.direction * (currentTime - this.lastDrawTime) * this.velocity;
            this.lastDrawTime = currentTime;
            gradient = this.ctx.createLinearGradient(0, 0, this.$canvas.width() / 2, 0);
            if (this.direction === -1) {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
                gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(
                    this.x + this.size / 2,
                    this.y + this.size / 2,
                    this.$canvas.width() / 2,
                    1
                );
            } else {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
                gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(
                    this.x + this.size / 2 - this.$canvas.width() / 2,
                    this.y + this.size / 2,
                    this.$canvas.width() / 2,
                    1
                );
            }
            this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }

    });

    return IronWar.View.Particle;

});