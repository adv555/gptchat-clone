import React, { createContext, useState, useMemo } from "react";
import { useMessageCollection } from "../hooks/useMessageCollection";

const ChatContext = createContext({});

const ChatContextProvider = (props) => {
  const [messages, addMessage, clearMessages] = useMessageCollection();
  const [limit, setLimit] = useState(-1);

  const value = useMemo(
    () => [messages, addMessage, clearMessages, limit, setLimit],
    [messages, addMessage, clearMessages, limit, setLimit]
  );

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
