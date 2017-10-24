import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE, TOGGLE_LOADING, TOGGLE_LOGIN, LOGOUT,  DISTANCE_IBEACON} from './actionTypes'
let timer = null
export function toggleMenu(status) {
  return {
    type: TOGGLE_MENU,
    status
  }
}

export function changeLng(lng) {
  return {
    type: CHANGE_LANGUAGE,
    lng
  }
}

export function distanceIbeacon(distance){
  return{
    type: DISTANCE_IBEACON,
    distance
  }
}

export function toggleLogin(data, token) {
  return {
    type: TOGGLE_LOGIN,
    data,
    token
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function toggleLoading(status) {
  return {
    type: TOGGLE_LOADING,
    status
  }
}

export function hideMenu() {
  return dispatch => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: HIDE_MENU
      })
    }, 500)
  }
}