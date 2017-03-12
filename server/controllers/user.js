/**
 * Created by Uncle Charlie, 2017/03/01
 */

import dataProvider from '../models';

var postUsers = (req, res) => {
  var user = new dataProvider.User({
    username: req.body.data.username,
    password: req.body.data.password
  });

  // user.save(function (err) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: user});
  // });

  user.save().then((u) => {
    res.json({ message: 'done', data: u });
  }).catch((err) => {
    res.json({ message: 'error', data: err });
  });
};

var getUsers = (req, res) => {
  // User.find(function (err, users) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: users});
  // });

  User.find({}).exec().then(function (users) {
    res.json({ message: 'done', data: users });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

export default {
  postUsers: postUsers,
  getUsers: getUsers
};