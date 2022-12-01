import { takeLatest, put, call } from "redux-saga/effects";
import { formatThrowError } from "../../utils/helper.utils";
import api from "../../utils/api.utils";
import caller from "../../utils/caller.utils";
import taskActions from "../actions/task.action";
import notification from "../../utils/notification.utils";

// ***** GET ALL TASK ***** //
export function* getAllTaskSaga() {
  try {
    const { data, status } = yield caller(api.TASK);
    if (status >= 200 && status <= 204) {
      yield put(taskActions.allTaskSuccess(data?.result));
    } else {
      formatThrowError(data?.message);
    }
  } catch (error) {
    notification(error.message, "danger");
  }
}

// ***** GET DASHBOARD DATA ***** //
export function* getDashboardDataSaga() {
  try {
    const { data, status } = yield caller(api.DASHBOARD);
    if (status >= 200 && status <= 204) {
      yield put(taskActions.dashboardDataSuccess(data?.result));
    } else {
      formatThrowError(data?.message);
    }
  } catch (error) {
    notification(error.message, "danger");
  }
}

// ***** CREATE A TASK ***** //
export function* requestNewTaskSaga({ payload }) {
  if (payload) {
    try {
      const { data, status } = yield caller(api.TASK, payload, "POST");
      if (status >= 200 && status <= 204) {
        yield put(taskActions.allTaskSuccess(data?.result));
        yield call(getDashboardDataSaga);
        notification("Task has been created");
      } else {
        formatThrowError(data?.message);
      }
    } catch (error) {
      notification(error.message, "danger");
    }
  }
}

// ***** UPDATE A TASK ***** //
export function* requestUpdateTaskSaga({ payload }) {
  const { id, data: formData } = { ...payload };
  if (id) {
    try {
      const { data, status } = yield caller(
        `${api.TASK}/${id}`,
        formData,
        "PUT"
      );
      if (status >= 200 && status <= 204) {
        yield put(taskActions.allTaskSuccess(data?.result));
        yield call(getDashboardDataSaga);
        notification("Task has been updated");
      } else {
        formatThrowError(data?.message);
      }
    } catch (error) {
      notification(error.message, "danger");
    }
  }
}

// ***** DELETE A TASK ***** //
export function* requestDeleteTaskSaga({ payload }) {
  if (payload) {
    try {
      const { data, status } = yield caller(
        `${api.TASK}/${payload}`,
        {},
        "DELETE"
      );
      if (status >= 200 && status <= 204) {
        yield put(taskActions.allTaskSuccess(data?.result));
        yield call(getDashboardDataSaga);
        notification("Task has been deleted");
      } else {
        formatThrowError(data?.message);
      }
    } catch (error) {
      notification(error.message, "danger");
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
