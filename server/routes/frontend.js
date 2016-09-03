var express = require('express'),
    frontendRoutes;

frontendRoutes = function() {
    var router = express.Router();

    router.route(/^\/(logout|signout)\/$/).get((req, res) => {
        res.render('logout');
    });

    router.route(/^\/signup\/$/).get((req, res) => {
        res.render('signup');
    });

    // // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    // router.get(/^\/((shop-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function redirectToAdmin(req, res) {
    //     utils.redirect301(res, subdir + '/petshop/');
    // });

    // router.get('/' + routeKeywords.preview + '/:uuid', frontend.preview);

    // // Channels
    // router.use(channels.router());

    // // Default
    // router.get('*', frontend.single);

    //@WARNNING: just for test
    router.route('/')
        .get((req, res) => {
            res.render('index', {title: 'Admin'});
        });
    router.route('/login')

    return router;
};

module.exports = frontendRoutes;
