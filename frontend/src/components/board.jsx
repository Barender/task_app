import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks } from "../redux/selectors/task.selector";
import taskActions from "../redux/actions/task.action";
import TaskContext from "../contexts/task.context";
import TaskSeach from "./dashboard/taskSeach";
import loadable from "./loadable";
import ModalBox from "./modal";

// lazy import components
const TaskPieBoard = loadable(() => import("./dashboard/taskPieBoard"), {
  fallback: <>Loading...</>,
});
const TaskCompleted = loadable(() => import("./dashboard/taskCompleted"), {
  fallback: <>Loading...</>,
});
const LatestTaks = loadable(() => import("./dashboard/latestTaks"), {
  fallback: <>Loading...</>,
});
const TaskList = loadable(() => import("./dashboard/taskList"), {
  fallback: <>Loading...</>,
});
const TaskForm = loadable(() => import("./dashboard/taskForm"), {
  fallback: <>Loading...</>,
});

const Board = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector(selectAllTasks());
  const [tasks, setTasks] = React.useState([]);

  // initialize task to state
  React.useEffect(() => {
    setTasks(allTasks);
  }, [allTasks]);

  // handle search and filtering
  const [value, setValue] = React.useState(undefined);
  const newValue = React.useDeferredValue(value);
  const filteredTasks = React.useMemo(() => {
    if (newValue) {
      return tasks?.filter((item) =>
        item?.task?.toLowerCase()?.includes(newValue)
      );
    } else {
      return tasks;
    }
  }, [newValue, tasks, allTasks]);

  // handle modal
  const [taskSelected, setTaskSelected] = React.useState(null);
  const [modalStatus, setModalStatus] = React.useState(false);

  // handle task update
  const handleTaskUpdate = (state, data) => {
    dispatch(taskActions.requestUpdateTask(data?.id, { isComplete: state }));
  };

  // handle task update
  const handleDeleteTask = (id) => {
    dispatch(taskActions.requestDeleteTask(id));
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
      }}
    >
      <ModalBox>
        <TaskForm />
      </ModalBox>
      <div className="container">
        <div className="row mt-4">
          {/* cards on top */}
          <TaskCompleted />
          <LatestTaks />
          <TaskPieBoard />
        </div>
        <div className="row mt-4">
          <div className="col-md-7">
            <p>Tasks</p>
          </div>
          {/* search bar */}
          <TaskSeach />
        </div>
        {/* tasks listing */}
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export default React.memo(Board);
