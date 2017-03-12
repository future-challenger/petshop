/**
 * Created by Uncle Charlie, 2017/03/01
 */

import oauth2orize from 'oauth2orize';
import User from '../models/user';
import Client from '../models/client';
import Token from '../models/token';
import Code from '../models/code';

// 创建一个OAuth 2.0 server
var server = oauth2orize.createServer();

server.serializeClient(function (client, callback) {
    return callback(null, client._id);
});

server.deserializeClient(function (id, callback) {
    // Client.findOne({_id: id}, function (err, client) {
    //     if (err) {
    //         return callback(err);
    //     }

    //     return callback(null, client);
    // });
    Client.findOne({ _id: id }).exec().then(function (c) {
        callback(null, c);
    }).catch(function (err) {
        callback(err);
    });
});

server.grant(oauth2orize.grant.code(function (client, redirectUri, user, ares, callback) {
    var code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id.toString()
    });

    // code.save(function(err) {
    //     if (err) {
    //         return callback(err);
    //     }

    //     callback(null, code.value);
    // });
    code.save().then(function (co) {
        callback(null, co.value);
    }).catch(function (err) {
        callback(err);
    });
}));

server.exchange(oauth2orize.exchange.code(function (client, code, redirectUri, callback) {
    // Code.findOne({value: code}, function (err, authCode) {
    //     if (err) {return callback(err);}
    //     if (authCode === undefined) {return callback(null, false);}
    //     if (client._id.toString() !== authCode.clientId) {return callback(null, false);}
    //     if (redirectUri !== authCode.redirectUri) {return callback(null, false);}

    //     authCode.remove(function (err) {
    //         if (err) {return callback(err);}

    //         var token = new token({
    //             value: uid(256),
    //             clientId: authCode.clientId,
    //             userId: authCode.userId
    //         });

    //         token.save(function (err) {
    //             if (err) {
    //                 return callback(err);
    //             }

    //             callback(null, token);
    //         });
    //     });
    // });

    Code.findOne({ value: code }).then(function (authCode) {
        if (authCode === undefined) { return callback(null, false); }
        if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
        if (redirectUri !== authCode.redirectUri) { return callback(null, false); }

        authCode.remove().then(function () {
            var token = new token({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            });

            token.save().then(function (to) {
                callback(null, to);
            }).catch(function (err) {
                callback(err);
            });
        }).catch(function (err) {
            callback(err);
        });
    }).catch(function (err) {
        callback(err);
    });
}));

function uid(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; i++) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// module.exports.authorization = [
//     server.authorization(function (clientId, redirectUri, callback) {
//         Client.findOne({ id: clientId }, function (err, client) {
//             if (err) { return callback(err); }

//             return callback(null, client, redirectUri);
//         });
//     }),
//     function (req, res) {
//         res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
//     }
// ];

export default {
    decision: [server.decision()],
    token: [
        server.token(),
        server.errorHandler()
    ],
    authorization: [
        server.authorization(function (clientId, redirectUri, callback) {
            Client.findOne({ id: clientId }, function (err, client) {
                if (err) { return callback(err); }

                return callback(null, client, redirectUri);
            });
        }),
        function (req, res) {
            res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
        }
    ]
};