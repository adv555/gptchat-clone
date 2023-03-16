import React, { useContext } from "react";
import { NavLink } from "./NavLink";
import { ChatContext } from "../../context/chatContext";
import { LogoutButton, ThemeToggleButton } from "../buttons";
import { ReactComponent as PlusIcon } from "../../assets/plus-icon.svg";
import { ReactComponent as DiscordIcon } from "../../assets/discord-icon.svg";
import { ReactComponent as ExternalLinkIcon } from "../../assets/external-link-icon.svg";

const menu = [
  { to: "#", icon: <DiscordIcon />, text: "OpenAI Discord" },
  { to: "#", icon: <ExternalLinkIcon />, text: "Update & FAQ" },
];

const Navigation = () => {
  const [, , clearMessages, limit] = useContext(ChatContext);

  const clearChat = () => clearMessages();

  return (
    <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
      <div
        className="flex-col flex-1 overflow-y-auto border-b border-white/20"
        onClick={clearChat}
      >
        <NavLink to="#" icon={<PlusIcon />} text="New chat" type={"nav"} />

        <div className="flex flex-col gap-2 text-gray-100 text-sm">
          {/* {["chat 1", "chat 2"].map((item, idx) => (
            <NavLink key={idx} to="#" icon="" text={item} type={"chat"} />
          ))} */}
          {limit >= 0 && (
            <p className="flex items-center m-5 p-5 border rounded-2xl bg-lightYellow text-red-700 font-mono text-center cursor-pointer ">
              you have {limit} requests left today.
            </p>
          )}
        </div>
      </div>
      <ThemeToggleButton />
      {menu.map((link) => (
        <NavLink type={"nav"} key={link.text} {...link} />
      ))}
      <LogoutButton />
    </nav>
  );
};

export default Navigation;
