var postRequests = require('./requests/postRequests');
var getRequests = require('./requests/getRequests');

var routesGet = function (path, response) {
    switch (path) {
        case '/loadRequests':
            getRequests.loadRequests(response)
            break
        default:
            getRequests.mappedRequest(path, response)
    }
};

var routesPost = function (path, action, response) {
    switch (path) {
        case '/dispatchAction':
            postRequests.dispatch(action, response)
            break
    }
}

module.exports = {
    routesGet: routesGet,
    routesPost: routesPost
}
