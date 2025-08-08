import React, { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { eventEmitter } from "../App";

import ClientFilter from "./ClientFilter";
import ClientTableHeader from "./ClientTableHeader";
import ClientRow from "./ClientRow";

import "./shared.css";
import "./ClientManager.css";

const ClientManager = memo(({ name, clients: initialClients }) => {
  const [clients, setClients] = useState([...initialClients]);
  const [filter, setFilter] = useState("all");

  const getFilteredClients = useCallback(() => {
    switch (filter) {
      case "active":
        return clients.filter((client) => client.status === "active");
      case "blocked":
        return clients.filter((client) => client.status === "blocked");
      default:
        return clients;
    }
  }, [clients, filter]);

  const handleAddClient = useCallback(() => {
    const newId = Math.max(...clients.map((c) => c.id)) + 1;
    const newClient = {
      id: newId,
      lastName: "",
      firstName: "",
      patronymic: "",
      balance: 0,
      status: "active",
      isNew: true,
    };
    setClients((prevClients) => [...prevClients, newClient]);
  }, [clients]);

  const handleDeleteClient = useCallback((clientId) => {
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== clientId)
    );
  }, []);

  const handleUpdateClient = useCallback((clientId, field, value) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? { ...client, [field]: value, isNew: false }
          : client
      )
    );
  }, []);

  useEffect(() => {
    eventEmitter.on("addClient", handleAddClient);
    eventEmitter.on("deleteClient", handleDeleteClient);
    eventEmitter.on("updateClient", handleUpdateClient);

    return () => {
      eventEmitter.off("addClient", handleAddClient);
      eventEmitter.off("deleteClient", handleDeleteClient);
      eventEmitter.off("updateClient", handleUpdateClient);
    };
  }, [handleAddClient, handleDeleteClient, handleUpdateClient]);

  const handleAddClientClick = useCallback(() => {
    eventEmitter.emit("addClient");
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  console.log("Мобильная компания рендерится");

  const filteredClients = getFilteredClients();

  return (
    <div className="ClientManager">
      <div className="company-name">Компания &laquo;{name}&raquo;</div>

      <ClientFilter
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="client-list">
        <ClientTableHeader />
        {filteredClients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </div>

      <div className="add-client-section">
        <button onClick={handleAddClientClick}>Добавить клиента</button>
      </div>
    </div>
  );
});

ClientManager.propTypes = {
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

export default ClientManager;
