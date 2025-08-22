import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eventEmitter } from "../App";
import {
  loadCompanyData,
  addNewClient,
  deleteClient,
  updateClient,
} from "../store/clientsSlice";

import ClientFilter from "./ClientFilter";
import ClientTableHeader from "./ClientTableHeader";
import ClientRow from "./ClientRow";

import "./shared.css";
import "./ClientManager.css";

const ClientManager = memo(() => {
  const dispatch = useDispatch();
  const { companyName, clients, loading, error } = useSelector(
    (state) => state.clients
  );
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
    dispatch(addNewClient());
  }, [dispatch]);

  const handleDeleteClient = useCallback(
    (clientId) => {
      dispatch(deleteClient(clientId));
    },
    [dispatch]
  );

  const handleUpdateClient = useCallback(
    (clientId, field, value) => {
      dispatch(updateClient(clientId, field, value));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(loadCompanyData());
  }, [dispatch]);

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

  if (loading) {
    return (
      <div className="ClientManager">
        <div className="loading">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ClientManager">
        <div className="error">Ошибка загрузки данных: {error}</div>
      </div>
    );
  }

  return (
    <div className="ClientManager">
      <div className="company-name">Компания &laquo;{companyName}&raquo;</div>

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

export default ClientManager;
