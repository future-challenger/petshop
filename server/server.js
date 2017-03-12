/**
 * Created by Uncle Charlie, 2017/03/01
 */

import 'babel-polyfill'
// 引入我们需要的包express
import express from 'express';
import  mongoose from 'mongoose';

  // bodyParser          = require('body-parser'),
  // passport            = require('passport'),
  // ejs                 = require('ejs'),
  // session             = require('express-session'),
import  api from './controllers/api';
import  models from './models';
import  setupMiddleware from './middleware';
import  routes from './controllers';

// 创建一个express的server
var app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(session({
//     secret: 'a4f8071f-4447-c873-8ee2',
//     saveUninitialized: true,
//     resave: true
// }));

// 连接数据库
mongoose.connect('mongodb://localhost:27017/petshop');

// server运行的端口号
var port = process.env.PORT || '3090';

// 给路由设定根路径为/api
// TODO: this api fucntion's parameter is empty
// app.use(routes.apiBaseUri, routes.api({}));

// Promise.resolve().then(function () {
//   models.init();
// }).then(function () {
//   api.init();
// }).then(function () {
//   setupMiddleware(app);
// }).catch(function (err) {
//   console.log(`###error ${err}`);
// });

async function configApi() {
  try {
    mongoose.connect('mongodb://localhost:27017/petshop');

    models.init()
    api.init()
    setupMiddleware(app)

    return 'completed'
  } catch (e) {
    console.log(`###error ${err}`)
    throw e
  }
}

configApi().then(val => console.log(`config result: ${val}`))
  .catch(err => console.log(`###error ${err}`))

// 运行server，并监听指定的端口
var httpServer = app.listen(port, function () {
  console.log('server is running at http://localhost:3090');
});