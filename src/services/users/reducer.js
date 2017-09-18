import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE } from './actionTypes'

function reducerUser(state = { isMenu: false }, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenu: !action.status
            }
        case CHANGE_LANGUAGE:
            return {
                ...state,
                lng: action.lng
            }
        case HIDE_MENU:
            return {
                ...state,
                isMenu: false
            }
        default:
            return state
    }
}

export default reducerUser