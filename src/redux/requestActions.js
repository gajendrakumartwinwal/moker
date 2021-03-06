import {ACTION_TYPE_REQUEST} from "./requestReducer";
import {ACTION_TYPE} from "./reducer";

export const BASE_DOMAIN = 'http://localhost:8088'


const SAVE_START = {
    type: ACTION_TYPE.SAVE_STARTED,
};
const SAVE_END = {
    type: ACTION_TYPE.SAVE_ENDED,
};

const WITH_SERVER = (actionFunction) => {
    return (...args) => (dispatch) => {
        const action = actionFunction(...args)
        dispatch(SAVE_START)
        fetch(`${BASE_DOMAIN}/dispatchAction`, {
            method: 'post',
            body: JSON.stringify(action)
        }).then(res => res.text())
            .then(body => {
                dispatch(action)
            })
            .catch(e => {
                alert('Error occured try again')
            })
            .finally(() => dispatch(SAVE_END))
    }
}

/********************************** REQUESTS **********************************/
const ADD_REQUEST = (request) => ({
    type: ACTION_TYPE_REQUEST.ADD_REQUEST,
    data: {...request}
});
export const ADD_REQUEST_ASYNC = WITH_SERVER(ADD_REQUEST)


const DELETE_REQUEST = (id) => ({
    type: ACTION_TYPE_REQUEST.DELETE_REQUEST,
    data: {id}
});
export const DELETE_REQUEST_ASYNC = WITH_SERVER(DELETE_REQUEST)

export const UPDATE_REQUEST = (request) => ({
    type: ACTION_TYPE_REQUEST.UPDATE_REQUEST,
    data: {...request}
});
export const UPDATE_REQUEST_ASYNC = WITH_SERVER(UPDATE_REQUEST)


/********************************** TESTS **********************************/
export const ADD_CASE = (requestId, test) => ({
    type: ACTION_TYPE_REQUEST.ADD_CASE,
    data: {requestId, ...test}
});
export const ADD_CASE_ASYNC = WITH_SERVER(ADD_CASE)

export const DELETE_CASE = (requestId, id) => ({
    type: ACTION_TYPE_REQUEST.DELETE_CASE,
    data: {requestId, id}
});
export const DELETE_CASE_ASYNC = WITH_SERVER(DELETE_CASE)

export const UPDATE_CASE = (requestId, test) => ({
    type: ACTION_TYPE_REQUEST.UPDATE_CASE,
    data: {requestId, ...test}
});
export const UPDATE_CASE_ASYNC = WITH_SERVER(UPDATE_CASE)

export const TOGGLE_CASE = (requestId, id) => ({
    type: ACTION_TYPE_REQUEST.TOGGLE_CASE,
    data: {requestId, id}
});
export const TOGGLE_CASE_ASYNC = WITH_SERVER(TOGGLE_CASE)


/********************************** REQUESTS LOAD **********************************/
const UPDATE_REQUESTS = (requests) => ({
    type: ACTION_TYPE_REQUEST.UPDATE_REQUESTS,
    data: {requests}
});

export const LOAD_REQUEST_ASYNC = () => (dispatch) => {
    dispatch(SAVE_START)
    fetch(`${BASE_DOMAIN}/loadRequests`).then(res => res.text())
        .then(body => {
            dispatch(UPDATE_REQUESTS(JSON.parse(body)))
        })
        .catch(e => {
            alert('Error occured in loading requests from server!')
        })
        .finally(() => dispatch(SAVE_END))
}
