var cachedRequestes;

const setCachedRequests = (requests) => {
    this.cachedRequestes = requests;
}
const getCachedRequests = () => {
    return this.cachedRequestes;
}
const isRequestCached = (requests) => {
    this.cachedRequestes = requests;
}

module.exports = {
    isRequestCached: isRequestCached,
    getCachedRequests: getCachedRequests,
    setCachedRequests: setCachedRequests,
}
