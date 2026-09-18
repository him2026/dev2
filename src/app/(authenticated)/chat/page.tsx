"use client";

import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Link from "next/link";

interface Message {
  id?: string | number;
  sender: "user" | "ai";
  message: string;
  created_at: Date | string;
}

const SUGGESTED_PROMPTS = [
  "How is my cycle today?",
  "What phase am I in?",
  "I have mild cramps",
  "Feeling a bit anxious today",
  "Give me a calming affirmation",
];

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
  const [cycleInfo, setCycleInfo] = useState({
    phase: "Follicular Phase",
    day: 7,
    daysUntil: 14,
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });

    // Load past conversation from Supabase
    async function loadHistory() {
      try {
        const res = await fetch("/api/chat/history");
        if (res.ok) {
          const data = await res.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }

    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (customText?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = (customText || input).trim();
    if (!textToSend) return;

    const userMessage: Message = {
      sender: "user",
      message: textToSend,
      created_at: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, mood }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.cyclePhase) {
          setCycleInfo({
            phase: data.cyclePhase,
            day: data.cycleDay || 7,
            daysUntil: data.daysUntil || 14,
          });
        }
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: data.reply || "I hear you and I'm right here with you. Take a deep, gentle breath.",
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
          message: "I'm listening, love. Take things one gentle step at a time today.",
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
    { id: "neutral", label: "Neutral", emoji: "😐" },
    { id: "happy", label: "Happy", emoji: "😊" },
    { id: "calm", label: "Calm", emoji: "😌" },
    { id: "tired", label: "Tired", emoji: "😴" },
    { id: "anxious", label: "Anxious", emoji: "😰" },
    { id: "sad", label: "Sad", emoji: "🥺" },
    { id: "angry", label: "Angry", emoji: "😤" },
  ];

  return (
    <div className="bg-chat">
      <div
        className="container"
        style={{
          paddingTop: "16px",
          paddingBottom: "24px",
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <div
          className="chat-card"
          data-aos="fade-up"
          data-aos-duration="600"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-card, #ffffff)",
            borderRadius: "24px",
            border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.2))",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <div
            className="chat-header"
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--border-light, rgba(255, 112, 150, 0.15))",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(255, 112, 150, 0.06), rgba(177, 156, 217, 0.08))",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                  boxShadow: "0 4px 12px rgba(236, 72, 153, 0.35)",
                }}
              >
                <i className="fa-solid fa-heart"></i>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "var(--text-primary)" }}>
                  HIM AI Companion
                </h3>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10B981",
                      display: "inline-block",
                    }}
                  ></span>
                  Context-Aware • {cycleInfo.phase} (Day {cycleInfo.day})
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Link
                href="/voice"
                className="btn btn-sm"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  fontWeight: 700,
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <i className="fa-solid fa-microphone-lines"></i> Switch to Voice
              </Link>
            </div>
          </div>

          {/* Mood Filter Pill Strip */}
          <div
            style={{
              padding: "10px 20px",
              background: "var(--bg-body, #f8fafc)",
              borderBottom: "1px solid var(--border-light, rgba(255, 112, 150, 0.1))",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              overflowX: "auto",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              Mood Context:
            </span>
            <div style={{ display: "flex", gap: "6px" }}>
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "16px",
                    border: mood === m.id ? "1.5px solid var(--color-primary)" : "1px solid var(--border-light)",
                    background: mood === m.id ? "var(--color-primary)" : "var(--bg-card, #ffffff)",
                    color: mood === m.id ? "white" : "var(--text-secondary)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="chat-messages"
            id="chatMessages"
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxHeight: "calc(100vh - 360px)",
              minHeight: "360px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble chat-bubble-${msg.sender}`}
                style={{
                  maxWidth: "75%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  className="bubble-content"
                  style={{
                    padding: "14px 18px",
                    borderRadius: msg.sender === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #EC4899, #8B5CF6)"
                        : "var(--bg-body, #f1f5f9)",
                    color: msg.sender === "user" ? "#ffffff" : "var(--text-primary, #1e293b)",
                    fontSize: "14px",
                    lineHeight: 1.55,
                    fontWeight: 500,
                    border: msg.sender === "user" ? "none" : "1px solid var(--border-light)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {msg.message}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    padding: "0 4px",
                  }}
                >
                  <span>{formatTime(msg.created_at)}</span>
                  {msg.sender === "ai" && (
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "2px 4px",
                        fontSize: "12px",
                      }}
                      title="Read aloud"
                      onClick={() => speakText(msg.message)}
                    >
                      <i className="fa-solid fa-volume-high"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator inside message list */}
            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  borderRadius: "18px",
                  background: "var(--bg-body, #f1f5f9)",
                  border: "1px solid var(--border-light)",
                  width: "fit-content",
                }}
              >
                <span className="live-dot-pulse" style={{ width: "7px", height: "7px" }}></span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-primary)" }}>
                  HIM is thinking...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div
            style={{
              padding: "8px 20px",
              background: "var(--bg-body, #f8fafc)",
              borderTop: "1px solid var(--border-light, rgba(255, 112, 150, 0.1))",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-muted)", alignSelf: "center" }}>
              Suggested:
            </span>
            {SUGGESTED_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "14px",
                  border: "1px solid var(--border-light, rgba(255, 112, 150, 0.25))",
                  background: "var(--bg-card, #ffffff)",
                  color: "var(--text-primary, #1e293b)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => handleSend(undefined, e)}
            style={{
              padding: "14px 20px",
              background: "var(--bg-card, #ffffff)",
              borderTop: "1px solid var(--border-light, rgba(255, 112, 150, 0.15))",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <input
              type="text"
              placeholder="Ask HIM anything (cycle, mood, symptoms, advice)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "12px 18px",
                borderRadius: "24px",
                border: "1.5px solid var(--border-light, rgba(255, 112, 150, 0.25))",
                background: "var(--bg-body, #f8fafc)",
                color: "var(--text-primary)",
                fontSize: "14px",
                outline: "none",
                fontWeight: 500,
              }}
              autoFocus
            />

            <Link
              href="/voice"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                textDecoration: "none",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
              title="Voice Assistant"
            >
              <i className="fa-solid fa-microphone"></i>
            </Link>

            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #EC4899, #8B5CF6)",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                cursor: !input.trim() || isTyping ? "not-allowed" : "pointer",
                opacity: !input.trim() || isTyping ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(236, 72, 153, 0.35)",
                transition: "transform 0.2s ease",
              }}
              aria-label="Send message"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
