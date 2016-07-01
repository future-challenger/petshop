// 引入我们需要的包express
var express             = require('express'),
    mongoose            = require('mongoose'),
    bodyParser          = require('body-parser'),
    passport            = require('passport'),

    petController       = require('./controllers/pet'),
    userController      = require('./controllers/user'),
    authController      = require('./controllers/auth');

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

router.route('/pets')
    .post(petController.postPets)
    .get(petController.getPets);

router.route('/pets/:pet_id')
    .get(petController.getPet)
    .put(petController.updatePet)
    .delete(petController.deletePet);

// path: /users, for users
// router.route('/users')
//     .post(userController.postUsers)
//     .get(authController.isAuthenticated, userController.getUsers);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

// 给路由设定根路径为/api
app.use('/api', router);
// 运行server，并监听指定的端口
app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});