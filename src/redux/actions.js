import {ACTION_TYPE} from "./reducer";


export const EDIT_TOGGLE = () => ({
    type: ACTION_TYPE.EDIT_TOGGLE,
})

export const OPEN_ADD_REQUEST_DIALOG = () => ({
    type: ACTION_TYPE.OPEN_ADD_REQUEST_DIALOG,
})
export const CLOSE_ADD_REQUEST_DIALOG = () => ({
    type: ACTION_TYPE.CLOSE_ADD_REQUEST_DIALOG,
})
