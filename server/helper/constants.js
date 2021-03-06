fs = require('fs');


var returnFile = function (res, filename) {
    fs.readFile(filename, function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
    })
}

var getTestCase = function (filename, resolve) {
    fs.readFile(filename, function (err, data) {
        resolve(data);
    })
}


var returnJson = function (res, json) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.write(json);
    res.end();
}

var returnError = function (response, code, message) {
    response.writeHead(code, {"Content-Type": "text/plain"});
    response.write(message);
    response.end();
}

var saveFile = function (fileName, json, callback) {
    var jsonObject = {status: 'true', name: 'gajendra'}
    fs.writeFile(fileName,  json, 'utf8', function(err) {
        callback && callback(err)
    });
}

var queryobject = function myFunction(request) {
    var urlParts = url.parse(request.url, true);
    return urlParts.query;
    // return a ? a.split('&').reduce(function getqueryobject(data, query) {
    //     if(query){
    //         var c = query.split('=');
    //         data[c[0]] = c[1];
    //     }
    //     return data;
    // }, {}) : {};
}

module.exports = {
    returnFile: returnFile,
    returnJson: returnJson,
    returnError: returnError,
    queryobject: queryobject,
    getTestCase: getTestCase,
    saveFile: saveFile,
};
