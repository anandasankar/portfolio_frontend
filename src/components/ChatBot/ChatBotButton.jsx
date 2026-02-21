import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chatbot.css";

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);

  const playClick = () => {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(open ? 400 : 520, ac.currentTime);
      gain.gain.setValueAtTime(0.1, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.12);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  const toggle = () => {
    playClick();
    setOpen((o) => !o);
  };

  return (
    <>
      <button
        className="chatbot-btn"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {open && (
        <ChatWindow
          close={() => {
            playClick();
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ChatBotButton;
