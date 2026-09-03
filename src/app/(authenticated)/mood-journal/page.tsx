"use client";

import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import Chart from "chart.js/auto";

export default function MoodJournal() {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState("");
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const MAX_MOODS = 3;
  const streak = 1;

  const moods = {
    happy: { emoji: '😊', label: 'Happy', color: '#FFD93D' },
    sad: { emoji: '😢', label: 'Sad', color: '#74B9FF' },
    anxious: { emoji: '😰', label: 'Anxious', color: '#A29BFE' },
    angry: { emoji: '😤', label: 'Angry', color: '#FF7675' },
    tired: { emoji: '😴', label: 'Tired', color: '#B2BEC3' },
    neutral: { emoji: '😐', label: 'Neutral', color: '#FDCB6E' },
    calm: { emoji: '😌', label: 'Calm', color: '#55EFC4' },
    irritated: { emoji: '😠', label: 'Irritated', color: '#FF6B81' },
    excited: { emoji: '🤩', label: 'Excited', color: '#FD79A8' },
    grateful: { emoji: '🥰', label: 'Grateful', color: '#FFCCDD' },
    confused: { emoji: '😕', label: 'Confused', color: '#DFE6E9' },
    hopeful: { emoji: '🌟', label: 'Hopeful', color: '#FFEAA7' },
  };

  const moodHistory = [
    { log_date: '2023-10-01', mood: 'happy,excited', intensity: 8, notes: 'Feeling great today!', cycle_phase: 'follicular' },
    { log_date: '2023-10-02', mood: 'calm', intensity: 6, notes: 'A relaxing day.', cycle_phase: 'follicular' },
    { log_date: '2023-10-03', mood: 'tired,sad', intensity: 4, notes: 'Didn\'t sleep well.', cycle_phase: 'luteal' },
    { log_date: '2023-10-04', mood: 'anxious', intensity: 7, notes: 'Work is stressful.', cycle_phase: 'luteal' },
    { log_date: '2023-10-05', mood: 'happy', intensity: 9, notes: 'Had a nice dinner.', cycle_phase: 'menstrual' },
  ];

  useEffect(() => {
    AOS.init({ duration: 600, once: false });

    const chartDates = moodHistory.map(entry => new Date(entry.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })).reverse();
    const chartIntensities = moodHistory.map(entry => entry.intensity).reverse();

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(232, 86, 127, 0.4)');
        gradient.addColorStop(1, 'rgba(232, 86, 127, 0.0)');

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartDates,
            datasets: [{
              label: 'Intensity',
              data: chartIntensities,
              borderColor: '#E8567F',
              backgroundColor: gradient,
              borderWidth: 3,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#E8567F',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(255,255,255,0.9)',
                titleColor: '#333', bodyColor: '#e8567f',
                borderColor: 'rgba(232,86,127,0.2)', borderWidth: 1,
                padding: 10, displayColors: false,
                callbacks: { label: ctx => `Intensity: ${ctx.raw} / 10` }
              }
            },
            scales: {
              y: { beginAtZero: true, max: 10, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { stepSize: 2, color: '#888' } },
              x: { grid: { display: false }, ticks: { color: '#888', maxTicksLimit: 7 } }
            },
            interaction: { intersect: false, mode: 'index' }
          }
        });
      }
    }
  }, []);

  const toggleMood = (moodKey: string) => {
    if (selectedMoods.includes(moodKey)) {
      setSelectedMoods(selectedMoods.filter(m => m !== moodKey));
    } else {
      if (selectedMoods.length < MAX_MOODS) {
        setSelectedMoods([...selectedMoods, moodKey]);
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .mood-emoji {
            flex-direction: column;
            height: auto;
            min-height: 70px;
            padding: 10px 6px;
            border-radius: 16px !important;
            border: 2px solid transparent;
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
            cursor: pointer;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mood-emoji:hover { transform: translateY(-3px) scale(1.06); border-color: var(--mood-color, var(--color-primary)); }
        .mood-emoji.active {
            border-color: var(--mood-color, var(--color-primary));
            background: color-mix(in srgb, var(--mood-color, var(--color-primary)) 15%, white);
            box-shadow: 0 4px 16px color-mix(in srgb, var(--mood-color, var(--color-primary)) 30%, transparent);
        }
      `}} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }} data-aos="zoom-in-up">
        <div>
          <h2><i className="fa-solid fa-book" style={{ color: "var(--color-secondary)" }}></i> Mood Journal</h2>
          <p className="text-muted">Track how you feel each day</p>
        </div>
        <div className="card-flat" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px" }}>
          <i className="fa-solid fa-fire" style={{ color: "var(--color-warning)", fontSize: "24px" }}></i>
          <div>
            <div style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>{streak}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Day Streak</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "24px", width: "100%", alignItems: "stretch" }}>
        {/* Left: Log + Graph */}
        <div style={{ flex: "1 1 45%", minWidth: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" data-aos="fade-right" data-aos-delay="100">
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px", flexWrap: "wrap", gap: "8px" }}>
              <h3 className="card-title" style={{ margin: 0 }}>How are you feeling today?</h3>
              <span id="moodCounter" style={{ fontSize: "12px", fontWeight: 700, background: selectedMoods.length >= MAX_MOODS ? "color-mix(in srgb, var(--color-primary) 20%, white)" : "var(--color-primary-light)", color: "var(--color-primary)", padding: "4px 12px", borderRadius: "20px" }}>
                {selectedMoods.length} / {MAX_MOODS} selected
              </span>
            </div>
            Pick <strong>1 – 3 moods</strong> that match how you feel right now

            {/* Mood grid */}
            <div className="mood-selector" id="moodSelector" style={{ marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: "10px", marginTop: "16px" }}>
              {Object.entries(moods).map(([key, info]) => (
                <button
                  key={key}
                  className={`mood-emoji ${selectedMoods.includes(key) ? "active" : ""}`}
                  data-mood={key}
                  title={info.label}
                  style={{ "--mood-color": info.color } as React.CSSProperties}
                  onClick={() => toggleMood(key)}
                >
                  <span style={{ fontSize: "28px", display: "block" }}>{info.emoji}</span>
                  <span style={{ fontSize: "11px", display: "block", marginTop: "3px", fontWeight: 600 }}>{info.label}</span>
                </button>
              ))}
            </div>

            {/* Selected mood preview */}
            {selectedMoods.length > 0 && (
              <div id="selectedPreview" style={{ background: "var(--color-primary-light)", borderRadius: "14px", padding: "10px 16px", marginBottom: "16px", fontSize: "14px", fontWeight: 600, color: "var(--color-primary)", textAlign: "center", letterSpacing: "0.02em" }}>
                {selectedMoods.map(k => (moods as any)[k].emoji).join('  ')}  {selectedMoods.map(k => (moods as any)[k].label).join(' + ')}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Intensity (1-10)</label>
              <input type="range" id="moodIntensity" min="1" max="10" value={intensity} onChange={(e) => setIntensity(parseInt(e.target.value))} style={{ width: "100%", accentColor: "var(--color-primary)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)" }}>
                <span>Mild</span><span id="intensityValue">{intensity}</span><span>Intense</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="journalNotes">Journal Entry (optional)</label>
              <textarea className="form-textarea" id="journalNotes" placeholder="Write about your day..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            </div>

            <button className="btn btn-primary" id="saveMoodBtn" style={{ width: "100%" }}>
              <i className="fa-solid fa-check"></i> Save Mood
            </button>
          </div>

          {/* Mood Graph */}
          {moodHistory.length > 0 && (
            <div className="card" data-aos="fade-right" data-aos-delay="150" style={{ padding: "24px" }}>
              <h3 className="card-title" style={{ marginBottom: "16px" }}><i className="fa-solid fa-chart-line" style={{ color: "var(--color-primary)" }}></i> Mood Trend (30 Days)</h3>
              <div style={{ width: "100%", height: "200px", position: "relative" }}>
                <canvas ref={chartRef} id="moodTrendChart"></canvas>
              </div>
            </div>
          )}
        </div>

        {/* Right: History */}
        <div style={{ flex: "1 1 45%", minWidth: "320px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card" data-aos="fade-left" data-aos-delay="200" style={{ flex: 1, display: "flex", flexDirection: "column", paddingRight: "12px" }}>
            <h3 className="card-title" style={{ marginBottom: "20px" }}>Mood History</h3>
            {moodHistory.length === 0 ? (
              <p className="text-center text-muted" style={{ padding: "24px" }}>No moods logged yet. Start today!</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px", overflowY: "auto", maxHeight: "calc(100vh - 200px)", paddingRight: "8px", alignContent: "start" }}>
                {moodHistory.map((entry, index) => {
                  const entryMoods = entry.mood.split(',').map(m => m.trim());
                  const isCombo = entryMoods.length > 1;

                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "20px 16px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", position: "relative" }}>
                      {isCombo && (
                        <span style={{ position: "absolute", top: "8px", right: "8px", fontSize: "9px", fontWeight: 800, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "white", padding: "2px 7px", borderRadius: "20px", letterSpacing: "0.04em" }}>COMBO</span>
                      )}

                      <div style={{ display: "flex", gap: isCombo ? "-6px" : "0", justifyContent: "center", flexWrap: "wrap" }}>
                        {entryMoods.map((mk, i) => (moods as any)[mk] ? (
                          <span key={i} style={{ fontSize: isCombo ? "30px" : "40px", animation: `gentleFloat ${3 + i}s infinite`, display: "inline-block", marginLeft: isCombo && i > 0 ? "-4px" : "0" }}>
                            {(moods as any)[mk].emoji}
                          </span>
                        ) : null)}
                      </div>

                      <div style={{ textAlign: "center" }}>
                        {isCombo ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center", marginBottom: "4px" }}>
                            {entryMoods.map((mk, i) => (moods as any)[mk] ? (
                              <span key={i} style={{ fontSize: "10px", fontWeight: 700, background: `${(moods as any)[mk].color}30`, color: (moods as any)[mk].color, padding: "2px 8px", borderRadius: "20px", border: `1px solid ${(moods as any)[mk].color}40` }}>
                                {(moods as any)[mk].label}
                              </span>
                            ) : null)}
                          </div>
                        ) : (
                          <strong style={{ fontSize: "16px", color: "var(--color-primary)" }}>{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</strong>
                        )}
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Intensity: {entry.intensity}/10</div>
                        {entry.notes && (
                          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "6px", lineHeight: 1.3, fontStyle: "italic" }}>
                            "{entry.notes.substring(0, 50)}{entry.notes.length > 50 ? "..." : ""}"
                          </p>
                        )}
                      </div>

                      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.05)", width: "100%" }}>
                        <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--text-primary)" }}>{new Date(entry.log_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        {entry.cycle_phase && (
                          <span className="badge badge-primary" style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "20px" }}>{entry.cycle_phase.charAt(0).toUpperCase() + entry.cycle_phase.slice(1)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
