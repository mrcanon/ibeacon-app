import { TOGGLE_MENU, HIDE_MENU, CHANGE_LANGUAGE } from './actionTypes'
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