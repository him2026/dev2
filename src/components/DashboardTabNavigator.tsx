"use client";

import { useState } from "react";
import Link from "next/link";

interface FeatureItem {
  id: string;
  title: string;
  category: "ai" | "cycle" | "social" | "insights";
  description: string;
  href: string;
  icon: string;
  badge?: string;
  badgeType?: "ai" | "live" | "hot" | "new";
  colorGradient: string;
  accentColor: string;
  isFlagship?: boolean;
}

const ALL_FEATURES: FeatureItem[] = [
  {
    id: "voice",
    title: "Voice Assistant",
    category: "ai",
    description: "Hands-free, real-time voice calls & comforting audio guidance with HIM.",
    href: "/voice",
    icon: "fa-microphone-lines",
    badge: "LIVE VOICE",
    badgeType: "live",
    colorGradient: "linear-gradient(135deg, #10B981, #06B6D4)",
    accentColor: "#10B981",
    isFlagship: true,
  },
  {
    id: "chat",
    title: "HIM AI Chat",
    category: "ai",
    description: "24/7 empathetic conversational companion tuned to your cycle & mood.",
    href: "/chat",
    icon: "fa-sparkles",
    badge: "AI 24/7",
    badgeType: "ai",
    colorGradient: "linear-gradient(135deg, #EC4899, #8B5CF6)",
    accentColor: "#EC4899",
    isFlagship: true,
  },
  {
    id: "cycle-tracker",
    title: "Cycle Tracker",
    category: "cycle",
    description: "Interactive period calendar, phase timeline, and ovulation predictions.",
    href: "/cycle-tracker",
    icon: "fa-calendar-days",
    badge: "ESSENTIAL",
    badgeType: "hot",
    colorGradient: "linear-gradient(135deg, #F43F5E, #FB7185)",
    accentColor: "#F43F5E",
  },
  {
    id: "log-period",
    title: "Log Period",
    category: "cycle",
    description: "Quick flow logging, symptom recording, and daily cycle check-in.",
    href: "/log-period",
    icon: "fa-droplet",
    colorGradient: "linear-gradient(135deg, #EF4444, #F87171)",
    accentColor: "#EF4444",
  },
  {
    id: "mood-journal",
    title: "Mood Journal",
    category: "cycle",
    description: "Reflect on your day, track emotional swings, and get wellness prompts.",
    href: "/mood-journal",
    icon: "fa-face-smile",
    badge: "DAILY",
    badgeType: "hot",
    colorGradient: "linear-gradient(135deg, #F59E0B, #FBBF24)",
    accentColor: "#F59E0B",
  },
  {
    id: "wellness",
    title: "Wellness Hub",
    category: "cycle",
    description: "Self-care rituals, guided breathing exercises, and nutritional tips.",
    href: "/wellness",
    icon: "fa-spa",
    colorGradient: "linear-gradient(135deg, #14B8A6, #2DD4BF)",
    accentColor: "#14B8A6",
  },
  {
    id: "audiobooks",
    title: "Audiobooks & Sleep",
    category: "cycle",
    description: "Calming bedtime audio, soothing meditations, and relaxation stories.",
    href: "/audiobooks",
    icon: "fa-headphones",
    badge: "RELAX",
    badgeType: "new",
    colorGradient: "linear-gradient(135deg, #6366F1, #818CF8)",
    accentColor: "#6366F1",
  },
  {
    id: "partner-mode",
    title: "Partner Sharing",
    category: "social",
    description: "Empower your partner with cycle awareness, mood cues, and tips.",
    href: "/partner-mode",
    icon: "fa-user-group",
    badge: "CONNECT",
    badgeType: "new",
    colorGradient: "linear-gradient(135deg, #E11D48, #BE123C)",
    accentColor: "#E11D48",
  },
  {
    id: "reports",
    title: "Health Reports",
    category: "social",
    description: "Export comprehensive cycle and mood summaries for doctor consultations.",
    href: "/reports",
    icon: "fa-file-medical",
    colorGradient: "linear-gradient(135deg, #0284C7, #38BDF8)",
    accentColor: "#0284C7",
  },
  {
    id: "community",
    title: "Community Forum",
    category: "social",
    description: "Safe, anonymous sisterhood discussions, shared experiences, and advice.",
    href: "/community",
    icon: "fa-users-line",
    colorGradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)",
    accentColor: "#8B5CF6",
  },
  {
    id: "games",
    title: "Challenges & Games",
    category: "insights",
    description: "Gamified self-care streaks, minigames, badges, and wellness points.",
    href: "/games",
    icon: "fa-gamepad",
    badge: "EARN XP",
    badgeType: "hot",
    colorGradient: "linear-gradient(135deg, #D97706, #F59E0B)",
    accentColor: "#D97706",
  },
  {
    id: "insights",
    title: "Data Insights",
    category: "insights",
    description: "Deep cycle analytics, symptom patterns, and wellness trend charts.",
    href: "/insights",
    icon: "fa-chart-line",
    colorGradient: "linear-gradient(135deg, #059669, #10B981)",
    accentColor: "#059669",
  },
  {
    id: "profile",
    title: "Profile & Settings",
    category: "insights",
    description: "Theme styling, language preferences, notification toggles, and account info.",
    href: "/profile",
    icon: "fa-user-gear",
    colorGradient: "linear-gradient(135deg, #475569, #64748B)",
    accentColor: "#475569",
  },
];

