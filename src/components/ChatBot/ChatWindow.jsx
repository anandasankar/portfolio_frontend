import React, { useState } from "react";
import "./chatbot.css";

const ChatWindow = ({ close }) => {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm Ananda's assistant. Ask me anything about him.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",

      text: message,
    };

    setChat((prev) => [...prev, userMsg]);

    setMessage("");

    setLoading(true);

    // Fake bot reply (UI testing)

    setTimeout(() => {
      const botMsg = {
        sender: "bot",

        text: "This is a demo reply. Backend will be connected soon.",
      };

      setChat((prev) => [...prev, botMsg]);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="card chatbot-window shadow">
      {/* Header */}

      <div className="card-header d-flex justify-content-between align-items-center chatbot-header">
        <span>Chat with Ananda</span>

        <button className="btn btn-sm btn-light" onClick={close}>
          ✕
        </button>
      </div>

      {/* Body */}

      <div className="card-body chatbot-body">
        {chat.map((c, i) => (
          <div
            key={i}
            className={`mb-2 d-flex ${
              c.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                c.sender === "user"
                  ? "bg-info text-white"
                  : "bg-light text-dark"
              }`}
            >
              {c.text}
            </div>
          </div>
        ))}

        {loading && <small className="text-muted">typing...</small>}
      </div>

      {/* Footer */}

      <div className="card-footer">
        <div className="input-group">
          <input
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about Ananda..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button className="btn btn-info" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
