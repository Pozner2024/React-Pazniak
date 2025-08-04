import React from "react";
import ReactDOM from "react-dom";
import { EventEmitter } from "events";

import ClientManager from "./components/ClientManager";
import clientsData from "./client.json";

export const eventEmitter = new EventEmitter();

let companyName = "A1";

ReactDOM.render(
  <ClientManager name={companyName} clients={clientsData} />,
  document.getElementById("container")
);
