import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import TaskContext from "../../contexts/task.context";

const ModalBox = ({ children, modalTitle }) => {
  const { modalStatus, setModalStatus, setTaskSelected } =
    React.useContext(TaskContext);

  // handle modal close event
  const handleModalClose = () => {
    setTaskSelected(false);
    setModalStatus(false);
  };
  return (
    <>
      <Modal
        size="lg"
        show={modalStatus}
        onHide={handleModalClose}
        aria-labelledby="example-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal">{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

ModalBox.propTypes = {
  modalTitle: PropTypes.string.isRequired,
};
ModalBox.defaultProps = {
  modalTitle: "Add/Update a task",
};

export default React.memo(ModalBox);
