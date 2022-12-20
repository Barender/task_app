import { createSelector } from "reselect";
import { initialState } from "../reducers/task.reducer";

export const selectTaskDomain = (state) => state.task || initialState;

export const selectDashboardData = () => createSelector(selectTaskDomain, (subState) => subState?.dashboardData);

export const selectAllTasks = () => createSelector(selectTaskDomain, (subState) => subState?.tasks);
