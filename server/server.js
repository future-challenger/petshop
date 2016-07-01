// 引入我们需要的包express
var express             = require('express'),
    mongoose            = require('mongoose'),
    bodyParser          = require('body-parser'),
    passport            = require('passport'),
    ejs                 = require('ejs'),
    session             = require('express-session'),

    petController       = require('./controllers/pet'),
    userController      = require('./controllers/user'),
    authController      = require('./controllers/auth'),
    clientController    = require('./controllers/client'),
    oauth2Controller    = require('./controllers/oauth2');

// 创建一个express的server
var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'a4f8071f-4447-c873-8ee2',
    saveUninitialized: true,
    resave: true
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
    .post(authController.isAuthenticated, petController.postPets)
    .get(authController.isAuthenticated, petController.getPets);

router.route('/pets/:pet_id')
    .get(authController.isAuthenticated, petController.getPet)
    .put(authController.isAuthenticated, petController.updatePet)
    .delete(authController.isAuthenticated, petController.deletePet);

// path: /users, for users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// 处理 /clients
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
    .post(authController.isAuthenticated, oauth2Controller.decision)
    .get(authController.isAuthenticated, oauth2Controller.authorization);

router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

// 给路由设定根路径为/api
app.use('/api', router);
// 运行server，并监听指定的端口
app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});