import * as authActionTypes from './../constants/actions/auth'

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    isAuthenticated: true
  }
}

const logout = (state, action) => {
  return {
    token: null,
    user: null,
    isAuthenticated: false
  };
}

const auth = (state=initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case authActionTypes.AUTH_LOGOUT: return logout(state, action);
    default:
        return state;
  }
}

export default auth;
