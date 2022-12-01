const taskActions = {
  REQUEST_DASHBOARD_DATA: "REQUEST_DASHBOARD_DATA",
  DASHBOARD_DATA_SUCCESS: "DASHBOARD_DATA_SUCCESS",
  REQUEST_ALL_TASKS: "REQUEST_ALL_TASKS",
  ALL_TASKS_SUCCESS: "ALL_TASKS_SUCCESS",
  REQUEST_NEW_TASK: "REQUEST_NEW_TASK",
  REQUEST_UPDATE_TASK: "REQUEST_UPDATE_TASK",
  REQUEST_DELETE_TASK: "REQUEST_DELETE_TASK",
  requestDashboardData: () => ({
    type: taskActions.REQUEST_DASHBOARD_DATA,
  }),
  dashboardDataSuccess: (data) => ({
    payload: data,
    type: taskActions.DASHBOARD_DATA_SUCCESS,
  }),
  requestAllTask: () => ({
    type: taskActions.REQUEST_ALL_TASKS,
  }),
  allTaskSuccess: (data) => ({
    payload: data,
    type: taskActions.ALL_TASKS_SUCCESS,
  }),
  requestNewTask: (data) => ({
    payload: data,
    type: taskActions.REQUEST_NEW_TASK,
  }),
  requestUpdateTask: (id, data) => ({
    payload: { id, data },
    type: taskActions.REQUEST_UPDATE_TASK,
  }),
  requestDeleteTask: (data) => ({
    payload: data,
    type: taskActions.REQUEST_DELETE_TASK,
  }),
};

export default taskActions;
