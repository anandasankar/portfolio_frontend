import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";

// Sound synthesis using Web Audio API — no external files needed
const useSound = () => {
  const ctx = useRef(null);

  const getCtx = () => {
    if (!ctx.current)
      ctx.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctx.current;
  };

  const playTone = (freq, type, duration, gainVal = 0.15, fadeOut = true) => {
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      gain.gain.setValueAtTime(gainVal, ac.currentTime);
      if (fadeOut)
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ac.currentTime + duration,
        );
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  return {
    // Soft "send" pop — two quick tones
    playSend: () => {
      playTone(600, "sine", 0.08, 0.12);
      setTimeout(() => playTone(900, "sine", 0.1, 0.08), 60);
    },
    // Gentle "receive" chime — descending
    playReceive: () => {
      playTone(880, "sine", 0.12, 0.1);
      setTimeout(() => playTone(660, "sine", 0.15, 0.1), 80);
      setTimeout(() => playTone(550, "sine", 0.18, 0.08), 160);
    },
    // Subtle open/close click
    playOpen: () => playTone(440, "sine", 0.1, 0.08),
  };
};

const Avatar = () => (
  <div className="bot-avatar">
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="url(#avatarGrad)" />
      <circle cx="13" cy="16" r="2.5" fill="white" opacity="0.9" />
      <circle cx="23" cy="16" r="2.5" fill="white" opacity="0.9" />
      <path
        d="M12 23 Q18 27 24 23"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="avatarGrad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const TypingDots = () => (
  <div className="typing-dots">
    <span />
    <span />
    <span />
  </div>
);

const ChatWindow = ({ close }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm Ananda's assistant. Ask me anything about him!",
      id: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const sound = useSound();
  const msgId = useRef(1);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    if (!isMinimized) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isMinimized]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = {
      sender: "user",
      text: message.trim(),
      id: msgId.current++,
    };
    const currentMessage = message.trim();

    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);
    sound.playSend();

    try {
      const history = chat.slice(1).map((c) => ({
        role: c.sender === "user" ? "user" : "model",
        parts: [{ text: c.text }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage, history }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Error ${response.status}`);
      }

      const data = await response.json();
      sound.playReceive();
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, id: msgId.current++ },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `⚠️ ${err.message}`,
          id: msgId.current++,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    sound.playOpen();
    close();
  };

  const handleMinimize = () => {
    sound.playOpen();
    setIsMinimized((m) => !m);
  };

  return (
    <div className={`chatbot-window ${isMinimized ? "minimized" : ""}`}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="header-left">
          <Avatar />
          <div className="header-info">
            <span className="header-name">Ananda's Assistant</span>
            <span className="header-status">
              <span className="status-dot" />
              Online
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={handleMinimize}
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <line x1="3" y1="21" x2="14" y2="10" />
              </svg>
            )}
          </button>
          <button
            className="icon-btn close-btn"
            onClick={handleClose}
            title="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
          <div className="chatbot-body">
            <div className="chat-date-label">Today</div>

            {chat.map((c) => (
              <div
                key={c.id}
                className={`msg-row ${c.sender === "user" ? "msg-user" : "msg-bot"}`}
              >
                {c.sender === "bot" && <Avatar />}
                <div
                  className={`chat-bubble ${c.sender === "user" ? "bubble-user" : "bubble-bot"} ${c.isError ? "bubble-error" : ""}`}
                >
                  {c.text}
                  <span className="bubble-time">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-row msg-bot">
                <Avatar />
                <div className="chat-bubble bubble-bot bubble-typing">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer */}
          <div className="chatbot-footer">
            <div className="input-row">
              <input
                ref={inputRef}
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about Ananda..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={loading}
                maxLength={500}
              />
              <button
                className={`send-btn ${message.trim() && !loading ? "active" : ""}`}
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                aria-label="Send message"
              >
                {loading ? (
                  <span className="send-spinner" />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
