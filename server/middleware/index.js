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