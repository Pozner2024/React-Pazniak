import React from "react";
import PropTypes from "prop-types";
import "./DoubleButton.scss";

const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {
  return (
    <div className="double-button">
      <input
        type="button"
        value={caption1}
        onClick={() => cbPressed(1)}
        className="double-button__btn"
      />
      <span className="double-button__text">{children}</span>
      <input
        type="button"
        value={caption2}
        onClick={() => cbPressed(2)}
        className="double-button__btn"
      />
    </div>
  );
};

DoubleButton.propTypes = {
  caption1: PropTypes.string.isRequired,
  caption2: PropTypes.string.isRequired,
  cbPressed: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DoubleButton;
