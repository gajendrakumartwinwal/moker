var helper = require('./../helper/constants');
var Requests = require('./../cache/Requests')

var mappedRequest = function (path, response) {
    const cachedRequests = Requests.getCachedRequests() || []
    console.log('cachedRequests -> '+cachedRequests)
    if (cachedRequests.length === 0) return helper.returnError(response, 404, 'No request added to API Tester, Try again afer adding request to your API Tester',)
    var isReturned = false;
    cachedRequests.forEach(({url, testcases = []}, index) => {
        if (url === path) {
            testcases.forEach((testcase, index) => {
                if (testcase.enable) {
                    helper.returnJson(response, testcase.json)
                    isReturned = true;
                }
            });
            if (!isReturned) {
                const errorMessage = testcases.length ? `All tests are disabled, Try again after enabling one of ${JSON.stringify(testcases.map(test => test.name))} the tests.` : `No test is found in your mapped ${path} request, Try again after adding some tests.`;
                helper.returnError(response, 404, errorMessage);
                isReturned = true;
            }
        }
    });
    if (!isReturned) {
        helper.returnError(response, 404, `${path} is not mapped Yet, Try again after mapping the request`)
        isReturned = true;
    }
};

var loadRequests = function (response) {
    helper.returnJson(response, JSON.stringify(Requests.getCachedRequests()))
}
module.exports = {
    mappedRequest: mappedRequest,
    loadRequests: loadRequests,
};
