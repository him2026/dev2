"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AOS from "aos";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "ai",
      message: "Hello! I am HIM, your personal wellness companion. How are you feeling today?",
      created_at: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("neutral");
  const [isTyping, setIsTyping] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const newMsg = { sender: "user", message: userText, created_at: new Date() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, mood }),
      });
      const data = await res.json();
      
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: data.reply, created_at: new Date() },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: "I am always here for you. Take a warm cup of water and rest your mind.", created_at: new Date() },
      ]);
    }
  };

  const phaseInfo = {
    name: "Follicular Phase",
    color: "#10B981",
    icon: "fa-leaf",
  };

  return (
    <div className="bg-chat">
      <div className="container" style={{ paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "center", maxWidth: "100%", height: "calc(100vh - 80px)" }}>
        
        <div className="chat-container" data-aos="zoom-in-up" data-aos-duration="600" style={{ background: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.8)", boxShadow: "0 15px 50px rgba(0,0,0,0.1)", borderRadius: "24px", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          
          {/* Chat Header */}
          <div className="chat-header" style={{ background: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.6)", borderRadius: "24px 24px 0 0", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="chat-header-info" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="chat-avatar" style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--color-primary, #6366f1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}><i className="fa-solid fa-robot"></i></div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>HIM AI Companion</h3>
                <span className="chat-status" style={{ color: phaseInfo.color, fontSize: "0.85rem" }}>
                  <i className={`fa-solid ${phaseInfo.icon}`}></i> {phaseInfo.name}
                </span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="btn btn-sm btn-outline" onClick={() => setHistoryOpen(!historyOpen)} title="View past chats" style={{ marginRight: "8px" }}>
                <i className="fa-solid fa-clock-rotate-left"></i> History
              </button>
              <button className="btn btn-sm btn-outline" title="Start new chat" onClick={() => setMessages([{ sender: "ai", message: "Starting a fresh session! How can I assist you right now?", created_at: new Date() }])}>
                <i className="fa-solid fa-plus"></i> New Chat
              </button>
            </div>
          </div>
          
          {/* Mood Selector */}
          <div className="chat-mood-bar" style={{ padding: "12px 24px", background: "rgba(255,255,255,0.2)", borderBottom: "1px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span className="mood-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Current Mood:</span>
            <div className="mood-options" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["neutral", "happy", "sad", "anxious", "angry", "tired", "calm"].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`mood-chip ${mood === m ? "active" : ""}`}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    border: mood === m ? "2px solid #6366f1" : "1px solid #ccc",
                    background: mood === m ? "#6366f1" : "transparent",
                    color: mood === m ? "#fff" : "#333",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    transition: "all 0.2s"
                  }}
                  onClick={() => setMood(m)}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  padding: "12px 18px",
                  borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.sender === "user" ? "#6366f1" : "rgba(255, 255, 255, 0.9)",
                  color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  lineHeight: "1.5",
                  fontSize: "0.95rem"
                }}
              >
                {msg.message}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: "flex-start", padding: "8px 16px", background: "rgba(255,255,255,0.8)", borderRadius: "16px" }}>
                <em>HIM is typing...</em>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} style={{ padding: "16px 24px", background: "rgba(255,255,255,0.4)", borderTop: "1px solid rgba(255,255,255,0.6)", borderRadius: "0 0 24px 24px", display: "flex", gap: "12px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask HIM anything or share your thoughts..."
              style={{ flex: 1, padding: "12px 18px", borderRadius: "24px", border: "1px solid #ccc", outline: "none", fontSize: "0.95rem" }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px", borderRadius: "24px" }}>
              <i className="fa-solid fa-paper-plane"></i> Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
