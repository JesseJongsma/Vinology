import React from "react";
import ReactDOM from "react-dom/client";
import { defineCustomElements as jeepSqlite } from "jeep-sqlite/loader";
import App from "./App";
import "./index.css";

jeepSqlite(window);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);