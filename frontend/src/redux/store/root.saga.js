import { all } from "redux-saga/effects";
// import all saga files
import authSaga from "../sagas/auth.saga";
import taskSaga from "../sagas/task.saga";

// combine all saga files
export default function* rootSaga() {
  yield all([authSaga(), taskSaga()]);
}
