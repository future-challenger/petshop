var bodyParser = require('body-parser'),
  passport = require('passport'),
  // ejs                 = require('ejs'),
  express = require('express'),
  session = require('express-session'),
  apiRoutes = require('../controllers'),
  frontendRoutes = require('../routes/frontend'),

  setupMiddleware;


setupMiddleware = function (apiApp, adminApp) {

  // apiApp.set('view engine', 'ejs');

  apiApp.use(bodyParser.urlencoded({
    extended: true
  }));

  apiApp.use(session({
    secret: 'a4f8071f-4447-c873-8ee2',
    saveUninitialized: true,
    resave: true
  }));

  apiApp.use(apiRoutes.apiBaseUri, apiRoutes.api({}));

  // TODO: add adminApp's middlewares later
  if(!adminApp) {
    console.log('admin app is not ready for config middleware')
    return 
  }

  adminApp.use('/', frontendRoutes());

  apiApp.use('/admin', adminApp);
}

module.exports = setupMiddleware;