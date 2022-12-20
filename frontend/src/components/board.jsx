import React from "react";
import { selectAllTasks } from "../redux/selectors/task.selector";
import { useDispatch, useSelector } from "react-redux";
import taskActions from "../redux/actions/task.action";
import authActions from "../redux/actions/auth.action";
import TaskContext from "../contexts/task.context";
import TaskSeach from "./dashboard/taskSeach";
import loadable from "./loadable";
import ModalBox from "./modal";
import NewButton from "./ui_wrapper/button";

// lazy import components
const TaskPieBoard = loadable(() => import("./dashboard/taskPieBoard"));
const TaskCompleted = loadable(() => import("./dashboard/taskCompleted"));
const LatestTaks = loadable(() => import("./dashboard/latestTaks"));
const TaskList = loadable(() => import("./dashboard/taskList"));
const TaskForm = loadable(() => import("./dashboard/taskForm"));
const NoTaskPopper = loadable(() => import("./dashboard/noTaskPopper"));

const Board = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks());
  const [tasks, setTasks] = React.useState([]);

  // initialize task to state
  React.useEffect(() => {
    dispatch(authActions.setLoaderStatus(false));
    setTasks(allTasks);
  }, [allTasks]);

  // handle search and filtering
  const [value, setValue] = React.useState(undefined);
  const newValue = React.useDeferredValue(value);

  const filteredTasks = React.useMemo(() => {
    if (newValue) {
      return tasks?.filter((item) => item?.task?.toLowerCase()?.includes(newValue));
    } else {
      return tasks;
    }
  }, [newValue, tasks, allTasks]);

  // handle modal
  const [taskSelected, setTaskSelected] = React.useState(null);
  const [modalStatus, setModalStatus] = React.useState(false);

  // handle task update
  const handleTaskUpdate = (state, data) => {
    dispatch(authActions.setLoaderStatus(true));
    dispatch(taskActions.requestUpdateTask(data?.id, { isComplete: state }));
  };

  // handle task delete
  const [deleteId, setDeleteId] = React.useState(null);
  const handleDeleteTask = (id) => {
    setDeleteId(id);
    setModalStatus(true);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        setTasks,
        modalStatus,
        setModalStatus,
        handleTaskUpdate,
        newValue,
        setValue,
        handleDeleteTask,
        taskSelected,
        setTaskSelected,
        setDeleteId,
      }}
    >
      {deleteId ? (
        <ModalBox modalTitle="Confirm action">
          <div className="modal-body">
            <p>Are you sure you want to delete this.</p>
          </div>
          <div className="modal-footer">
            <NewButton
              type="button"
              className="btn btn-primary"
              onClick={() => {
                dispatch(authActions.setLoaderStatus(true));
                dispatch(taskActions.requestDeleteTask(deleteId));
                setTaskSelected(false);
                setModalStatus(false);
                setDeleteId(null);
              }}
            >
              Yes
            </NewButton>
            <NewButton
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setTaskSelected(false);
                setModalStatus(false);
                setDeleteId(null);
              }}
            >
              No
            </NewButton>
          </div>
        </ModalBox>
      ) : (
        <ModalBox>
          <TaskForm />
        </ModalBox>
      )}
      {allTasks.length > 0 ? (
        <div className="container">
          <div className="row mt-4">
            {/* cards on top */}
            <TaskCompleted />
            <LatestTaks />
            <TaskPieBoard />
          </div>
          <div className="row mt-4 center_panel">
            <div className="col-xl-6 col-md-2 col-lg-5">
              <p>Tasks</p>
            </div>
            {/* search bar */}
            <TaskSeach />
          </div>
          {/* tasks listing */}
          <TaskList />
        </div>
      ) : (
        <NoTaskPopper />
      )}
    </TaskContext.Provider>
  );
};

export default React.memo(Board);
