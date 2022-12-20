import produce from "immer";
import authActions from "../actions/auth.action";

export const initialState = {
  user: null,
  isAuthenticated: false,
  loaderStatus: false,
};

const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const data = draft;
    const { type, payload } = action;
    switch (type) {
      case authActions.LOGIN_SUCCESS:
        data.user = payload;
        data.isAuthenticated = true;
        break;
      case authActions.LOGOUT_SUCCESS:
        data.user = null;
        data.isAuthenticated = false;
        break;
      case authActions.USER_DATA_SUCCESS:
        data.user = payload;
        data.isAuthenticated = true;
        break;
      case authActions.SET_AUTH_STATUS:
        data.isAuthenticated = payload;
        break;
      case authActions.SET_LOADER_STATUS:
        data.loaderStatus = payload;
        break;
      default:
        return { ...state };
    }
    return data;
  });

export default authReducer;
