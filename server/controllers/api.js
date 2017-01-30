var _ = require('lodash'),
  Promise = require('bluebird'),

  init,
  http;

init = function init() {
  // do some initialization
}

http = function (apiMethod) {
  return function apiHandler(req, res, next) {
    var object = req.body,
      options = _.extend({}, /*req,file, */req.query, req.params, {
        context: {
          user: ((req.user && req.user.id) || (req.user && req.user.id === 0)) ?
            req.user.id : null
        }
      })

    // If this is a GET, or a DELETE, req.body should be null, so we only have options (route and query params)
    // If this is a PUT, POST, or PATCH, req.body is an object
    if (_.isEmpty(object)) {
      object = options;
      options = {};
    }

    console.log(`###API METHOD ${apiMethod}`);

    // return apiMethod(object, options).tap(function onSuccess(response){
    //     // Do something nessary here

    //     console.log(`###api method response: ${response}`);
    // }).then(function(response) {
    //     // Send different content to client according to "Context-Type"
    //     // Now just send json to client
    //     res.json(response || {});
    // }).catch(function onError(error) {
    //     next(error);
    // });

    return apiMethod(object, options).then(function (response) {
      // Send different content to client according to "Context-Type"
      // Now just send json to client
      res.json(response || {});
    }).catch(function onError(error) {
      next(error);
    });
  };
};

module.exports = {
  init: init,
  http: http
}