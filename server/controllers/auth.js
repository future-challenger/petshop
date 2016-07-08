var Promise             = require('bluebird'),
    passport            = require('passport'),
    BasicStrategy       = require('passport-http').BasicStrategy,
    BearerStrategy      = require('passport-http-bearer').Strategy,
    
    User                = require('../models/user'),
    Client              = require('../models/client'),
    Token               = require('../models/token');

passport.use(new BasicStrategy(
    function(username, password, done) {
        // User.findOne({username: username}, function(err, user) {
        //     if (err) {
        //         return done(err);
        //     }

        //     // 用户不存在
        //     if (!user) {
        //         return done(null, false);
        //     }

        //     // 检查用户的密码
        //     user.verifyPassword(password, function(err, match) {
        //         // 密码不匹配
        //         if (!match) {
        //             return done(null, false);
        //         }

        //         // 成功
        //         return done(null, user);
        //     });
        // });

        var user = Promise.promisifyAll(User);
        user.findOneAsync({username: username}).then(function(user) {
            if (!user) {
                return done(null, false);
            }
            user.verifyPassword(password).then(function(match) {
                if (!match) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }).catch(function(err) {
            return done(err);
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    function(username, password, done) {
        // Client.findOne({id: username}, function(err, client) {
        //     if (err) {
        //         return done(err);
        //     }

        //     if (!client || client.secret !== password) {
        //         return done(null, false);
        //     }

        //     return done(null, client);
        // });
        var client = Promise.promisifyAll(Client);
        client.findOneAsync({id: username}).then(function(client) {
            if (!client || client.secret !== password) {
                return done(null, false);
            }
            return done(null, client);
        }).catch(function(err) {
            return done(err);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, done) {
        // Token.findOne({value: accessToken}, function (err, token) {
        //     if (err) {
        //         return done(err);
        //     }

        //     if (!token) {
        //         return done(null, false);
        //     }

        //     User.findOne({_id: token.userId}, function (err, user) {
        //         if (err) {
        //             return done(err);
        //         }

        //         if (!user) {
        //             return done(null, false);
        //         }

        //         done(null, user, {scope: '*'});
        //     });
        // });

        var token = Promise.promisifyAll(Token);
        var user = Promise.promisifyAll(User);
        token.findOneAsync({value: accessToken}).then(function(t) {
            if (!t) {
                return done(null, false);
            }
            user.findOneAsync({_id: t.userId}).then(function(u) {
                if (!u) {
                    return done(null, false);
                }
                return done(null, user, {scope: '*'});
            });
        }).catch(function(err) {
            return done(err);
        });
    }
));

// module.exports.isAuthenticated = passport.authenticate('basic', {session: false});
module.exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], {session: false});
module.exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});
module.exports.isBearerAuthenticated = passport.authenticate('bearer', {session: false});