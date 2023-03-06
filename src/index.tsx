import { App } from "app";
import React from "react";
import ReactDOM from "react-dom/client";
import "stytes/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
