import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

// wrapper button
const NewButton = (props) => {
  return (
    <Button className={props.className} {...props}>
      {props.children}
    </Button>
  );
};

NewButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};
NewButton.defaultProps = {
  className: "",
  children: <></>,
};

export default NewButton;
