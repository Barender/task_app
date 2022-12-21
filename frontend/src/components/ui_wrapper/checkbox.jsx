import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const NewCheckbox = (props) => {
  const { defaultChecked, id, role, onChange, label } = { ...props };
  return (
    <Form.Check
      inline
      defaultChecked={defaultChecked}
      id={id}
      role={role}
      onChange={onChange}
      label={
        <span
          className={
            defaultChecked ? "text-break text-secondary text-decoration-line-through" : "text-break text-primary"
          }
          htmlFor={id}
        >
          {label}
        </span>
      }
    />
  );
};

NewCheckbox.propTypes = {
  defaultChecked: PropTypes.any,
  id: PropTypes.any,
  role: PropTypes.any,
  onChange: PropTypes.any,
  label: PropTypes.any,
};
NewCheckbox.defaultProps = {
  defaultChecked: false,
  id: "some",
  role: "checkbox",
  onChange: () => {},
  label: <></>,
};

export default NewCheckbox;
