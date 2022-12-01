import React from "react";
import Board from "../components/board";
import authActions from "../redux/actions/auth.action";
import taskActions from "../redux/actions/task.action";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/selectors/auth.selector";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated());

  // fetch dashboard data
  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(authActions.requestUserData());
      dispatch(taskActions.requestDashboardData());
      dispatch(taskActions.requestAllTask());
    }
  }, []);

  return (
    <>
      <Board />
    </>
  );
};

export default React.memo(Dashboard);
