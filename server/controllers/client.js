/**
 * Created by Uncle Charlie, 2017/03/01
 */

import dataProvider from '../models/client';

var postClients = function (req, res) {
    var client = new dataProvider.Client();

    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;

    // client.save(function(err) {
    //     if (err) {
    //         res.json({message: 'error', data: err});
    //         return;
    //     }

    //     res.json({message: 'done', data: client});
    // });
    client.save().then(function (c) {
        res.json({ message: 'done', data: c });
    }).catch(function (err) {
        res.json({ message: 'error', data: err });
    });
};

var getClients = function (req, res) {
    // Client.find({userId: req.user._id}, function(err, clients) {
    //     if (err) {
    //         res.json({messag: 'error', data: err});
    //         return;
    //     }

    //     res.json({message: 'done', data: clients});
    // });

    dataProvider.Client.find({ userId: req.user._id }).exec().then(function (clients) {
        res.json({ message: 'done', data: clients });
    }).catch(function (err) {
        res.json({ messag: 'error', data: err });
    });
};

export default {
    postClients: postClients,
    getClients: getClients
};