import React from "react";
import { useSelector } from "react-redux";
import { selectDashboardData } from "../../redux/selectors/task.selector";
import { PieChart } from "react-minimal-pie-chart";

// graphical representation of tasks
const TaskPieBoard = () => {
  const dashboardData = useSelector(selectDashboardData());
  return (
    <div className="col-md-4 my-1">
      <div className="card text-secondary">
        <div className="card-body vertically-fix-card">
          <div className="text-center">
            {dashboardData?.competedTasks ? (
              <PieChart
                className="big-pie"
                label={({ dataEntry }) => dataEntry.value}
                data={[
                  {
                    title: "Completed Task",
                    value: dashboardData?.competedTasks || 0,
                    color: "#FDF",
                  },
                  {
                    title: "Total Task",
                    value: dashboardData?.totalTasks || 0,
                    color: "#C137",
                  },
                ]}
              />
            ) : (
              "No tasks found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskPieBoard);
