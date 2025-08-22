import React from "react";
import { connect } from "react-redux";
import { eventEmitter } from "../App";

import { loadCompanyData, addClient, deleteClient, updateClient } from "../store/clientsSlice";
import ClientFilter from "./ClientFilter";
import ClientTableHeader from "./ClientTableHeader";
import ClientRow from "./ClientRow";

import "./shared.css";
import "./ClientManager.css";

class ClientManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
    };
  }

  componentDidMount() {
    // Загружаем данные компании при монтировании компонента
    this.props.loadCompanyData();

    const handleAddClient = () => {
      const newId = this.props.clients.length > 0 
        ? Math.max(...this.props.clients.map((c) => c.id)) + 1 
        : 1;
      const newClient = {
        id: newId,
        lastName: "",
        firstName: "",
        patronymic: "",
        balance: 0,
        status: "active",
        isNew: true,
      };
      this.props.addClient(newClient);
    };

    const handleDeleteClient = (clientId) => {
      this.props.deleteClient(clientId);
    };

    const handleUpdateClient = (clientId, field, value) => {
      this.props.updateClient(clientId, field, value);
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
        return this.props.clients.filter(
          (client) => client.status === "active"
        );
      case "blocked":
        return this.props.clients.filter(
          (client) => client.status === "blocked"
        );
      default:
        return this.props.clients;
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

    const { companyName, loading, error } = this.props;
    const filteredClients = this.getFilteredClients();

    if (loading) {
      return <div className="ClientManager">Загрузка...</div>;
    }

    if (error) {
      return (
        <div className="ClientManager">
          <div>Ошибка загрузки: {error}</div>
          <button onClick={this.props.loadCompanyData}>Попробовать снова</button>
        </div>
      );
    }

    return (
      <div className="ClientManager">
        <div className="company-name">
          Компания &laquo;{companyName || "Загрузка..."}&raquo;
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

// Подключение к Redux store
const mapStateToProps = (state) => ({
  companyName: state.clients.companyName,
  clients: state.clients.clients,
  loading: state.clients.loading,
  error: state.clients.error,
});

const mapDispatchToProps = {
  loadCompanyData,
  addClient,
  deleteClient,
  updateClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientManager);
