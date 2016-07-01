var oauth2orize     = require('oauth2orize'),
    User            = require('../models/user'),
    Client          = require('../models/client'),
    Token           = require('../models/token'),
    Code            = require('../models/code');

// 创建一个OAuth 2.0 server
var server = oauth2orize.createServer();

server.serializeClient(function(client, callback) {
    return callback(null, client._id);
});

server.deserializeClient(function(id, callback) {
    Client.findOne({_id: id}, function (err, client) {
        if (err) {
            return callback(err);
        }

        return callback(null, client);
    });
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user,ares, callback) {
    var code = new Code({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        useId: user._id
    });

    code.save(function(err) {
        if (err) {
            return callback(err);
        }

        callback(null, code.value);
    });
}));

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    Code.findOne({value: code}, function (err, authCode) {
        if (err) {return callback(err);}
        if (authCode === undefined) {return callback(null, false);}
        if (client._id.toString() !== authCode.clientId) {return callback(null, false);}
        if (redirectUri !== authCode.redirectUri) {return callback(null, false);}

        authCode.remove(function (err) {
            if (err) {return callback(err);}

            var token = new token({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            });

            token.save(function (err) {
                if (err) {
                    return callback(err);
                }

                callback(null, token);
            });
        });
    });
}));

function uid(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; i++){
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.authorization = [
    server.authorization(function(clientId, redirectUri, callback) {
        Client.findOne({id: clientId}, function(err, client) {
            if (err) {return callback(err);}

            return callback(null, client, redirectUri);
        });
    }),
    function(req, res) {
        res.render('dialog', {transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client});
    }
];

module.exports.decision = [server.decision()];

module.exports.token = [
    server.token(),
    server.errorHandler()
];