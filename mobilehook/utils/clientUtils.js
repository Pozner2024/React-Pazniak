export const createNewClient = (existingClients) => {
  const newId = Math.max(...existingClients.map((c) => c.id)) + 1;
  return {
    id: newId,
    lastName: "",
    firstName: "",
    patronymic: "",
    balance: 0,
    status: "active",
    isNew: true,
  };
};

export const calculateClientStatus = (balance) => {
  return balance < 0 ? "blocked" : "active";
};

export const filterClients = (clients, filter) => {
  switch (filter) {
    case "active":
      return clients.filter((client) => client.status === "active");
    case "blocked":
      return clients.filter((client) => client.status === "blocked");
    default:
      return clients;
  }
};

export const updateClientInList = (clients, clientId, field, value) => {
  return clients.map((client) =>
    client.id === clientId
      ? { ...client, [field]: value, isNew: false }
      : client
  );
};

export const removeClientFromList = (clients, clientId) => {
  return clients.filter((client) => client.id !== clientId);
};
