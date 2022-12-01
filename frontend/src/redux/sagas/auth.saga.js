import api from "../../utils/api.utils";
import caller from "../../utils/caller.utils";
import authActions from "../actions/auth.action";
import notification from "../../utils/notification.utils";
import { takeLatest, put } from "redux-saga/effects";
import { formatThrowError } from "../../utils/helper.utils";
import { removeCookie, setCookie } from "../../utils/auth.utils";

// ***** LOGIN USER ***** //
export function* requestLoginSaga({ payload }) {
  try {
    const { data, status } = yield caller(api.SIGNIN, payload, "POST");
    if (status >= 200 && status <= 204) {
      yield put(authActions.loginSuccess(data.result?.user));
      setCookie("access", data?.result?.access?.token);
      setCookie("refresh", data?.result?.refresh?.token);
    } else {
      formatThrowError(data?.message);
    }
  } catch (error) {
    notification(error.message, "danger");
  }
}

// ***** LOGOUT USER ***** //
export function* requestLogoutSaga({ payload }) {
  try {
    const { data, status } = yield caller(api.SIGNOUT, payload, "POST");
    if (status >= 200 && status <= 204) {
      yield put(authActions.logoutSuccess());
      removeCookie("access", { path: "/" });
      removeCookie("refresh", { path: "/" });
    } else {
      formatThrowError(data?.message);
    }
  } catch (error) {
    notification(error.message, "danger");
  }
}

// ***** GET USER DETAILS ***** //
export function* getUserDataSaga() {
  try {
    const { data, status } = yield caller(api.GET_USER);
    if (status >= 200 && status <= 204) {
      yield put(authActions.userDataSuccess(data?.result));
    } else {
      formatThrowError(data?.message);
    }
  } catch (error) {
    notification(error.message, "danger");
  }
}

// ***** BINDING ACTION AND FUNCTION LOGIC ***** //
export default function* authSaga() {
  yield takeLatest(authActions.REQUEST_LOGIN, requestLoginSaga);
  yield takeLatest(authActions.REQUEST_LOGOUT, requestLogoutSaga);
  yield takeLatest(authActions.REQUEST_USER_DATA, getUserDataSaga);
}
