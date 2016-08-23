var express = require('express'),
    frontendRoutes;

frontendRoutes = function() {
    var router = express.Router();

    router.get(/^\/(logout|signout)\/$/, function redirectToSignout(req, res) {
        utils.redirect301(res, subdir + '/petshop/signout/');
    });
    router.get(/^\/signup\/$/, function redirectToSignup(req, res) {
        utils.redirect301(res, subdir + '/petshop/signup/');
    });

    // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    router.get(/^\/((shop-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function redirectToAdmin(req, res) {
        utils.redirect301(res, subdir + '/petshop/');
    });

    router.get('/' + routeKeywords.preview + '/:uuid', frontend.preview);

    // Channels
    router.use(channels.router());

    // Default
    router.get('*', frontend.single);

    return router;
};

module.exports = frontendRoutes;