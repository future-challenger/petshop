
// @TODO: deal woth these parameters
var getAssetUrl = function(path, isAdmin, minify) {
    var result = `admin/public/${path}`;
    console.log(`admin/public/${path}`);
    return result;
};

module.exports = getAssetUrl;
