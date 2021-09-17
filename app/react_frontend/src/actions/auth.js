import * as authActionTypes from './../constants/actions/auth'

export const login = (token, user) => {
  return {
    type: authActionTypes.AUTH_SUCCESS,
    user: user,
    token: token
  }
}

export const logout = () => {
  return {
    type: authActionTypes.AUTH_LOGOUT
  }
}

export const dashboard = () => {
  return {
    type: authActionTypes.DASHBOARD
  }
}
