import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE, TOGGLE_LOADING, TOGGLE_LOGIN, LOGOUT, DISTANCE_IBEACON } from './actionTypes'

function reducerUser(state = { isMenu: false, isLoading: false, distance: 0 }, action) {
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
            localStorage.setItem("isAuthenticated", true)
            localStorage.setItem("dataUser", JSON.stringify(action.data))
            localStorage.setItem("tokenUser", action.token)

            return {
                ...state
            }
        case LOGOUT:
            localStorage.setItem("isAuthenticated", false);

            return {
                ...state
            }
        case DISTANCE_IBEACON:
            return {
                ...state,
                distance: action.distance
            }
        default:
            return state
    }
}

export default reducerUser