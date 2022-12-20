import React from "react";
import Spinner from "react-bootstrap/Spinner";
import loadable from "../loadable";
import TaskContext from "../../contexts/task.context";

// lazy import
const TaskBox = loadable(() => import("../dashboard/taskBox"), {
  fallback: <Spinner animation="border" />,
});

// listing tasks
const TaskList = () => {
  const { filteredTasks } = React.useContext(TaskContext);
  return (
    <div className="mt-2">
      <div className="card">
        <div className="card-body task_lists">
          <div className="row">
            {filteredTasks?.length > 0 ? (
              filteredTasks?.map((task) => (
                <TaskBox {...{ task }} key={task?.id} />
              ))
            ) : (
              <span className="pl-2 text-danger">No tasks found</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
