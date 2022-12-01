const authActions = {
  REQUEST_LOGIN: "REQUEST_LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  REQUEST_LOGOUT: "REQUEST_LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  REQUEST_USER_DATA: "REQUEST_USER_DATA",
  USER_DATA_SUCCESS: "USER_DATA_SUCCESS",
  SET_AUTH_STATUS: "SET_AUTH_STATUS",
  requestLogin: (data) => ({
    payload: data,
    type: authActions.REQUEST_LOGIN,
  }),
  loginSuccess: (data) => ({
    payload: data,
    type: authActions.LOGIN_SUCCESS,
  }),
  requestLogout: (token) => ({
    payload: token,
    type: authActions.REQUEST_LOGOUT,
  }),
  logoutSuccess: () => ({
    type: authActions.LOGOUT_SUCCESS,
  }),
  requestUserData: () => ({
    type: authActions.REQUEST_USER_DATA,
  }),
  userDataSuccess: (data) => ({
    payload: data,
    type: authActions.USER_DATA_SUCCESS,
  }),
  setAuthStatus: (data) => ({
    payload: data,
    type: authActions.SET_AUTH_STATUS,
  }),
};

export default authActions;
