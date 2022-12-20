import React from "react";
import { Form } from "react-bootstrap";

const NewInput = (props) => {
  return (
    <Form.Group>
      <Form.Control {...props} />
    </Form.Group>
  );
};

export default NewInput;
