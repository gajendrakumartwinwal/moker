fs = require('fs');
http = require('http');
url = require('url');
var routesV2 = require('./routes');
var helper = require('./helper/constants');
var Requests = require('./cache/Requests');
var delay = 500;
var FILE_NAME = 'requests.json';

var handleGetRequest = function (request, response) {
    var urlParts = url.parse(request.url, true);
    routesV2.routesGet(urlParts.pathname, response);
}

var handlePostRequest = function (request, response) {
    var urlParts = url.parse(request.url, true);
    var body = ''
    request.on('data', function (data) {
        body += data
    })
    request.on('end', function () {
        routesV2.routesPost(urlParts.pathname, JSON.parse(body), response);
    })
}

var handleRequest = function (request, response) {
    setTimeout(function () {
        if (request.method == 'POST') {
            handlePostRequest(request, response)
        } else {
            handleGetRequest(request, response)
        }
    }, delay)
}
var server = http.createServer(function (request, response) {
    if (Requests.isRequestCached()) {
        handleRequest(request, response);
    } else {
        fs.readFile(FILE_NAME, function (err, data) {
            if (!err) Requests.setCachedRequests(JSON.parse(data));
            handleRequest(request, response);
        })
    }
}).listen(8088);
server.timeout = 5000;
