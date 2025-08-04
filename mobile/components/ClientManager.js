import React from "react";
import PropTypes from "prop-types";
import { eventEmitter } from "../App";

import ClientFilter from "./ClientFilter";
import ClientTableHeader from "./ClientTableHeader";
import ClientRow from "./ClientRow";

import "./shared.css";
import "./ClientManager.css";

class ClientManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clients: [...props.clients],
      filter: "all",
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        patronymic: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      })
    ),
  };

  componentDidMount() {
    const handleAddClient = () => {
      const newId = Math.max(...this.state.clients.map((c) => c.id)) + 1;
      const newClient = {
        id: newId,
        lastName: "",
        firstName: "",
        patronymic: "",
        balance: 0,
        status: "active",
        isNew: true,
      };
      this.setState((prevState) => ({
        clients: [...prevState.clients, newClient],
      }));
    };

    const handleDeleteClient = (clientId) => {
      this.setState((prevState) => ({
        clients: prevState.clients.filter((client) => client.id !== clientId),
      }));
    };

    const handleUpdateClient = (clientId, field, value) => {
      this.setState((prevState) => ({
        clients: prevState.clients.map((client) =>
          client.id === clientId
            ? { ...client, [field]: value, isNew: false }
            : client
        ),
      }));
    };

    eventEmitter.on("addClient", handleAddClient);
    eventEmitter.on("deleteClient", handleDeleteClient);
    eventEmitter.on("updateClient", handleUpdateClient);

    this.cleanup = () => {
      eventEmitter.off("addClient", handleAddClient);
      eventEmitter.off("deleteClient", handleDeleteClient);
      eventEmitter.off("updateClient", handleUpdateClient);
    };
  }

  componentWillUnmount() {
    if (this.cleanup) {
      this.cleanup();
    }
  }

  getFilteredClients = () => {
    switch (this.state.filter) {
      case "active":
        return this.state.clients.filter(
          (client) => client.status === "active"
        );
      case "blocked":
        return this.state.clients.filter(
          (client) => client.status === "blocked"
        );
      default:
        return this.state.clients;
    }
  };

  handleAddClient = () => {
    eventEmitter.emit("addClient");
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    console.log("Мобильная компания рендерится");

    const filteredClients = this.getFilteredClients();

    return (
      <div className="ClientManager">
        <div className="company-name">
          Компания &laquo;{this.props.name}&raquo;
        </div>

        <ClientFilter
          currentFilter={this.state.filter}
          onFilterChange={this.setFilter}
        />

        <div className="client-list">
          <ClientTableHeader />
          {filteredClients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </div>

        <div className="add-client-section">
          <button onClick={this.handleAddClient}>Добавить клиента</button>
        </div>
      </div>
    );
  }
}

export default ClientManager;
