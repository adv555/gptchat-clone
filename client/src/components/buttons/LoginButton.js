import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/chat",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button className="auth__button" onClick={handleLogin}>
      Log in
    </button>
  );
};

export default LoginButton;
