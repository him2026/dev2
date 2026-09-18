"use client";

import { useState, useEffect, useRef } from "react";
import AOS from "aos";

interface Message {
  id?: string;
  sender: "user" | "ai";
  message: string;
  created_at: Date | string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      message: "Hi! I'm HIM, your wellness companion. How are you feeling today? I'm here to listen, comfort, and support you.",
      created_at: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("neutral");
  const [isTyping, setIsTyping] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pastSessions, setPastSessions] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const phaseInfo = {
    name: "Follicular Phase",
    color: "#10B981",
    icon: "fa-leaf",
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      sender: "user",
      message: trimmed,
      created_at: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, mood }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: data.reply || "I hear you and I'm right here with you. Take a deep breath.",
            created_at: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: "I am always here for you. Take a warm cup of water and rest your mind.",
            created_at: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "I'm listening. Take things one gentle step at a time today.",
          created_at: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const moods = [
    { id: "neutral", label: "Neutral" },
    { id: "happy", label: "Happy" },
    { id: "sad", label: "Sad" },
    { id: "anxious", label: "Anxious" },
    { id: "angry", label: "Angry" },
    { id: "tired", label: "Tired" },
    { id: "calm", label: "Calm" },
  ];

  return (
    <div className="bg-chat">
      <div
        className="container"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "center",
          maxWidth: "100%",
          height: "calc(100vh - 80px)",
        }}
      >
        <div
          className="chat-container"
          data-aos="zoom-in-up"
          data-aos-duration="600"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
            borderRadius: "24px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Chat Header */}
          <div
            className="chat-header"
            style={{
              background: "rgba(255,255,255,0.4)",
              borderBottom: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "24px 24px 0 0",
            }}
          >
            <div className="chat-header-info">
              <div className="chat-avatar">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h3 className="text-reveal">
                  <span>HIM Chat</span>
                </h3>
                <span className="chat-status" style={{ color: phaseInfo.color }}>
                  <i className={`fa-solid ${phaseInfo.icon}`}></i> {phaseInfo.name}
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <button
                type="button"
                className="btn btn-sm btn-outline"
                id="historyBtn"
                onClick={() => setHistoryOpen(true)}
                title="View past chats"
                style={{ marginRight: "8px" }}
              >
                <i className="fa-solid fa-clock-rotate-left"></i> History
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                id="newChatBtn"
                onClick={() =>
                  setMessages([
                    {
                      sender: "ai",
                      message: "Starting a fresh session! How can I support you right now?",
                      created_at: new Date(),
                    },
                  ])
                }
                title="Start new chat"
              >
                <i className="fa-solid fa-plus"></i> New Chat
              </button>
            </div>
          </div>

          {/* Mood Selector */}
          <div className="chat-mood-bar" id="moodBar">
            <span className="mood-label">How are you feeling?</span>
            <div className="mood-options">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood-chip ${mood === m.id ? "active" : ""}`}
                  onClick={() => setMood(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="typing-indicator" style={{ padding: "10px 24px" }}>
              <span className="typing-dot" style={{ background: "var(--color-primary)" }}></span>
              <span className="typing-dot" style={{ background: "var(--color-primary)" }}></span>
              <span className="typing-dot" style={{ background: "var(--color-primary)" }}></span>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages" id="chatMessages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble chat-bubble-${msg.sender}`}>
                <div className="bubble-content">{msg.message}</div>
                <span className="bubble-time">{formatTime(msg.created_at)}</span>
                {msg.sender === "ai" && (
                  <button
                    type="button"
                    className="tts-btn"
                    title="Read aloud"
                    onClick={() => speakText(msg.message)}
                  >
                    <i className="fa-solid fa-volume-up"></i>
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="chat-input-area"
            style={{
              background: "rgba(255,255,255,0.4)",
              borderTop: "1px solid rgba(255,255,255,0.6)",
              borderRadius: "0 0 24px 24px",
            }}
          >
            <form id="chatForm" onSubmit={handleSend} autoComplete="off">
              <div className="chat-input-wrapper">
                <textarea
                  className="chat-input"
                  id="chatInput"
                  placeholder="Type a message..."
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                ></textarea>
                <button
                  type="button"
                  className="chat-send-btn"
                  id="chatMicBtn"
                  style={{
                    background: "white",
                    color: "var(--color-primary)",
                    border: "2px solid var(--border-light)",
                    marginRight: "2px",
                  }}
                  title="Voice Call"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = "/voice";
                    }
                  }}
                >
                  <i className="fa-solid fa-microphone" id="chatMicIcon"></i>
                </button>
                <button
                  type="submit"
                  className="chat-send-btn"
                  id="sendBtn"
                  aria-label="Send message"
                  disabled={!input.trim()}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Chat History Modal */}
      {historyOpen && (
        <div className="modal-overlay" style={{ display: "flex" }}>
          <div className="modal-content history-modal-content">
            <div className="modal-header">
              <h3>
                <i className="fa-solid fa-clock-rotate-left"></i> Chat History
              </h3>
              <button
                type="button"
                className="close-modal"
                id="closeHistoryBtn"
                onClick={() => setHistoryOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body" id="historyList">
              <div className="session-list">
                <div className="session-item active-session">
                  <div className="session-item-header">
                    <span className="session-title">Current Conversation</span>
                    <span className="session-date">Today</span>
                  </div>
                  <div className="session-item-footer">
                    <span className="session-phase">Follicular Phase</span>
                    <span className="session-status active">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
