import React from "react";
import { Link } from "react-router-dom";

const styles = {
  nav: "flex p-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white text-sm flex-shrink-0 border border-white/20 cursor-pointer",
  chat: "flex items-center gap-3 p-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm",
};

export const NavLink = ({ to = "#", icon, text, type }) => {
  return (
    <Link to={to} className={type === "nav" ? styles.nav : styles.chat}>
      {icon || null}
      {text}
    </Link>
  );
};
