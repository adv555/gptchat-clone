import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactComponent as LogOutIcon } from "../../assets/logout-icon.svg";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="logout__button" onClick={handleLogout}>
      <LogOutIcon />
      Log out
    </button>
  );
};

export default LogoutButton;
