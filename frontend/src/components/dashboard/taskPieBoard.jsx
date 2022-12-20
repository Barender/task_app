import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectDashboardData } from "../../redux/selectors/task.selector";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// graphical representation of tasks
const TaskPieBoard = () => {
  const dashboardData = useSelector(selectDashboardData());

  // prepare chart data
  const chartData = {
    labels: [
      `#${dashboardData?.competedTasks} Completed tasks`,
      `#${dashboardData?.totalTasks} Total tasks`,
    ],
    datasets: [
      {
        label: "# of tasks",
        data: [dashboardData?.competedTasks, dashboardData?.totalTasks],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-md-4 my-1">
      <div className="card text-secondary">
        <div className="card-body vertically-fix-card">
          <div className="text-center">
            <Pie data={chartData} className="pie_board" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskPieBoard);
