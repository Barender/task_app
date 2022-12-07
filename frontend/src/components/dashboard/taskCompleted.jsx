import React from "react";
import { useSelector } from "react-redux";
import { selectDashboardData } from "../../redux/selectors/task.selector";

// task completed component
const TaskCompleted = () => {
  const dashboardData = useSelector(selectDashboardData());
  return (
    <div className="col-md-4 my-1">
      <div className="card text-secondary">
        <div className="card-body vertically-fix-card">
          <h5>Task Completed</h5>
          <span className="big-font-task text-primary" title="task-completed">
            {dashboardData?.competedTasks || 0}
          </span>{" "}
          / {dashboardData?.totalTasks || 0}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskCompleted);
