import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const NewCheckbox = (props) => {
  return <Form.Check {...props}>{props.children}</Form.Check>;
};

NewCheckbox.propTypes = {
  children: PropTypes.any,
};
NewCheckbox.defaultProps = {
  children: <></>,
};

export default NewCheckbox;
