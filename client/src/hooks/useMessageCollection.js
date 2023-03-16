import { useState } from "react";

export const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => setMessages((prev) => [...prev, message]);

  const clearMessages = () => setMessages([]);

  return [messages, addMessage, clearMessages];
};
