function listAllKeyValues(obj) {
    // for (key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         console.log(`key is ${key} value is ${obj[key]}`);
    //     }
    // }
    console.log(obj);
    Object.keys(obj).map(function(key) {
        console.log(`key is ${key} -- value is ${obj[key]}`);
    });
}

module.exports.listAllKeyValues = listAllKeyValues;