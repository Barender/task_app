import React from "react";
import { useDispatch } from "react-redux";
import TaskContext from "../../contexts/task.context";
import taskActions from "../../redux/actions/task.action";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { taskSelected, setTaskSelected, setModalStatus } =
    React.useContext(TaskContext);

  // handle submit event
  const [task, setTask] = React.useState(taskSelected?.task);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      task,
    };
    if (taskSelected?.id) {
      formData.isComplete = taskSelected?.isComplete;
      dispatch(taskActions.requestUpdateTask(taskSelected?.id, formData));
    } else {
      dispatch(taskActions.requestNewTask(formData));
    }
    setTaskSelected(undefined);
    setModalStatus(undefined);
  };
  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label className="text-secondary">Enter task name</label>
          <input
            type="text"
            className="form-control"
            id="task"
            placeholder="task name"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button
          type="type"
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default React.memo(TaskForm);
