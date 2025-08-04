import React from "react";
import PropTypes from "prop-types";

import "./shared.css";

class ClientEditField extends React.PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string,
    inputRef: PropTypes.object,
  };

  render() {
    const {
      isEditing,
      value,
      placeholder,
      type = "text",
      inputRef,
    } = this.props;

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
  }
}

export default ClientEditField;
