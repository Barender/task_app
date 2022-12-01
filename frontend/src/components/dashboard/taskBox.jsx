import React from "react";
import TaskContext from "../../contexts/task.context";

const TaskBox = ({ task }) => {
  const {
    handleTaskUpdate,
    handleDeleteTask,
    setTaskSelected,
    setModalStatus,
  } = React.useContext(TaskContext);
  const { task: taskName, isComplete, id } = { ...task };

  // modal invoke and set selected task
  const handleTaskEdit = () => {
    setTaskSelected(task);
    setModalStatus(true);
  };
  return (
    <>
      <div className="col-md-9">
        <div className="form-check mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked={isComplete}
            id={id}
            onChange={(e) => handleTaskUpdate(e.target.checked, task)}
          />
          <label
            className={
              isComplete
                ? "form-check-label text-primary text-decoration-line-through"
                : "form-check-label text-primary"
            }
            htmlFor={id}
          >
            {taskName}
          </label>
        </div>
      </div>
      <div className="col-md-3">
        <button
          type="button"
          className="btn btn-link float-end"
          onClick={() => handleDeleteTask(id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-link float-end"
          onClick={handleTaskEdit}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default React.memo(TaskBox);
