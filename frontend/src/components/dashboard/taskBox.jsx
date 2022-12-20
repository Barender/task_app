import { FaPen, FaTrash } from "react-icons/fa";
import React from "react";
import PropTypes from "prop-types";
import NewButton from "../ui_wrapper/button";
import NewCheckbox from "../ui_wrapper/checkbox";
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
      <div className="col-12 t_list">
        <div className="row">
          <div className="col-md-9 col-sm-9 col-8">
            <div className="form-check mt-1">
              <NewCheckbox
                defaultChecked={isComplete}
                id={id}
                role="checkbox"
                onChange={(e) => handleTaskUpdate(e.target.checked, task)}
              />
              <label
                className={
                  isComplete
                    ? "form-check-label text-break text-secondary text-decoration-line-through"
                    : "form-check-label text-break text-primary"
                }
                htmlFor={id}
              >
                {taskName}
              </label>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 col-4 edit_btns">
            <NewButton
              type="button"
              variant="link"
              className="btn float-end"
              onClick={() => handleDeleteTask(id)}
            >
              <FaTrash />
            </NewButton>
            <NewButton
              type="button"
              variant="link"
              className="btn float-end"
              onClick={handleTaskEdit}
            >
              <FaPen />
            </NewButton>
          </div>
        </div>
      </div>
    </>
  );
};

TaskBox.propTypes = {
  task: PropTypes.object,
};
TaskBox.defaultProps = {
  task: {},
};

export default React.memo(TaskBox);
