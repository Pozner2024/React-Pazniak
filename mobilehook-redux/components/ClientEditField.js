import React, { memo } from "react";
import PropTypes from "prop-types";

import "./shared.css";

const ClientEditField = memo(({
  isEditing,
  value,
  placeholder,
  type = "text",
  inputRef,
}) => {
  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type={type}
        defaultValue={value}
        className="client-input"
        placeholder={placeholder}
      />
    );
  }

  return <span className="client-text">{value}</span>;
});

ClientEditField.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  inputRef: PropTypes.object,
};

export default ClientEditField;
