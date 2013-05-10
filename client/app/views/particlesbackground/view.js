/*global define,window*/
/*jslint nomen: true*/
"use strict";

define(function (require) {

    var _ = require('underscore'),
        IronWar = require('core/namespace'),
        Particle = require('views/particlesbackground/particle');

    IronWar.View.ParticlesBackground = IronWar.View.extend({

        className: 'particles-background',
        tagName: 'canvas',

        windMaxVelocity: 0.001,
        windMinVelocity: 0.0005,
        windDirection: 1,

        animationLoop: function () {
            var toDelete = [];
            if (this.$el.width() > 0) {
                this.flush();
                if (this.timerId === null) {
                    this.timerId = setInterval(this.addParticle, 100);
                }
                _.each(this.particles, function (particle) {
                    particle.draw();
                    if (particle.x < -this.$el.width() || particle.x > this.$el.width() * 2
                            || particle.y > this.$el.height()) {
                        toDelete.push(particle.id);
                    }
                }, this);
                this.particles = _.omit(this.particles, toDelete);
                this.wind.x += this.windDirection * (
                    Math.random() * (
                        this.windMaxVelocity - this.windMinVelocity
                    ) + this.windMinVelocity
                );
            }
            this.animate();
        },

        addParticle: function () {
            if (_.size(this.particles) < 1000) {
                var particle = new Particle({
                    ctx: this.ctx,
                    $canvas: this.$el,
                    wind: this.wind
                });
                this.particles[particle.id] = particle;
            }
        },

        animate: function () {
            IronWar.utils.requestAnimationFrame(this.animationLoop);
        },

        flush: function () {
            var gradient = this.ctx.createLinearGradient(0, 0, 0, this.$el.height());
            gradient.addColorStop(0, '#191126');
            gradient.addColorStop(0.5, 'black');
            gradient.addColorStop(1, 'black');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.$el.width(), this.$el.height());
        },

        changeWindDirection: function () {
            this.windDirection = this.windDirection === 1 ? -1 : 1;
            this.wind.y = -(Math.random() * (this.windMaxVelocity - this.windMinVelocity) + this.windMinVelocity);
        },

        render: function () {
            this.wind = {x: 0, y: 0};
            setInterval(this.changeWindDirection, 10000);
            this.timerId = null;
            this.$el.attr('width', window.innerWidth);
            this.$el.attr('height', window.innerHeight);
            this.ctx = this.el.getContext('2d');
            this.particles = {};
            this.animate();
            return this;
        }

    });

    return IronWar.View.ParticlesBackground;

});