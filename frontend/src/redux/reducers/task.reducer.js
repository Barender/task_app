import produce from "immer";
import taskActions from "../actions/task.action";

export const initialState = {
  dashboardData: null,
  tasks: [],
};

const taskReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const data = draft;
    const { type, payload } = action;
    switch (type) {
      case taskActions.DASHBOARD_DATA_SUCCESS:
        data.dashboardData = payload;
        break;
      case taskActions.ALL_TASKS_SUCCESS:
        data.tasks = payload;
        break;
      default:
        return { ...state };
    }
    return data;
  });

export default taskReducer;
