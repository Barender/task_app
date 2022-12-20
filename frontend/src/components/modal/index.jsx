import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import TaskContext from "../../contexts/task.context";

const ModalBox = ({ children, modalTitle }) => {
  const { modalStatus, setModalStatus, setTaskSelected, setDeleteId } =
    React.useContext(TaskContext);

  // handle modal close event
  const handleModalClose = React.useCallback(() => {
    setTaskSelected(false);
    setModalStatus(false);
    setDeleteId(null);
  }, [modalStatus]);
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
  children: PropTypes.any,
};
ModalBox.defaultProps = {
  modalTitle: "Add/Update a task",
  children: <></>,
};

export default React.memo(ModalBox);
