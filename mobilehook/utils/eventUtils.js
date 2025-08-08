import { eventEmitter } from "../App";

export const emitAddClient = () => {
  eventEmitter.emit("addClient");
};

export const emitDeleteClient = (clientId) => {
  eventEmitter.emit("deleteClient", clientId);
};

export const emitUpdateClient = (clientId, field, value) => {
  eventEmitter.emit("updateClient", clientId, field, value);
};
