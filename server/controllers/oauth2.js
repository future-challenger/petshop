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
