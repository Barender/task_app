import React from "react";
import { useDispatch } from "react-redux";
import TaskContext from "../../contexts/task.context";
import authActions from "../../redux/actions/auth.action";
import taskActions from "../../redux/actions/task.action";
import NewButton from "../ui_wrapper/button";
import NewInput from "../ui_wrapper/input";

const TaskForm = () => {
  const dispatch = useDispatch();
  const { taskSelected, setTaskSelected, setModalStatus } =
    React.useContext(TaskContext);

  // return error
  const [error, setError] = React.useState(undefined);
  const [task, setTask] = React.useState(taskSelected?.task);

  // handle submit event
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!task) return setError("Please add task");
      const formData = {
        task,
      };
      if (taskSelected?.id) {
        formData.isComplete = taskSelected?.isComplete;
        dispatch(authActions.setLoaderStatus(true));
        dispatch(taskActions.requestUpdateTask(taskSelected?.id, formData));
      } else {
        dispatch(authActions.setLoaderStatus(true));
        dispatch(taskActions.requestNewTask(formData));
      }
      setTaskSelected(undefined);
      setModalStatus(undefined);
    },
    [task]
  );
  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label className="text-secondary">Enter task name</label>
          <NewInput
            type="text"
            className="form-control"
            id="task"
            placeholder="task name"
            name="task"
            value={task}
            onChange={(e) => {
              if (e.target.value?.length >= 200) {
                return setError("Maximum allowed limit exceeds");
              }
              setError(false);
              setTask(e.target.value);
            }}
          />
          <p className="text-danger text-center my-2" title="error">
            {error}
          </p>
        </div>
        <NewButton
          type="type"
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
        >
          Submit
        </NewButton>
      </div>
    </>
  );
};

export default React.memo(TaskForm);
