import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./Contexts/AuthContext";
import LoadProvider from "./Contexts/LoadContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LoadProvider>
        <App />
      </LoadProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
