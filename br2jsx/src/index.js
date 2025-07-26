import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import BR2JSX from "./Br2jsx";

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <React.StrictMode>
    <BR2JSX text="первая строка<br>вторая строка<br/>третья строка<br />четвертая строка" />
  </React.StrictMode>
);
