import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { eventEmitter } from "../App";

import ClientEditField from "./ClientEditField";
import ClientEditButtons from "./ClientEditButtons";

import "./shared.css";
import "./ClientRow.css";

const ClientRow = memo(({ client }) => {
  const [isEditing, setIsEditing] = useState(client.isNew || false);

  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const patronymicRef = useRef(null);
  const balanceRef = useRef(null);

  useEffect(() => {
    if (!client.isNew) {
      setIsEditing(false);
    }
  }, [client.isNew]);

  const handleSave = useCallback(() => {
    const newBalance = parseInt(balanceRef.current.value) || 0;
    const newStatus = newBalance < 0 ? "blocked" : "active";

    const updates = [
      ["lastName", lastNameRef.current.value],
      ["firstName", firstNameRef.current.value],
      ["patronymic", patronymicRef.current.value],
      ["balance", newBalance],
      ["status", newStatus],
    ];

    updates.forEach(([field, value]) => {
      eventEmitter.emit("updateClient", client.id, field, value);
    });

    setIsEditing(false);
  }, [client.id]);

  const handleCancel = useCallback(() => {
    if (client.isNew) {
      eventEmitter.emit("deleteClient", client.id);
    } else {
      setIsEditing(false);
    }
  }, [client.id, client.isNew]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleDelete = useCallback(() => {
    eventEmitter.emit("deleteClient", client.id);
  }, [client.id]);

  console.log(`Рендерится: ${client.lastName}`);

  return (
    <div className="ClientRow">
      <div className="client-row">
        <div className="client-cell">
          <ClientEditField
            isEditing={isEditing}
            value={client.lastName}
            placeholder="Фамилия"
            inputRef={lastNameRef}
          />
        </div>

        <div className="client-cell">
          <ClientEditField
            isEditing={isEditing}
            value={client.firstName}
            placeholder="Имя"
            inputRef={firstNameRef}
          />
        </div>

        <div className="client-cell">
          <ClientEditField
            isEditing={isEditing}
            value={client.patronymic}
            placeholder="Отчество"
            inputRef={patronymicRef}
          />
        </div>

        <div className="client-cell">
          <ClientEditField
            isEditing={isEditing}
            value={client.balance}
            placeholder="0"
            type="number"
            inputRef={balanceRef}
          />
        </div>

        <div className="client-cell">
          <span className={`status ${client.status}`}>{client.status}</span>
        </div>

        <div className="client-cell">
          <ClientEditButtons
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            isNew={client.isNew}
          />
        </div>

        <div className="client-cell">
          <button onClick={handleDelete} className="delete-button">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
});

ClientRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    patronymic: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
  }).isRequired,
};

export default ClientRow;
