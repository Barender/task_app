import { createSelector } from "reselect";
import { initialState } from "../reducers/auth.reducer";

export const selectAuthDomain = (state) => state.auth || initialState;

export const selectIsAuthenticated = () => createSelector(selectAuthDomain, (subState) => subState?.isAuthenticated);

export const selectUserData = () => createSelector(selectAuthDomain, (subState) => subState?.user);

export const selectLoaderStatus = () => createSelector(selectAuthDomain, (subState) => subState?.loaderStatus);
