import React from "react";
import TaskContext from "../../contexts/task.context";
import { FaSearch } from "react-icons/fa";
import NewButton from "../ui_wrapper/button";
import NewInput from "../ui_wrapper/input";

// search/filter task from list
const TaskSeach = () => {
  const { newValue, setValue, setModalStatus } = React.useContext(TaskContext);
  return (
    <div className="col-md-10  col-xl-6 col-lg-7 text-end">
      <div className="row">
        <div className="col-md-9 col-sm-12 pr-0 position-relative task_search">
          <FaSearch />
          <NewInput
            type="text"
            placeholder="Search by task name"
            className="form-control"
            value={newValue}
            onChange={(e) => setValue(e.target.value?.toLowerCase())}
          />
        </div>
        <div className="col-md-3 col-sm-12">
          <NewButton
            type="button"
            className="btn btn-primary w-100"
            onClick={() => setModalStatus(true)}
          >
            + New Task
          </NewButton>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskSeach);
