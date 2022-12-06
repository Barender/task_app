import React from "react";
import { useSelector } from "react-redux";
import { selectDashboardData } from "../../redux/selectors/task.selector";

const LatestTaks = () => {
  const dashboardData = useSelector(selectDashboardData());
  return (
    <div className="col-md-4 my-1">
      <div className="card text-secondary">
        <div className="card-body vertically-fix-card">
          <h5 className="text-secondary">Latest Task Created</h5>
          <div>
            <ul>
              {dashboardData?.latestTask?.length > 0
                ? dashboardData?.latestTask?.map((data) => (
                    <li
                      key={data.id}
                      className={
                        data?.isComplete ? "text-decoration-line-through" : ""
                      }
                    >
                      {data?.task}
                    </li>
                  ))
                : "No tasks found."}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LatestTaks);
