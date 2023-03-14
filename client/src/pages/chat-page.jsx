import React from "react";
import { SideBar } from "components/sideBar";
import ChatView from "components/chat/ChatView";

const ChatPage = () => {
  return (
    <div>
      <SideBar />
      <ChatView />
    </div>
  );
};

export default ChatPage;
