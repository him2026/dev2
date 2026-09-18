"use client";

import { useState } from "react";
import Link from "next/link";

interface QuickMoodSelectorProps {
  initialMood?: string | null;
}

const MOODS = [
  { id: "happy", emoji: "😊", label: "Happy", color: "#10B981" },
  { id: "calm", emoji: "😌", label: "Calm", color: "#06B6D4" },
  { id: "neutral", emoji: "😐", label: "Neutral", color: "#64748B" },
  { id: "tired", emoji: "😴", label: "Tired", color: "#8B5CF6" },
  { id: "anxious", emoji: "😰", label: "Anxious", color: "#F59E0B" },
  { id: "sad", emoji: "🥺", label: "Sad", color: "#3B82F6" },
  { id: "angry", emoji: "😤", label: "Angry", color: "#EF4444" },
  { id: "irritated", emoji: "😣", label: "Irritated", color: "#E11D48" },
];

export default function QuickMoodSelector({ initialMood }: QuickMoodSelectorProps) {
  const [loggedMood, setLoggedMood] = useState<string | null>(initialMood || null);
  const [loading, setLoading] = useState(false);

  const handleQuickLog = async (moodId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/mood/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: moodId, intensity: 5 }),
      });

      if (res.ok) {
        setLoggedMood(moodId);
      }
    } catch (err) {
      console.error("Failed to quick log mood:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loggedMood) {
    const currentMoodObj = MOODS.find((m) => m.id === loggedMood);
    return (
      <div className="mood-logged">
        <p>
          You logged:{" "}
          <strong style={{ color: currentMoodObj?.color || "var(--color-primary)" }}>
            {currentMoodObj?.emoji} {loggedMood.charAt(0).toUpperCase() + loggedMood.slice(1)}
          </strong>{" "}
          today ✨
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={() => setLoggedMood(null)}
          >
            Change Mood
          </button>
          <Link href="/mood-journal" className="btn btn-sm btn-primary">
            Open Journal &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-selector" id="quickMoodSelector">
      {MOODS.map((mood, i) => (
        <button
          key={mood.id}
          type="button"
          disabled={loading}
          onClick={() => handleQuickLog(mood.id)}
          className="mood-chip-btn"
          data-aos="zoom-in"
          data-aos-delay={i * 30}
          title={`Log mood: ${mood.label}`}
        >
          <span className="mood-chip-emoji">{mood.emoji}</span>
          <span className="mood-chip-label">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
