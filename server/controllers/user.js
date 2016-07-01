var User = require('../models/user');

var postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: user});
    });
};

var getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: users});
    });
};

module.exports = {
    postUsers: postUsers,
    getUsers: getUsers
};