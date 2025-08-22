import React from "react";
import PropTypes from "prop-types";
import { eventEmitter } from "../App";

import ClientEditField from "./ClientEditField";
import ClientEditButtons from "./ClientEditButtons";

import "./shared.css";
import "./ClientRow.css";

class ClientRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.lastNameRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.patronymicRef = React.createRef();
    this.balanceRef = React.createRef();

    this.state = {
      isEditing: props.client.isNew || false,
    };
  }

  static propTypes = {
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

  componentDidUpdate(prevProps) {
    if (prevProps.client !== this.props.client && !this.props.client.isNew) {
      this.setState({ isEditing: false });
    }
  }

  handleSave = () => {
    const newBalance = parseInt(this.balanceRef.current.value) || 0;
    const newStatus = newBalance < 0 ? "blocked" : "active";

    const updates = [
      ["lastName", this.lastNameRef.current.value],
      ["firstName", this.firstNameRef.current.value],
      ["patronymic", this.patronymicRef.current.value],
      ["balance", newBalance],
      ["status", newStatus],
    ];

    updates.forEach(([field, value]) => {
      eventEmitter.emit("updateClient", this.props.client.id, field, value);
    });

    this.setState({ isEditing: false });
  };

  handleCancel = () => {
    if (this.props.client.isNew) {
      eventEmitter.emit("deleteClient", this.props.client.id);
    } else {
      this.setState({ isEditing: false });
    }
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleDelete = () => {
    eventEmitter.emit("deleteClient", this.props.client.id);
  };

  render() {
    const { client } = this.props;
    const { isEditing } = this.state;

    console.log(`Рендерится: ${client.lastName}`);

    return (
      <div className="ClientRow">
        <div className="client-row">
          <div className="client-cell">
            <ClientEditField
              isEditing={isEditing}
              value={client.lastName}
              placeholder="Фамилия"
              inputRef={this.lastNameRef}
            />
          </div>

          <div className="client-cell">
            <ClientEditField
              isEditing={isEditing}
              value={client.firstName}
              placeholder="Имя"
              inputRef={this.firstNameRef}
            />
          </div>

          <div className="client-cell">
            <ClientEditField
              isEditing={isEditing}
              value={client.patronymic}
              placeholder="Отчество"
              inputRef={this.patronymicRef}
            />
          </div>

          <div className="client-cell">
            <ClientEditField
              isEditing={isEditing}
              value={client.balance}
              placeholder="0"
              type="number"
              inputRef={this.balanceRef}
            />
          </div>

          <div className="client-cell">
            <span className={`status ${client.status}`}>{client.status}</span>
          </div>

          <div className="client-cell">
            <ClientEditButtons
              isEditing={isEditing}
              onEdit={this.handleEdit}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
              isNew={client.isNew}
            />
          </div>

          <div className="client-cell">
            <button onClick={this.handleDelete} className="delete-button">
              Удалить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientRow;
