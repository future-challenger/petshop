# Petshop

This is a simple NodeJs server based Express. Database is MongoDB. The package that connect server and db is mongoose.

The main purpose is to do OAuth2 in server side. It based on `oauth2orize` and `passport`.

Nearly all database access code is `Promisify`-ed by `bluebird`. like:
```javascript
    User.findOne({ username: username }).exec().then(function (u) {
        if (!u) {
            done(null, false);
            return;
        }
        var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
        verifyPasswordAsync(password).then(function (match) {
            console.log('password match ' + match);
            if (!match) {
                console.log('is match ' + match);
                done(null, false);
            } else {
                done(null, u);
            }
        });
    }).catch(function (err) {
        done(err);
    });
```
but first all `Model`s are used a base `mongoose`:
```javascript
var mongoose = require('mongoose'),
    Promise = require('bluebird');
    
mongoose.Promise = Promise;

module.exports = mongoose;
```
Use this "mongoose" to implement `Models`:
```javascript
var mongoose    = require('./base'),
    bcrypt      = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});

userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            return callback(err);
        }

        callback(null, match);
    });
};

module.exports = mongoose.model('User', userSchema);
```

But the method `verifyPassword` is not promisified. But when use it later, you can use `bluebird` to promisify it like this:
```javascript
var verifyPasswordAsync = Promise.promisify(u.verifyPassword, { context: u });
```
**Do remember to set context**, or it may not work.

##Mongoose, add instance methods or static methods to model
to add an instance method, just use the `Schema.methods.methodName = function(){}` or `Schema.method{'methodName', fn}`. eg:
```javascript
// eg 1
var schema = kittySchema = new Schema(..);

schema.method('meow', function () {
  console.log('meeeeeoooooooooooow');
})

var Kitty = mongoose.model('Kitty', schema);

var fizz = new Kitty;
fizz.meow(); // meeeeeooooooooooooow

// eg 2
var schema = kittySchema = new Schema(..);
...
schema.methods.meow = function () {
  console.log('meeeeeoooooooooooow');
})
...
```
static methods to model. 
```javascript
petSchema.static('anotherFindOne', function(options, callback) {
    var conditions = options || {};
    return this.findOne(conditions, callback);
});

Pet.anotherFindOne({'_id': req.params.pet_id}).exec().then(function(pet) {
        res.json({message: 'done', data: pet});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
```
You would notice that even the customized static method can be used in the promisified way.

