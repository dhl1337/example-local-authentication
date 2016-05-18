/**
 * Created by danle on 5/16/16.
 */
var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/UserModel');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({'local.email' : email}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, false, console.log('email been taken.'));
                    if (!req.user) {
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    } else {
                        var user = req.user;

                        user.local.email = email;
                        user.local.password = user.generateHash(password);

                        // save our user to the database
                        user.save(function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                })
            })
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done){
            process.nextTick(function() {
                User.findOne({'local.email' : email}, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, console.log('no user found.'));
                    if (!user.validPassword(password))
                        return done(null, false, console.log('bad password.'));
                    return done(null, user);
                })
            })
        }));
};
