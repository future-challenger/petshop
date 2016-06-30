// 引入我们需要的包express
var express = require('express');
var mongoose = require('mongoose');
var Pet = require('./models/pet');
var bodyParser = require('body-parser');
// 创建一个express的server
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

// 连接数据库
mongoose.connect('mongodb://localhost:27017/petshot');

// server运行的端口号
var port = process.env.PORT || '3090';
// 使用express的路由器
var router = express.Router();
// 访问http://localhost:3090/api的时候，
// 返回一个json
router.get('/', function (req, res) {
    res.json({'message': '欢迎来到宠物商店'});
});

var petRouter = router.route('/pets');

petRouter.post(function (req, res) {
    var pet = new Pet();
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.quantity = req.body.quantity;

    pet.save(function (err) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: pet});
    });
});

// 给路由设定根路径为/api
app.use('/api', router);
// 运行server，并监听指定的端口
app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});