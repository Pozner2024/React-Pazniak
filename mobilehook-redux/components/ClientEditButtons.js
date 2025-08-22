import React, { memo } from "react";
import PropTypes from "prop-types";

import "./shared.css";

const ClientEditButtons = memo(({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isNew,
}) => {
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
});

ClientEditButtons.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
};

export default ClientEditButtons;
