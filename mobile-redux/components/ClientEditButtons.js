import React from "react";
import PropTypes from "prop-types";

import "./shared.css";

class ClientEditButtons extends React.PureComponent {
  static propTypes = {
    isEditing: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isNew: PropTypes.bool,
  };

  render() {
    const { isEditing, onEdit, onSave, onCancel, isNew } = this.props;

    if (isEditing) {
      return (
        <div className="edit-buttons">
          <button onClick={onSave} className="save-button">
            Сохранить
          </button>
          <button onClick={onCancel} className="cancel-button">
            Отмена
          </button>
        </div>
      );
    }

    return (
      <button onClick={onEdit} className="edit-button">
        Редактировать
      </button>
    );
  }
}

export default ClientEditButtons;
