var _       = require('lodash'),
    Promise = require('bluebird'),

    http;

http = function(apiMethod) {
    return function(req, res, next) {
        var object = req.body,
            options = _.extend({}, req,file, req.query, req.params, {
                context: {
                    user: ((req.user && req.user.id) || (req.user && req.user.id === 0)) ? 
                        req.user.id : null
                }
            })

        if (_.isEmpty(object)) {
            object = options;
            options = {};
        }

        return apiMethod(object, options).tap(function onSuccess(){
            // Do something nessary here
        }).then(function(response) {
            // Send different content to client according to "Context-Type"
            // Now just send json to client
            res.json(response || {});
        }).catch(function onError(error) {
            next(error);
        });
    };
};