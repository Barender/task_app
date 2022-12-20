import api from "../../utils/api.utils";
import caller from "../../utils/caller.utils";
import authActions from "../actions/auth.action";
import { takeLatest, put } from "redux-saga/effects";
import { removeCookie, setCookie } from "../../utils/auth.utils";

// ***** LOGIN USER ***** //
export function* requestLoginSaga({ payload }) {
  try {
    const { result } = yield caller(api.SIGNIN, payload, "POST");
    yield put(authActions.loginSuccess(result?.user));
    setCookie("access", result?.access?.token);
    setCookie("refresh", result?.refresh?.token);
    yield put(authActions.setLoaderStatus(false));
  } catch (error) {
    yield put(authActions.setLoaderStatus(false));
  }
}

// ***** LOGOUT USER ***** //
export function* requestLogoutSaga({ payload }) {
  try {
    yield caller(api.SIGNOUT, payload, "POST");
    removeCookie("access", { path: "/" });
    removeCookie("refresh", { path: "/" });
    yield put(authActions.logoutSuccess());
    yield put(authActions.setLoaderStatus(false));
  } catch (error) {
    yield put(authActions.setLoaderStatus(false));
  }
}

// ***** GET USER DETAILS ***** //
export function* getUserDataSaga() {
  try {
    const { result } = yield caller(api.GET_USER);
    yield put(authActions.userDataSuccess(result));
    yield put(authActions.setLoaderStatus(false));
  } catch (error) {
    yield put(authActions.setLoaderStatus(false));
  }
}

// ***** BINDING ACTION AND FUNCTION LOGIC ***** //
export default function* authSaga() {
  yield takeLatest(authActions.REQUEST_LOGIN, requestLoginSaga);
  yield takeLatest(authActions.REQUEST_LOGOUT, requestLogoutSaga);
  yield takeLatest(authActions.REQUEST_USER_DATA, getUserDataSaga);
}
