"use client";

import { useState } from "react";
import Link from "next/link";

interface QuickMoodSelectorProps {
  initialMood?: string | null;
}

const MOODS = [
  { id: "happy", label: "Happy" },
  { id: "sad", label: "Sad" },
  { id: "anxious", label: "Anxious" },
  { id: "angry", label: "Angry" },
  { id: "tired", label: "Tired" },
  { id: "calm", label: "Calm" },
  { id: "neutral", label: "Neutral" },
  { id: "irritated", label: "Irritated" },
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
    return (
      <div className="mood-logged">
        <p>
          You logged: <strong>{loggedMood.charAt(0).toUpperCase() + loggedMood.slice(1)}</strong> today ✨
        </p>
        <Link href="/mood-journal" className="btn btn-sm btn-outline">
          Update in Journal
        </Link>
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
          className="mood-emoji"
          data-aos="zoom-in"
          data-aos-delay={i * 50}
          style={{
            fontSize: "14px",
            width: "auto",
            padding: "8px 12px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}
