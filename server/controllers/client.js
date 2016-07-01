var Client = require('../models/client');

var postClients = function(req, res) {
    var client = new Client();

    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;

    client.save(function(err) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: client});
    });

};

var getClients = function(req, res) {
    Client.find({userId: req.user._id}, function(err, clients) {
        if (err) {
            res.json({messag: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: clients});
    });
};

module.exports = {
        postClients: postClients,
        getClients: getClients
    };