import { useState } from "react";

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */

const useMessageCollection = () => {
  const [messages, setMessages] = useState([]);

  /**
   * A function for adding a new message to the collection.
   *
   * @param {Object} message - The message to add to the collection.
   */

  const addMessage = (message) => setMessages((prev) => [...prev, message]);

  const clearMessages = () => setMessages([]);

  return [messages, addMessage, clearMessages];
};

export default useMessageCollection;
