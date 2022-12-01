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
        <div className="card-body">
          <div className="row">
            {filteredTasks?.map((task) => (
              <TaskBox {...{ task }} key={task?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
