import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider
    theme={{
      fontFamily: "Inter, sans-serif",
      primaryColor: "blue",
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <Notifications position="top-right" zIndex={2077} />
    <App />
  </MantineProvider>,
);
