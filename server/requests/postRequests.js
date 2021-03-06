var requestReducer = require('../requestReducer')
var FILE_NAME = 'requests.json'
var helper = require('../helper/constants');
var Requests = require('../cache/Requests');

var dispatch = function (action, response) {
    const requestUpdated = requestReducer(Requests.getCachedRequests(), action);
    helper.saveFile(FILE_NAME, JSON.stringify(requestUpdated), (err) => {
        if (!err) {
            Requests.setCachedRequests(requestUpdated)
            helper.returnJson(response, JSON.stringify(action))
        }else{
            helper.returnError(response, 404, 'Error in writing the JSON to file')
        }
    })
};
module.exports = {
    dispatch: dispatch,
};