## extend mongoose.Schema
You can refer to the mongoose doc [here](http://mongoosejs.com/docs/api.html#model_Model.discriminator)
But the doc is not enough. When i have a `BaseSchema` i would like to use it everywhere like how i use `Schema`. So i define it in the existing *base* doc *index.js* file, then exports it.
```javascript
var mongoose = require('mongoose'),
    util     = require('util');
    Promise  = require('bluebird');
    
mongoose.Promise = Promise;

var Schema = mongoose.Schema;

function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        createdBy: { type: String, default: 'admin'},
        createdAt: { type: Date, required: true, default: Date.now() },
        updatedBy: { type: String, default: 'admin'},
        updatedAt: { type: Date, required: true, default: Date.now() }
    });
}

util.inherits(BaseSchema, Schema);

module.exports = mongoose;
module.exports.BaseSchema = BaseSchema;
```
In this extended `BaseSchema`, there are four fields added. All models defined by this Schema will automatically has these four fields.

Then use it like this:
```javascript
var mongoose    = require('./base');

var Schema = mongoose.BaseSchema;

var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number
});
```
Pet model will have thoese added fields:
```javascript
var petModel = mongoose.model('pet', petSchema);
```
Use post add a pet model in mongodb, then
```
db.pets.find().pretty()
```
output will be:
```
{
	"_id" : ObjectId("578f6130b107a82173533c76"),
	"quantity" : 12345,
	"type" : "1",
	"name" : "YoYo123456",
	"updatedAt" : ISODate("2016-07-20T11:31:54.011Z"),
	"updatedBy" : "admin",
	"createdAt" : ISODate("2016-07-20T11:31:54.011Z"),
	"createdBy" : "admin",
	"__v" : 0
}
```

## MongoDB aggregate? 
It's a good news that lots of new stuff added in MongoDB 3.2, expecially the "left outer join" one. Use `$lookup` you can do this in MongoDB. 
### Sub-doc
When I try to find something related to this stuff in Mongoose i find **sub-doc** first. It's interesting to use this, let's give it a shot.
As we have pets now and we shall pets' accessories too. So we add a accessory schema in *models/accessory.js* file.
```javascript
var mongoose = require('./base');

var Schema = mongoose.BaseSchema;

var AccessorySchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = {
    schema: AccessorySchema,
    model: mongoose.model('accessories', AccessorySchema)
};
```  
`module.exports` exported an object with two fileds `schema` and `model`. This is because besides the schema we may want to use the model.

Now go to *models/pet.js* file. 
require accessory stuff:
```javascript
var Accessory = require('./accessory');

var AccessorySchema = Accessory.schema;
var AccessoryModel = Accessory.model;
```

Use AccessorySchema in pet schema:
```javascript
var petSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    quantity: Number,
    accessories: [AccessorySchema]
});
```
`accessories` is the *sub-doc*. Well, let's add one pet with accessories in the static method `saveOne`:
```javascript
petSchema.static('saveOne', function(options, callback) {
    var pet = new this();
    pet.name = options.name;
    pet.type = options.type;
    pet.quantity = options.quantity;

    // To add accessory, here's what need to do.
    var accessory = new AccessoryModel();
    accessory.name = options.accName;
    accessory.price = options.accPrice;

    pet.accessories.push(accessory);

    return pet.save(callback);
});
```
**NOTE:**
    You can just leave the Accessory model alone. Just use this {name: 'some name', price: 'some price'} to push in the accessories field in pet model, it also works.

Create an accessory model instance and *push* it in the pet's accessories array. And save it. After one pet with accessories saved, you may find a doc in MongoDB. It looks like this:
```
{
	"_id" : ObjectId("5790c505797c1e070d2b9b37"),
	"quantity" : 12345,
	"type" : "1",
	"name" : "SP3",
	"updatedAt" : ISODate("2016-07-21T12:50:02.706Z"),
	"updatedBy" : "admin",
	"createdAt" : ISODate("2016-07-21T12:50:02.706Z"),
	"createdBy" : "admin",
	"accessories" : [
		{
			"_id" : ObjectId("5790c505797c1e070d2b9b38"),
			"name" : "Some Acc",
			"price" : 123,
			"updatedAt" : ISODate("2016-07-21T12:50:02.698Z"),
			"updatedBy" : "admin",
			"createdAt" : ISODate("2016-07-21T12:50:02.698Z"),
			"createdBy" : "admin"
		}
	],
	"__v" : 0
}
```
The accessory model is actually a part of the pet json. It has nothing to do with the **let join** thing.

###$lookup
Now let's find out how to do the "left outer join" `$lookup` aggregate by adding a static method in *models/pets.js* file.
```javascript
petSchema.static('findFull', function(options, callback) {
    console.log('###find full method');
}
```
use mongoose aggregate api in it:
```javascript
petSchema.static('findFull', function(options, callback) {
    console.log('###find full method');
    var un = options.username;
    return this.aggregate()/*.match({username: un})*/ // find all pets whose username field can left join users'.
        .lookup({
            from: 'users',
            localField: 'username',
            foreignField: 'username',
            as: 'users_doc'
        });
}
```
Then for test if it works, add a http request handler and related code in *controller*. Run it, you'll find results like this:
```
...

    {
      "_id": "5790c505797c1e070d2b9b37",
      "quantity": 12345,
      "type": "1",
      "name": "SP3",
      "updatedAt": "2016-07-21T12:50:02.706Z",
      "updatedBy": "admin",
      "createdAt": "2016-07-21T12:50:02.706Z",
      "createdBy": "admin",
      "accessories": [
        {
          "_id": "5790c505797c1e070d2b9b38",
          "name": "Some Acc",
          "price": 123,
          "updatedAt": "2016-07-21T12:50:02.698Z",
          "updatedBy": "admin",
          "createdAt": "2016-07-21T12:50:02.698Z",
          "createdBy": "admin"
        }
      ],
      "__v": 0,
      "users_doc": []
    },
    {
      "_id": "5790f0acbfe8010e17625b1c",
      "username": "jack",
      "quantity": 12345,
      "type": "1",
      "name": "SP4",
      "updatedAt": "2016-07-21T15:56:24.462Z",
      "updatedBy": "admin",
      "createdAt": "2016-07-21T15:56:24.462Z",
      "createdBy": "admin",
      "accessories": [
        {
          "_id": "5790f0acbfe8010e17625b1d",
          "name": "Some Acc",
          "price": 123,
          "updatedAt": "2016-07-21T15:56:24.454Z",
          "updatedBy": "admin",
          "createdAt": "2016-07-21T15:56:24.454Z",
          "createdBy": "admin"
        }
      ],
      "__v": 0,
      "users_doc": [
        {
          "_id": "5775c580f84a06e9fc025669",
          "username": "jack",
          "password": "$2a$05$gEdQimZ/FW8d7fILYpinKOIc3yVF0HV/rtVl/ptzVErUU82.UkFpa",
          "__v": 0
        }
      ]
    }

...
```
You can also find how to use mongoose aggregate api. It's almost the same.

But there's a problem, if i do the lookup thing like code below it does not work.
```javascript
    return this.aggregate({
        $lookup: {
            from: 'users',
            localField: 'username',
            foreignField: 'username',
            as: 'users_doc'
        }
    }, callback);
```

##Let's Ghostify this site
Petshop server is now in typical `MVC` pattern. But it is now well refined. Ghost is one of the best sites based on `Express`, so let's see what we can do with it.
### What now Petshop look like
It's `MVC` text book. Models are all in *models* folder, Controllers are all in *controllers* folder. There's no view, because this is a API server.

Then all stuff are all put together in *server.js* file to get every thing works. Although there's not much "requirement" to deal with, *server.js* already included lots of code in it.

### Ghostify petshop
First, let's move the **routes** thing from *server.js* to *server/controllers/index.js* file. Of course first to create this file.
Second, create `express.Router()` in the just created *controllers/index.js* file and return it in a function, which will exported out.

```
express.Router() object is used to get all paths and related handler combined. Then use it in an Express app. No matter we put "router" the jobs it will do is combine routes and related handler, and it will be used in an Express app.
```

```javascript
var express             = require('express'),

    petController       = require('./controllers/pet'),
    
    ...

    apiRoutes;

apiRoutes = function(middleware) {
    var router = express.Router();

    router.route('/pets')
        .post(authController.isAuthenticated, petController.postPets)
        .get(authController.isAuthenticated, petController.getPets);

    router.route('/pets/:pet_id')
        .get(authController.isAuthenticated, petController.getPet)
        .put(authController.isAuthenticated, petController.updatePet)
        .delete(authController.isAuthenticated, petController.deletePet);

    router.route('/pets/full/:pet_id')
        .get(authController.isAuthenticated, petController.getFullPets);

    ...

    return router;
};

module.exports = {
    apiBaseUri: 'api/v1/',
    api: apiRoutes
};
```
**NOTICE**: the api base url is also exported out.

Refactor *server.js*, accordingly change this file to make it work:
```javascript
// 引入我们需要的包express
var express             = require('express'),

    ...

    routes              = require('./controllers');

// 创建一个express的server
var app = express();

// 连接数据库
mongoose.connect('mongodb://localhost:27017/petshot');

// server运行的端口号
var port = process.env.PORT || '3090';

...

// 给路由设定根路径为/api
// TODO: this api fucntion's parameter is empty
app.use(routes.apiBaseUri, routes.api({}));

// 运行server，并监听指定的端口
var httpServer = app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});
```

Import *controllers*, *index.js* file in that folder is imported automatically, then use `routes` function to return the `router` in it. It's DONE!

### Move middleware away
`Express` has lots of middlewares, middlewares will increase when this app is developing. 

Create a directory *serer/middleware* and *index.js* in it. All middleware setup code will be here.
```javascript
var bodyParser          = require('body-parser'),
    passport            = require('passport'),
    ejs                 = require('ejs'),
    session             = require('express-session'),
    routes              = require('../controllers'),

    setupMiddleware;
    

setupMiddleware = function(apiApp) {

    apiApp.set('view engine', 'ejs');

    apiApp.use(bodyParser.urlencoded({
        extended: true
    }));

    apiApp.use(session({
        secret: 'a4f8071f-4447-c873-8ee2',
        saveUninitialized: true,
        resave: true
    }));

    apiApp.use(routes.apiBaseUri, routes.api({}));
}

module.exports = setupMiddleware;
```
Well, code in *serverl.js* has do be refactored.
```javascript
// 引入我们需要的包express
var express             = require('express'),
    mongoose            = require('mongoose'),
    setupMiddleware     = require('./middleware'),
    routes              = require('./controllers');

// 创建一个express的server
var app = express();

// 连接数据库
mongoose.connect('mongodb://localhost:27017/petshot');

// server运行的端口号
var port = process.env.PORT || '3090';

setupMiddleware(app);

// 运行server，并监听指定的端口
var httpServer = app.listen(port, function () {
    console.log('server is running at http://localhost:3090');
});
```
*server.js* is much more shorter.


### Ghostify -- APIs
Before, all HTTP request handler is in *server/controllers* directory. `Controllers` in this directory all have HTTP request input as `req` and and response `res` object. Actually, these two object has nothing to do with how `Petshop` deal with HTTP request.

Now refactor this code like what `Ghost` did, seperate `req` and `res` objects and code which is used to access MongoDB.

####First
The most basic thing is to refactor code in *server/models* code. Modules in this directory is required individually by other modules like:
```javascript
var User = require('../models/user');
```
Now all modules in this directory will be exported all together. Other modules can require models like:
```javascript
var dataProvider = require('./models');
...
dataProvider.User.find({});
...
```
create a file named *index.js* in *server/models* directory, and all models will be exported like this:
```javascript
var _       = require('lodash'),

    exports,
    models;

exports = module.exports;

models = [
    'accessory',
    'client',
    'code',
    'pet',
    'token',
    'user'
];

function init() {
    exports.Base = require('./base');

    models.forEach(function(name) {
        _.extend(exports, require('./' + name));
    });
}

// exports.init = init;
exports.init = init;
```
When the exported `init` method is called, all models defined in this directory is in the `export` object.

Still, a glance to how models is refactored is needed:
```javascript
// Before
module.exports = mongoose.model('User', userSchema);

// Now 
module.exports = {
    User: mongoose.model('User', userSchema)
};
```
This is why models can be used as `dataProvider.User.xxx()`;

####How we deal with "models"
Models are just mapping to Database "tables" (collections in MongoDB). They have simple method to create, update or delete records (documnts). So business logic can be build on models. The business logic code has is decoupled from HTTP requests and models. This part code can be called `api`.

So we create a *api.js* file in *server/controller* directory. As now business logic are easy, one file is enough. If code keep increasing, a directory is needed. This `api` module is used to wrap all HTTP requests and will be detailed in next section. Now the business logic section can be used to deal with models. And the old models "classes" have to be refactored.
```javascript
// old code
var getPets = function(req, res) {
    dataProvider.Pet.find({}).exec().then(function(pets) {
        res.json({message: 'done', data: pets});
    }).catch(function(err) {
        res.json({message: 'error', data: err});
    });
};
```
As we already put `req` and `res` code away, we can focus on the "business logic" thing.
```javascript
// new code
pets = {
    browse: function(options) {
        function queryModel(options) {
            var conditions = {}; // I'm going to find all pets.
            return dataProvider.Pet.find(conditions);
        }

        return queryModel(options);
    },

    add: function add(object, options) {
        function queryModel(options) {
            return dataProvider.Pet.saveOne(options);
        }
    }
};

// export an object out.
module.exports = pets;
```
`options` is the wrapped `req` and `res` object. You can see methods `browse` and `add` all focused on how to select or add a model with input `options`. And you dont have to care about where exactly options come and what it is.

All these methods return a `Promise` object. These objects will be used in the `api` module.

####What about the req and res objects?
If your API is not just return the most famous words "Hello World!" to clients, you will have to consider HTTP request parameters. These parameters may be in a query string, a posted form or even an uploaded file.