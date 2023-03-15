import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { ChatContextProvider } from "./context/chatContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
