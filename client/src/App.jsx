import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { PageLoader, AuthenticationGuard } from "./components";
import {
  AuthPage,
  ErrorPage,
  CallbackPage,
  NotFoundPage,
  ChatPage,
} from "./pages";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} errorElement={<ErrorPage />} />

      <Route
        path="/chat"
        element={<AuthenticationGuard component={ChatPage} />}
        errorElement={<ErrorPage />}
      />

      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
