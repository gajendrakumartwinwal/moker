import {combineReducers} from 'redux'
import requests from "./requestReducer";
const defaultCommon = {
    loading: '',
    edit: false,
}
const common = (state = defaultCommon, action) => {
    console.log('COMMON -> '+JSON.stringify(action))
    switch (action.type) {
        case ACTION_TYPE.EDIT_TOGGLE:
            return {...state, edit: !state.edit}
        case ACTION_TYPE.SAVE_STARTED:
            return {...state, loading: true}
        case ACTION_TYPE.SAVE_ENDED:
            return {...state, loading: false}
        case ACTION_TYPE.OPEN_ADD_REQUEST_DIALOG:
            return {...state, openAddRequestDialog: true}
        case ACTION_TYPE.CLOSE_ADD_REQUEST_DIALOG:
            return {...state, openAddRequestDialog: false}
        default:
            return state
    }
}

export const ACTION_TYPE = {
    EDIT_TOGGLE: 'edit',
    SAVE_STARTED: 'saveStarted',
    SAVE_ENDED: 'saveEnded',
    OPEN_ADD_REQUEST_DIALOG: 'openAddRequestDialog',
    CLOSE_ADD_REQUEST_DIALOG: 'closeAddRequestDialog',
}

export default combineReducers({
    requests,
    common,
});
