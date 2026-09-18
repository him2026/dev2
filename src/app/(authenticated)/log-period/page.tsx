"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";

export default function LogPeriodPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [flowIntensity, setFlowIntensity] = useState("medium");
  const [symptoms, setSymptoms] = useState({
    cramps: false,
    headache: false,
    bloating: false,
    fatigue: false,
    mood_swings: false,
    acne: false,
    back_pain: false,
    cravings: false,
  });
  const [severity, setSeverity] = useState("mild");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const toggleSymptom = (key: string) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) {
      setError("Start date is required.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/period/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate || null,
          flow_intensity: flowIntensity,
          symptoms,
          severity,
          notes,
        }),
      });

      if (res.ok) {
        router.push("/cycle-tracker");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save. Please try again.");
      }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-sm" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .flow-option { cursor: pointer; }
        .flow-option input { display: none; }
        .flow-chip {
            display: inline-block; padding: 10px 20px; border-radius: 50px;
            font-size: 14px; font-weight: 600; border: 2px solid var(--border-light);
            transition: var(--transition-normal);
        }
        .flow-option input:checked + .flow-light-chip { background: #FFF0F3; border-color: var(--color-primary); color: var(--color-primary); }
        .flow-option input:checked + .flow-medium-chip { background: #FFE0E8; border-color: var(--color-primary-dark); color: var(--color-primary-dark); }
        .flow-option input:checked + .flow-heavy-chip { background: var(--color-primary); border-color: var(--color-primary); color: white; }
      `}} />
      
      <div className="card" data-aos="zoom-in-up">
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2><i className="fa-solid fa-droplet" style={{ color: "var(--color-primary)" }}></i> Log Your Period</h2>
          <p className="text-muted">Track your cycle for better predictions</p>
        </div>

        {error && (
          <div className="flash-message flash-error" style={{ margin: "0 0 16px" }}>
            <i className="fa-solid fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="start_date">Period Start Date *</label>
              <input
                type="date"
                className="form-input"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="end_date">End Date (leave blank if ongoing)</label>
              <input
                type="date"
                className="form-input"
                id="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Flow Intensity</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <label className="flow-option">
                <input
                  type="radio"
                  name="flow_intensity"
                  value="light"
                  checked={flowIntensity === "light"}
                  onChange={() => setFlowIntensity("light")}
                />
                <span className="flow-chip flow-light-chip">Light</span>
              </label>
              <label className="flow-option">
                <input
                  type="radio"
                  name="flow_intensity"
                  value="medium"
                  checked={flowIntensity === "medium"}
                  onChange={() => setFlowIntensity("medium")}
                />
                <span className="flow-chip flow-medium-chip">Medium</span>
              </label>
              <label className="flow-option">
                <input
                  type="radio"
                  name="flow_intensity"
                  value="heavy"
                  checked={flowIntensity === "heavy"}
                  onChange={() => setFlowIntensity("heavy")}
                />
                <span className="flow-chip flow-heavy-chip">Heavy</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Symptoms</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { key: "cramps", label: "Cramps" },
                { key: "headache", label: "Headache" },
                { key: "bloating", label: "Bloating" },
                { key: "fatigue", label: "Fatigue" },
                { key: "mood_swings", label: "Mood Swings" },
                { key: "acne", label: "Acne" },
                { key: "back_pain", label: "Back Pain" },
                { key: "cravings", label: "Cravings" },
              ].map((s) => (
                <label className="form-check" key={s.key}>
                  <input
                    type="checkbox"
                    checked={symptoms[s.key as keyof typeof symptoms]}
                    onChange={() => toggleSymptom(s.key)}
                  />
                  {" "}{s.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Overall Severity</label>
            <select
              className="form-select"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="mild">Mild — Manageable</option>
              <option value="moderate">Moderate — Uncomfortable</option>
              <option value="severe">Severe — Very painful</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="notes">Notes (optional)</label>
            <textarea
              className="form-textarea"
              id="notes"
              placeholder="Any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={saving}>
              <i className="fa-solid fa-check"></i> {saving ? "Saving..." : "Save Period Log"}
            </button>
            <Link href="/cycle-tracker" className="btn btn-secondary" style={{ flex: 1 }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
