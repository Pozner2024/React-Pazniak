import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { EventEmitter } from "events";

import store from "./store";
import ClientManager from "./components/ClientManager";

export const eventEmitter = new EventEmitter();

ReactDOM.render(
  <Provider store={store}>
    <ClientManager />
  </Provider>,
  document.getElementById("container")
);
