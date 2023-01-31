import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from '@mui/material'
import App from "./App";
import "./index.css";
import Theme from "./utils/Theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);