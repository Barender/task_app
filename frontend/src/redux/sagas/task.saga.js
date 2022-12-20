import { takeLatest, put, call } from "redux-saga/effects";
import api from "../../utils/api.utils";
import caller from "../../utils/caller.utils";
import taskActions from "../actions/task.action";
import authActions from "../actions/auth.action";
import notification from "../../utils/notification.utils";

// ***** GET ALL TASK ***** //
export function* getAllTaskSaga() {
  try {
    const { result } = yield caller(api.TASK);
    yield put(taskActions.allTaskSuccess(result));
    yield put(authActions.setLoaderStatus(false));
  } catch (error) {
    yield put(authActions.setLoaderStatus(false));
  }
}

// ***** GET DASHBOARD DATA ***** //
export function* getDashboardDataSaga() {
  try {
    const { result } = yield caller(api.DASHBOARD);
    yield put(taskActions.dashboardDataSuccess(result));
    yield put(authActions.setLoaderStatus(false));
  } catch (error) {
    yield put(authActions.setLoaderStatus(false));
  }
}

// ***** CREATE A TASK ***** //
export function* requestNewTaskSaga({ payload }) {
  if (payload) {
    try {
      const { result } = yield caller(api.TASK, payload, "POST");
      yield put(taskActions.allTaskSuccess(result));
      yield call(getDashboardDataSaga);
      notification("Task has been created");
      yield put(authActions.setLoaderStatus(false));
    } catch (error) {
      yield put(authActions.setLoaderStatus(false));
    }
  }
}

// ***** UPDATE A TASK ***** //
export function* requestUpdateTaskSaga({ payload }) {
  const { id, data: formData } = { ...payload };
  if (id) {
    try {
      const { result } = yield caller(`${api.TASK}/${id}`, formData, "PUT");
      yield put(taskActions.allTaskSuccess(result));
      yield call(getDashboardDataSaga);
      notification("Task has been updated");
      yield put(authActions.setLoaderStatus(false));
    } catch (error) {
      yield put(authActions.setLoaderStatus(false));
    }
  }
}

// ***** DELETE A TASK ***** //
export function* requestDeleteTaskSaga({ payload }) {
  if (payload) {
    try {
      const { result } = yield caller(`${api.TASK}/${payload}`, {}, "DELETE");
      yield put(taskActions.allTaskSuccess(result));
      yield call(getDashboardDataSaga);
      notification("Task has been deleted");
      yield put(authActions.setLoaderStatus(false));
    } catch (error) {
      yield put(authActions.setLoaderStatus(false));
    }
  }
}

// ***** BINDING ACTION AND FUNCTION LOGIC ***** //
export default function* taskSaga() {
  yield takeLatest(taskActions.REQUEST_ALL_TASKS, getAllTaskSaga);
  yield takeLatest(taskActions.REQUEST_DASHBOARD_DATA, getDashboardDataSaga);
  yield takeLatest(taskActions.REQUEST_NEW_TASK, requestNewTaskSaga);
  yield takeLatest(taskActions.REQUEST_UPDATE_TASK, requestUpdateTaskSaga);
  yield takeLatest(taskActions.REQUEST_DELETE_TASK, requestDeleteTaskSaga);
}
