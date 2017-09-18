import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE, TOGGLE_LOADING } from './actionTypes'

function reducerUser(state = { isMenu: false, isLoading: false }, action) {
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
        case TOGGLE_LOADING:
            return{
                ...state,
                isLoading: !action.status
            }
        default:
            return state
    }
}

export default reducerUser