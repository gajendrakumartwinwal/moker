const addToList = (list = [], request) => {
    const index = list.findIndex(item => item.id === request.id)
    if(index !== -1) return updateToList(list, request)
    return [...list, {...request, id: list.length}];
}
const deleteToList = (list = [], {'id': actionId}) => {
    return list.filter(({id}) => id !== actionId).map(({id, ...rest}, index) => ({id: index, ...rest}));
}
const updateToList = (list = [], {'id': actionId, ...rest}) => {
    return list.map(({id, ...restOld}) => id !== actionId ? {id, ...restOld} : {id, ...rest});
}
const toggleToList = (list = [], {'id': actionId}, key = 'enable') => {
    return list.map(({id, ...rest}) => id !== actionId ? {id, ...rest} : {id, ...rest, [key]: !rest[key]});
}
const mapperListItem = (list = [], {requestId, ...data}, reducer) => {
    return list.map(({testcases, id, ...rest}) => {
        if (id !== requestId) return {testcases, id, ...rest};
        return {testcases: reducer(testcases, data), ...rest};
    })
}


const requestReducer = (requests = [], {type, data}) => {
    switch (type) {
        case ACTION_TYPE_REQUEST.ADD_REQUEST:
            return addToList(requests, data);
        case ACTION_TYPE_REQUEST.DELETE_REQUEST:
            return deleteToList(requests, data);
        case ACTION_TYPE_REQUEST.UPDATE_REQUEST:
            return updateToList(requests, data);
        case ACTION_TYPE_REQUEST.UPDATE_REQUESTS:
            return data.requests;

        case ACTION_TYPE_REQUEST.ADD_CASE:
            return mapperListItem(requests, data, addToList);
        case ACTION_TYPE_REQUEST.DELETE_CASE:
            return mapperListItem(requests, data, deleteToList);
        case ACTION_TYPE_REQUEST.UPDATE_CASE:
            return mapperListItem(requests, data, updateToList);
        case ACTION_TYPE_REQUEST.TOGGLE_CASE:
            return mapperListItem(requests, data, toggleToList);

        default:
            return requests
    }
}

export const ACTION_TYPE_REQUEST = {
    ADD_REQUEST: 'add_request',
    DELETE_REQUEST: 'delete_request',
    UPDATE_REQUEST: 'update_request',
    ADD_CASE: 'add_test',
    DELETE_CASE: 'delete_test',
    UPDATE_CASE: 'update_test',
    TOGGLE_CASE: 'toggle_test',
    UPDATE_REQUESTS: 'update_requests',
}

export default requestReducer
