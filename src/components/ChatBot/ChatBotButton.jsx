import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-info chatbot-btn shadow"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-chat-dots-fill"></i>
      </button>

      {open && <ChatWindow close={() => setOpen(false)} />}
    </>
  );
};

export default ChatBotButton;
