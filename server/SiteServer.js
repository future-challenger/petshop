var Promise = require('bluebird'),
  config = require('./config'); // @TODO read configuration

var port = process.env.PORT || '3090';
var host = 'localhost';

function SiteServer(rootApp) {
  this.rootApp = rootApp;
  this.httpServer = null;
}

SiteServer.prototype.start = function (externalApp) {
  var self = this,
    rootApp = externalApp ? externalApp : self.rootApp;

  return new Promise(function (resolve) {
    // start server here
    self.httpServer = rootApp.listen(
      port
      , host // port and host are all going to read from config file.
      , function () {
        console.log(`server is running at http://${host}:${port}`);
      }
    );

    // set events
    // When ERROR
    // TODO: log those errors
    self.httpServer.on('error', function (error) {
      console.log(`###ERROR: - ${error}`);
      process.exit(-1);
    });

    self.httpServer.on('connection', function () {
      console.log(`###CONN: - []`);
    });

    self.httpServer.on('listening', function () {
      console.log(`###LISTENING: - Server start`);
      resolve(self);
    });
  });
};

SiteServer.prototype.stop = function () {
  var self = this;

  return new Promise(function (resolve) {
    if (self.httpServer == null) {
      resolve(self);
    } else {
      self.httpServer.close(function () {
        self.httpServer = null;
        resolve(self);
      });
    }
  });
};

SiteServer.prototype.restart = function () {
  return this.stop().then(this.start.bind(this));
};

module.exports = SiteServer;