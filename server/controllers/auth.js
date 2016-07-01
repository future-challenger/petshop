var passport =          require('passport'),
    BasicStrategy =     require('passport-http').BasicStrategy,
    User =              require('../models/user');

passport.use(new BasicStrategy(
    function(username, passpord, done) {
        User.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }

            // 用户不存在
            if (!user) {
                return done(null, false);
            }

            // 检查用户的密码
            user.verifyPassword(passowrd, function(err, match) {
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

module.exports.isAuthenticated = passport.authenticate('basic', {session: false});