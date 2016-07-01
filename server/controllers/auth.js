var passport            = require('passport'),
    BasicStrategy       = require('passport-http').BasicStrategy,
    User                = require('../models/user'),
    Client              = require('../models/client');

passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }

            // 用户不存在
            if (!user) {
                return done(null, false);
            }

            // 检查用户的密码
            user.verifyPassword(password, function(err, match) {
                // 密码不匹配
                if (!match) {
                    return done(null, false);
                }

                // 成功
                return done(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, done) {
        Client.findOne({id: username}, function(err, client) {
            if (err) {
                return done(err);
            }

            if (!client || client.secret !== password) {
                return done(null, false);
            }

            return done(null, client);
        });
    }
));

module.exports.isAuthenticated = passport.authenticate('basic', {session: false});
module.exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});