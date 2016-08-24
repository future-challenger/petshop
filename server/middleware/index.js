var bodyParser          = require('body-parser'),
    passport            = require('passport'),
    // ejs                 = require('ejs'),
    session             = require('express-session'),
    routes              = require('../controllers'),
    frontendRoutes      = require('../routes/frontend'),

    setupMiddleware;
    

setupMiddleware = function(apiApp, adminApp) {

    // apiApp.set('view engine', 'ejs');

    apiApp.use(bodyParser.urlencoded({
        extended: true
    }));

    apiApp.use(session({
        secret: 'a4f8071f-4447-c873-8ee2',
        saveUninitialized: true,
        resave: true
    }));

    apiApp.use(routes.apiBaseUri, routes.api({}));

    // TODO: add adminApp's middlewares later
    adminApp.use('/', frontendRoutes());

    apiApp.use('/admin', adminApp);
}

module.exports = setupMiddleware;