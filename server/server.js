// 引入我们需要的包express
var express             = require('express'),
    mongoose            = require('mongoose'),
    // bodyParser          = require('body-parser'),
    // passport            = require('passport'),
    // ejs                 = require('ejs'),
    // session             = require('express-session'),
    setupMiddleware     = require('./middleware'),
    routes              = require('./controllers');

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
mongoose.connect('mongodb://localhost:27017/petshot');

// server运行的端口号
var port = process.env.PORT || '3090';

// // 测试一下多个方法处理http请求
// function foo(req, res, next) {
//     console.log("第一个来了" + arguments);
//     if (req.query['next'] == 1) {
//         next();
//     } else {
//         res.send('no next');
//     }
// }

// function boo(req, res) {
//     res.send('yo');
// }

// 给路由设定根路径为/api
// TODO: this api fucntion's parameter is empty
// app.use(routes.apiBaseUri, routes.api({}));

setupMiddleware(app);

// 运行server，并监听指定的端口
var httpServer = app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});