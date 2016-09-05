var hbs             = require('express-hbs'),
    Promise         = require('bluebird'),
    errors          = require('../errors'),
    utils           = require('./utils'),
    coreHelpers     = {},
    registerHelpers;

if (!utils.isProduction) {
    hbs.handlebars.logger.level = 0;
}

coreHelpers.asset  = require('./asset');
coreHelpers.author  = require('./author');
// coreHelpers.body_class  = require('./body_class');
// coreHelpers.content  = require('./content');
// coreHelpers.date  = require('./date');
coreHelpers.encode  = require('./encode');
// coreHelpers.excerpt  = require('./excerpt');
// coreHelpers.facebook_url = require('./facebook_url');
coreHelpers.foreach = require('./foreach');
// coreHelpers.get = require('./get');
// coreHelpers.ghost_foot = require('./ghost_foot');
// coreHelpers.ghost_head = require('./ghost_head');
coreHelpers.image = require('./image');
coreHelpers.is = require('./is');
coreHelpers.has = require('./has');
// coreHelpers.meta_description = require('./meta_description');
coreHelpers.meta_title = require('./meta_title');
coreHelpers.navigation = require('./navigation');
coreHelpers.pagination = require('./pagination');
coreHelpers.plural = require('./plural');
coreHelpers.post_class = require('./post_class');
// coreHelpers.prev_post = require('./prev_next');
// coreHelpers.next_post = require('./prev_next');
coreHelpers.tags = require('./tags');
coreHelpers.title = require('./title');
// coreHelpers.twitter_url = require('./twitter_url');
// coreHelpers.url = require('./url');

// Specialist helpers for certain templates
coreHelpers.input_password = require('./input_password');
coreHelpers.input_email = require('./input_email');
// coreHelpers.page_url = require('./page_url');
// coreHelpers.pageUrl = require('./page_url').deprecated;

coreHelpers.helperMissing = function (arg) {
    if (arguments.length === 2) {
        return undefined;
    }
    errors.logError(i18n.t('warnings.helpers.index.missingHelper', {arg: arg}));
};

// Register an async handlebars helper for a given handlebars instance
function registerAsyncHelper(hbs, name, fn) {
    hbs.registerAsyncHelper(name, function (context, options, cb) {
        // Handle the case where we only get context and cb
        if (!cb) {
            cb = options;
            options = undefined;
        }

        // Wrap the function passed in with a when.resolve so it can return either a promise or a value
        Promise.resolve(fn.call(this, context, options)).then(function (result) {
            cb(result);
        }).catch(function (err) {
            errors.logAndThrowError(err, 'registerAsyncThemeHelper: ' + name);
        });
    });
}

// Register a handlebars helper for themes
function registerThemeHelper(name, fn) {
    hbs.registerHelper(name, fn);
}

// Register a handlebars helper for themes and admin
function registerAllHelper(name, fn) {
    hbs.registerHelper(name, fn);
    registerAdminHelper(name, fn);
}

// Register an async handlebars helper for themes
function registerAsyncThemeHelper(name, fn) {
    registerAsyncHelper(hbs, name, fn);
}

// Register a handlebars helper for admin
function registerAdminHelper(name, fn) {
    coreHelpers.adminHbs.registerHelper(name, fn);
}

registerHelpers = function (adminHbs) {
    console.log('hbs register helpers');
    // Expose hbs instance for admin
    coreHelpers.adminHbs = adminHbs;

    // Register theme helpers
    registerAllHelper('asset', coreHelpers.asset);
    // registerThemeHelper('author', coreHelpers.author);
    // registerThemeHelper('body_class', coreHelpers.body_class);
    // registerThemeHelper('content', coreHelpers.content);
    // registerThemeHelper('date', coreHelpers.date);
    registerAllHelper('encode', coreHelpers.encode);
    // registerThemeHelper('excerpt', coreHelpers.excerpt);
    registerAllHelper('foreach', coreHelpers.foreach);
    registerAllHelper('has', coreHelpers.has);
    registerAllHelper('is', coreHelpers.is);
    registerAllHelper('image', coreHelpers.image);
    registerAllHelper('input_email', coreHelpers.input_email);
    registerAllHelper('input_password', coreHelpers.input_password);
    // registerThemeHelper('meta_description', coreHelpers.meta_description);
    registerAllHelper('meta_title', coreHelpers.meta_title);
    registerAllHelper('navigation', coreHelpers.navigation);
    registerAllHelper('page_url', coreHelpers.page_url);
    registerAllHelper('pageUrl', coreHelpers.pageUrl);
    registerAllHelper('pagination', coreHelpers.pagination);
    registerAllHelper('plural', coreHelpers.plural);
    registerAllHelper('post_class', coreHelpers.post_class);
    registerAllHelper('tags', coreHelpers.tags);
    registerAllHelper('title', coreHelpers.title);
    // registerThemeHelper('twitter_url', coreHelpers.twitter_url);
    // registerThemeHelper('facebook_url', coreHelpers.facebook_url);
    // registerThemeHelper('url', coreHelpers.url);

    // Async theme helpers
    // registerAsyncThemeHelper('ghost_foot', coreHelpers.ghost_foot);
    // registerAsyncThemeHelper('ghost_head', coreHelpers.ghost_head);
    // registerAsyncThemeHelper('next_post', coreHelpers.next_post);
    // registerAsyncThemeHelper('prev_post', coreHelpers.prev_post);
    // registerAsyncThemeHelper('get', coreHelpers.get);

    // Register admin helpers
    registerAdminHelper('asset', coreHelpers.asset);
    registerAdminHelper('input_password', coreHelpers.input_password);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
module.exports.registerThemeHelper = registerThemeHelper;
module.exports.registerAsyncThemeHelper = registerAsyncThemeHelper;
