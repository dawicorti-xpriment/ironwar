/*jslint nomen: true*/
"use strict";

var User = require('../models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    auth = {};

auth.init = function (app) {
    passport.serializeUser(auth.serializeUser);
    passport.deserializeUser(auth.deserializeUser);
    passport.use(auth.strategy());
};

auth.serializeUser = function (user, done) {
    done(null, user.id);
};

auth.deserializeUser = function (id, done) {
    User.findById(id).exec(function (err, user) {
        done(err, user);
    });
};

auth.authenticate = function (username, password, done) {
    User.findOne({username: username, password: password}, done);
};

auth.strategy = function () {
    return new LocalStrategy(auth.authenticate);
};

auth.listen = function (app) {
    app.post(
        '/login',
        passport.authenticate('local', {failureRedirect: '/api/users', failureFlash: false}),
        function (req, res) {
            res.redirect('/');
        }
    );
};

auth.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send({
            data: {
                objects: [],
                error: 'User is not authenticated'
            }
        });
    }
};

auth.noAuthRequired = function (req, res, next) {
    next();
};

module.exports = auth;