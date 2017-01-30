
import 'babel-polyfill'
var Promise = require('bluebird'),
  express = require('express'),
  mongoose = require('mongoose'),
  hbs = require('express-hbs'),

  SiteServer = require('./SiteServer'),
  models = require('./models'),
  api = require('./controllers/api'),
  middleware = require('./middleware'),
  helpers = require('./helpers'),
  errors = require('./errors'),

  init;

init = function init() {
  var apiApp = express(), // API
    adminApp = express();   // Admin site

  // TODO: the first promise should be configuration.
  return Promise.resolve().then(() => {
    // TODO: configure this connection string.
    mongoose.connect('mongodb://localhost:27017/petshop');
  }).then(() => {
    models.init();
  }).then(() => {
    api.init();
  }).then(() => {
    var adminHbs = hbs.create();

    apiApp.set('view engine', 'hbs');

    // Admin app views and statics
    adminApp.set('view engine', 'hbs');
    adminApp.engine('hbs', adminHbs.express4({
      partialsDir: __dirname + '/petshop-admin/views/partials',
      defaultLayout: __dirname + '/petshop-admin/views/layout/default.hbs'
    }));
    adminApp.set('views', __dirname + '/petshop-admin/views');

    // console.log(`ADMIN PUBLIC:- ${__dirname}/petshop-admin/public`)
    adminApp.use('/public', express.static(`${__dirname}/petshop-admin/public`));

    // helpers of handlebars
    // helpers.loadCoreHelpers(adminHbs);
    helpers.loadCoreHelpers(adminHbs);

    middleware(apiApp, adminApp);

    return new SiteServer(apiApp);
  });
};

// module.exports = init;
var parentApp = express();

// TODO: parentApp.use('path', app), path should be moved in configuration file.
init().then((siteServer) => {
  parentApp.use('/', siteServer.rootApp);

  siteServer.start(parentApp);
}).catch((err) => {
  // TODO: log error
  // console.log(`Server start error ${err}`);
  errors.logError(`Server error ${err}`);
});