export default function DashboardTabNavigator() {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "cycle" | "social" | "insights">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = ALL_FEATURES.filter((item) => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="tab-deck-section" aria-label="HIM Features and Tab Switcher">
      {/* Deck Header */}
      <div className="tab-deck-header">
        <div className="tab-deck-title-area">
          <div className="tab-deck-badge">
            <i className="fa-solid fa-compass"></i> PAGE NAVIGATOR &amp; TAB SWITCHER
          </div>
          <h2>Instant Navigation to All HIM Pages</h2>
          <p>Switch seamlessly between all companion features, health tools, and AI guides.</p>
        </div>

        {/* Live Search Input */}
        <div className="tab-deck-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search all 13+ pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter pages"
          />
          {searchQuery && (
            <button
              type="button"
              className="tab-deck-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      {/* Flagship Spotlight: Voice & Chat Hero Duo */}
      <div className="tab-deck-spotlight-grid">
        {/* VOICE SPOTLIGHT */}
        <div className="spotlight-card spotlight-voice">
          <div className="spotlight-badge live-pulse-badge">
            <span className="live-dot-pulse"></span>
            LIVE VOICE ASSISTANT
          </div>
          <div className="spotlight-content">
            <div className="spotlight-icon-wrap" style={{ background: "linear-gradient(135deg, #10B981, #06B6D4)" }}>
              <i className="fa-solid fa-microphone-lines"></i>
            </div>
            <div className="spotlight-text">
              <h3>Voice Companion (Hands-Free)</h3>
              <p>
                Have natural, soothing conversations with HIM in 23 languages. Voice call anytime for PMS relief,
                calming breathing, or loving comfort.
              </p>
            </div>
          </div>
          {/* Animated Audio Wave Bars */}
          <div className="soundwave-container" aria-hidden="true">
            <span className="soundwave-bar bar-1"></span>
            <span className="soundwave-bar bar-2"></span>
            <span className="soundwave-bar bar-3"></span>
            <span className="soundwave-bar bar-4"></span>
            <span className="soundwave-bar bar-5"></span>
            <span className="soundwave-bar bar-6"></span>
            <span className="soundwave-bar bar-7"></span>
            <span className="soundwave-bar bar-8"></span>
          </div>
          <div className="spotlight-footer">
            <Link href="/voice" className="spotlight-action-btn btn-voice-glow">
              <i className="fa-solid fa-phone-volume"></i> Start Voice Call
            </Link>
            <span className="spotlight-hint">Available 24/7 • Instant connection</span>
          </div>
        </div>

        {/* CHAT SPOTLIGHT */}
        <div className="spotlight-card spotlight-chat">
          <div className="spotlight-badge ai-sparkle-badge">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            EMPATHETIC AI COMPANION
          </div>
          <div className="spotlight-content">
            <div className="spotlight-icon-wrap" style={{ background: "linear-gradient(135deg, #EC4899, #8B5CF6)" }}>
              <i className="fa-solid fa-comments"></i>
            </div>
            <div className="spotlight-text">
              <h3>HIM AI Chat (Cycle-Aware)</h3>
              <p>
                A personalized companion that understands your current cycle phase, hormonal mood shifts, and
                wellness needs with warm, gentle empathy.
              </p>
            </div>
          </div>
          <div className="chat-preview-bubbles" aria-hidden="true">
            <div className="chat-mini-bubble bubble-him">
              <i className="fa-solid fa-heart"></i> &ldquo;How is your energy level today, love?&rdquo;
            </div>
            <div className="chat-mini-bubble bubble-user">&ldquo;A bit tired from PMS...&rdquo;</div>
          </div>
          <div className="spotlight-footer">
            <Link href="/chat" className="spotlight-action-btn btn-chat-glow">
              <i className="fa-solid fa-comments"></i> Open HIM Chat
            </Link>
            <span className="spotlight-hint">Private &amp; Secure • Phase Guided</span>
          </div>
        </div>
      </div>

      {/* Pill Switcher Bar */}
      <div className="tab-pill-bar" role="tablist">
        {[
          { id: "all", label: "All Pages (13)", icon: "fa-table-cells-large" },
          { id: "ai", label: "Voice & AI Chat", icon: "fa-robot" },
          { id: "cycle", label: "Cycle & Wellness", icon: "fa-heart-pulse" },
          { id: "social", label: "Partner & Sharing", icon: "fa-user-group" },
          { id: "insights", label: "Insights & Games", icon: "fa-chart-pie" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab-pill-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Grid of All Target Pages */}
      <div className="tab-cards-grid">
        {filteredFeatures.map((feat) => (
          <Link
            key={feat.id}
            href={feat.href}
            className={`tab-feature-card ${feat.isFlagship ? "flagship-item" : ""}`}
          >
            <div className="card-top-row">
              <div className="feat-icon-box" style={{ background: feat.colorGradient }}>
                <i className={`fa-solid ${feat.icon}`}></i>
              </div>
              {feat.badge && (
                <span className={`feat-badge badge-${feat.badgeType || "hot"}`}>{feat.badge}</span>
              )}
            </div>

            <div className="card-body-area">
              <h4>{feat.title}</h4>
              <p>{feat.description}</p>
            </div>

            <div className="card-footer-row">
              <span className="card-go-text" style={{ color: feat.accentColor }}>
                Go to Page <i className="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="tab-deck-empty">
          <i className="fa-solid fa-circle-question"></i>
          <p>No pages match &ldquo;{searchQuery}&rdquo;</p>
          <button type="button" className="btn btn-sm btn-outline" onClick={() => setSearchQuery("")}>
            Reset search
          </button>
        </div>
      )}
    </section>
  );
}
