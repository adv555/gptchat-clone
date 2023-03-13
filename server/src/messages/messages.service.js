const { openai } = require("../config/ai-config");

const getPublicMessage = () => {
  return {
    text: "This is a public message.",
  };
};

const getProtectedMessage = () => {
  return {
    text: "This is a protected message.",
  };
};

const getAdminMessage = () => {
  return {
    text: "This is an admin message.",
  };
};

const getDavinciMessage = (cleanPrompt) => {
  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "you're an a AI assistant that replies to all my questions in markdown format.",
      },
      { role: "user", content: "hi" },
      { role: "assistant", content: "Hi! How can I help you?" },
      { role: "user", content: `${cleanPrompt}?` },
    ],
    temperature: 0.5,
    max_tokens: 500,
    top_p: 0.5,
    frequency_penalty: 0.5,
    presence_penalty: 0.2,
  });
};

const getDalleMessage = (prompt) => {
  return openai.createImage({
    prompt: `${prompt}`,
    n: 1,
    size: "256x256",
  });
};

module.exports = {
  getPublicMessage,
  getProtectedMessage,
  getAdminMessage,
  getDavinciMessage,
  getDalleMessage,
};
