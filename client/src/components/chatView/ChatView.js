import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ChatContext } from "../../context/chatContext";
import { sendMessageToBot } from "../../services/message.service";
import { MainSection } from "..";
import { ChatIntro } from "./ChatIntro";
import { ChatMessages } from "./ChatMessages";
import { ChatForm } from "./ChatForm";

const ChatView = () => {
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, addMessage, , , setLimit] = useContext(ChatContext);

  const options = [
    { value: "ChatGPT", label: "ChatGPT" },
    { value: "DALL·E", label: "DALL·E" },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const { user, getAccessTokenSilently } = useAuth0();

  const picUrl = user?.picture || "https://via.placeholder.com/150";
  const user_id = user?.sub.split("|")[1] || "123456789";

  const updateMessage = (formValue, ai, aiModel) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: formValue,
      ai: ai,
      selected: `${aiModel}`,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue) {
      return;
    }

    updateMessage(formValue, false, selected);
    setFormValue("");
    setThinking(true);

    const aiModel = selected === options[0].value ? "davinci" : "dalle";

    const accessToken = await getAccessTokenSilently();

    const { data, error } = await sendMessageToBot(accessToken, {
      prompt: formValue,
      user: user_id,
      aiModel: aiModel,
    });

    if (error && error.status === 429) {
      const message = "You have reached the limit for today.";
      setLimit(0);
      updateMessage(message, true, aiModel);
      setThinking(false);
      return;
    }

    if (error) {
      const message = "Something went wrong. Please try again later.";
      alert(`openAI is returning an error: ${error.message}`);
      updateMessage(message, true, aiModel);
      setThinking(false);
      return;
    }

    const message = data?.bot;
    updateMessage(message, true, aiModel);
    setLimit(data.limit);

    setThinking(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <MainSection>
      {messages.length === 0 ? (
        <ChatIntro title={"GPT Chat"} setTemplateQuestion={setFormValue} />
      ) : (
        <ChatMessages messages={messages} thinking={thinking} picUrl={picUrl} />
      )}

      <ChatForm
        inputRef={inputRef}
        formValue={formValue}
        setFormValue={setFormValue}
        sendMessage={sendMessage}
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </MainSection>
  );
};

export default ChatView;
