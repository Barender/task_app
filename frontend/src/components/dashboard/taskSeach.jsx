import React from "react";
import TaskContext from "../../contexts/task.context";

// search/filter task from list
const TaskSeach = () => {
  const { newValue, setValue, setModalStatus } = React.useContext(TaskContext);
  return (
    <div className="row col-md-5 pl-3">
      <div className="col-md-9 pr-0">
        <input
          type="text"
          placeholder="search"
          className="form-control"
          value={newValue}
          onChange={(e) => setValue(e.target.value?.toLowerCase())}
        />
      </div>
      <div className="col-md-3 pr-0">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setModalStatus(true)}
        >
          + New Task
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskSeach);
