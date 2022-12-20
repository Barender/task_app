import React from "react";
import { useSelector } from "react-redux";
import { selectDashboardData } from "../../redux/selectors/task.selector";

const LatestTaks = () => {
  const dashboardData = useSelector(selectDashboardData());

  return (
    <div className="col-md-4 my-1">
      <div className="card text-secondary">
        <div className="card-body vertically-fix-card latest_task">
          <h5 className="text-secondary">Latest Task Created</h5>
          <div>
            <ul
              title="latest-task"
              className={
                dashboardData?.latestTask?.length > 0 ? "ps-3" : "ps-0"
              }
            >
              {dashboardData?.latestTask?.map((data) => (
                <li
                  key={data.id}
                  className={
                    data?.isComplete ? "text-decoration-line-through" : ""
                  }
                  title={data?.task}
                >
                  {data?.task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestTaks;
