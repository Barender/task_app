import { combineReducers } from "redux";
// import all pages/components reducer
import authReducer from "../reducers/auth.reducer";
import taskReducer from "../reducers/task.reducer";

// combine all reducers into root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export default rootReducer;
