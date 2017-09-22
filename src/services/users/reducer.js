import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE, TOGGLE_LOADING, TOGGLE_LOGIN, LOGOUT } from './actionTypes'

function reducerUser(state = { isMenu: false, isLoading: false, isAuthenticated: false, dataUser: {}, tokenUser: '' }, action) {
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
            return {
                ...state,
                isLoading: !action.status
            }
        case TOGGLE_LOGIN:
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
                dataUser: action.data,
                tokenUser: action.token
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: !state.isAuthenticated,
                dataUser: {},
                tokenUser: ''
            }
        default:
            return state
    }
}

export default reducerUser