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

        animationLoop: function () {
            var toDelete = [];
            if (this.$el.width() > 0) {
                this.flush();
                if (this.timerId === null) {
                    this.timerId = setInterval(this.addParticle, 100);
                }
                _.each(this.particles, function (particle) {
                    particle.draw();
                    if (particle.x < -this.$el.width() || particle.x > this.$el.width() * 2) {
                        toDelete.push(particle.id);
                    }
                }, this);
                this.particles = _.omit(this.particles, toDelete);
            }
            this.animate();
        },

        addParticle: function () {
            if (_.size(this.particles) < 100) {
                var particle = new Particle({
                    ctx: this.ctx,
                    $canvas: this.$el
                })
                this.particles[particle.id] = particle;
            }
        },

        animate: function () {
            IronWar.utils.requestAnimationFrame(this.animationLoop);
        },

        flush: function () {
            var gradient = this.ctx.createLinearGradient(
                0, 0, 0, this.$el.height()
            );
            gradient.addColorStop(0, '#191126');
            gradient.addColorStop(0.5, 'black');
            gradient.addColorStop(1, 'black');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.$el.width(), this.$el.height());
        },

        render: function () {
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