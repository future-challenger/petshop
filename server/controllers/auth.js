var Promise = require('bluebird'),
  passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy,
  BearerStrategy = require('passport-http-bearer').Strategy,
  // ClientPasswordStrategy = require('passport-oauth2-client-password').

  dataProvider = require('../models');
// Client = require('../models/client'),
// Token = require('../models/token');

passport.use(new BasicStrategy(
  function (username, password, done) {
    console.log('basic authentication')
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

    // var user = Promise.promisifyAll(User);
    // user.findOneAsync({ username: username }).then(function (u) {
    //     if (!u) {
    //         return done(null, false);
    //     }

    //     console.log('user is ' + u);

    //     var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
    //     verifyPasswordAsync(password).then(function (match) {
    //         console.log('password match ' + match);
    //         if (!match) {
    //             console.log('is match ' + match);
    //             return done(null, false);
    //         }
    //         return done(null, u);
    //     });
    // }).catch(function (err) {
    //     return done(err);
    // });

    dataProvider.User.findOne({ username: username }).exec().then((u) => {
      if (!u) {
        done(null, false);
        return;
      }
      var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
      verifyPasswordAsync(password).then((match) => {
        console.log('password match ' + match);
        if (!match) {
          console.log('is match ' + match);
          done(null, false);
        } else {
          done(null, u);
        }
      });
    }).catch((err) => {
      console.log(`###AUTH ERROR:- ${err}`);
      done(err);
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  (username, password, done) => {
    // Client.findOne({id: username}, function(err, client) {
    //     if (err) {
    //         return done(err);
    //     }

    //     if (!client || client.secret !== password) {
    //         return done(null, false);
    //     }

    //     return done(null, client);
    // });

    // var client = Promise.promisifyAll(Client);
    // client.findOneAsync({ id: username }).then(function (client) {
    //     if (!client || client.secret !== password) {
    //         return done(null, false);
    //     }
    //     return done(null, client);
    // }).catch(function (err) {
    //     return done(err);
    // });

    dataProvider.Client.findOne({ id: username }).exec().then((c) => {
      if (!c || c.secret !== password) {
        done(null, false);
      } else {
        done(null, c);
      }
    }).catch((err) => {
      done(err);
    });
  }
));

// passport.use(new ClientPasswordStrategy(
//     function(clientId, clientSecret, done) {
//         Client.findOne({id: username}).exec().then(function(c) {
//             if (!c || c.secret !== password) {
//                 done(null, false);
//             } else {
//                 done(null, c);
//             }
//         }).catch(function(err){
//             done(err);
//         });
//     }
// ));

passport.use(new BearerStrategy(
  (accessToken, done) => {
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

    console.log('bearer auth');
    var token = Promise.promisifyAll(dataProvider.Token);
    var user = Promise.promisifyAll(User);
    token.findOneAsync({ value: accessToken }).then((t) => {
      if (!t) {
        return done(null, false);
      }
      user.findOneAsync({ _id: t.userId }).then((u) => {
        if (!u) {
          return done(null, false);
        }
        return done(null, user, { scope: '*' });
      }).catch((err) => {
        return done(err);
      });
    }).catch((err) => {
      return done(err);
    });
  }
));

// module.exports.isAuthenticated = passport.authenticate('basic', {session: false});
module.exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
module.exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
module.exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });