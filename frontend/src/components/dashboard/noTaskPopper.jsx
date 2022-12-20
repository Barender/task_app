import React from "react";
import TaskContext from "../../contexts/task.context";
import NewButton from "../ui_wrapper/button";

const NoTaskPopper = () => {
  const { setModalStatus } = React.useContext(TaskContext);
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card flexible-width">
          <div className="card-body">
            <h5 className="text-center text-secondary pt-4">
              You have no task.
            </h5>
            <div className="text-center pb-4">
              <NewButton
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => setModalStatus(true)}
              >
                + New Task
              </NewButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoTaskPopper;
