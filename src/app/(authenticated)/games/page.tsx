"use client";

import { useEffect } from "react";
import AOS from "aos";
import Script from "next/script";

export default function GamesPage() {
  const points = 50;

  const badges = [
    { icon: 'fa-droplet', name: 'Hydration Hero', description: 'Logged water intake for 7 days straight', points_value: 50, earned: true },
    { icon: 'fa-moon', name: 'Sleep Master', description: 'Logged 8+ hours of sleep for 5 days', points_value: 100, earned: false },
    { icon: 'fa-heart-pulse', name: 'Cycle synced', description: 'Logged symptoms through all 4 phases', points_value: 150, earned: false },
    { icon: 'fa-fire', name: 'Streak 30', description: '30 day login streak', points_value: 200, earned: false },
  ];

  const challenges = [
    { id: 1, title: 'Mindful Morning', description: 'Start your day with 10 mins of meditation.', duration_days: 7, days_completed: 3, points_reward: 100, is_completed: false, started_at: '2023-10-01' },
    { id: 2, title: 'Sugar Detox', description: 'No refined sugar for 5 days.', duration_days: 5, days_completed: 5, points_reward: 150, is_completed: true, started_at: '2023-09-20' },
    { id: 3, title: 'Daily Walk', description: 'Walk 30 mins every day.', duration_days: 14, days_completed: 0, points_reward: 200, is_completed: false, started_at: null },
  ];

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px", gap: "16px" }} data-aos="zoom-in-up">
        <div>
          <h2><i className="fa-solid fa-gamepad" style={{ color: "var(--color-primary)" }}></i> Games & Challenges</h2>
          <p className="text-muted">Make self-care fun and build healthy habits</p>
        </div>
        <div className="card-flat" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", background: "linear-gradient(135deg, var(--color-primary-light), var(--color-secondary-light))" }}>
          <i className="fa-solid fa-star" style={{ color: "var(--color-warning)", fontSize: "24px" }}></i>
          <div>
            <div style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1 }}>{points}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Total Points</div>
          </div>
        </div>
      </div>
      
      {/* Badges */}
      <div className="card mb-3" style={{ background: "transparent", boxShadow: "none", padding: 0, textAlign: "center" }} data-aos="zoom-in-up" data-aos-delay="100">
        <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>
          <i className="fa-solid fa-medal" style={{ color: "var(--color-warning)" }}></i> My Collection ✨
        </h3>
        <div className="grid grid-4">
          {badges.map((badge, i) => (
            <div key={i} className={`games-badge-card ${badge.earned ? 'earned' : ''}`} data-aos="zoom-in-up" data-aos-delay={(i % 4) * 100}>
              <div className="games-badge-icon">
                <i className={`fa-solid ${badge.icon}`} style={{ color: badge.earned ? 'var(--color-primary)' : 'var(--border-color)', filter: badge.earned ? 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.5))' : 'none' }}></i>
              </div>
              <h4 style={{ fontSize: "15px", marginBottom: "6px", fontWeight: 700, color: badge.earned ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                {badge.name}
              </h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", lineHeight: 1.4 }}>
                {badge.description}
              </p>
              <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 800, background: badge.earned ? 'rgba(255,105,180,0.1)' : 'var(--bg-body)', color: badge.earned ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                +{badge.points_value} pts
              </span>
              {badge.earned && (
                <div style={{ position: "absolute", top: "8px", right: "12px", fontSize: "26px", filter: "drop-shadow(0 4px 6px rgba(255,105,180,0.4))", transform: "rotate(15deg)", animation: "gentleFloat 3s infinite" }}>🎀</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Challenges */}
      <div className="card" style={{ background: "transparent", boxShadow: "none", padding: 0, marginTop: "30px", textAlign: "center" }} data-aos="zoom-in-up" data-aos-delay="200">
        <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>
          <i className="fa-solid fa-trophy" style={{ color: "var(--color-sage)" }}></i> Active Challenges 🌸
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", width: "100%", alignItems: "stretch", boxSizing: "border-box" }}>
          {challenges.map((ch, i) => {
            const progress = ch.days_completed ? (ch.days_completed / ch.duration_days) * 100 : 0;
            const started = ch.started_at !== null;
            return (
              <div key={i} className={`games-challenge-card ${ch.is_completed ? 'completed' : ''}`} data-aos="fade-up" data-aos-delay={i * 100} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <h4 style={{ fontSize: "17px", marginBottom: "6px", color: "var(--text-primary)", fontWeight: 700 }}>
                      {ch.title} {ch.is_completed ? '🎉' : ''}
                    </h4>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{ch.description}</p>
                  </div>
                  <span className="badge" style={{ background: ch.is_completed ? 'var(--color-sage)' : 'var(--color-primary-light)', color: ch.is_completed ? 'white' : 'var(--color-primary)', fontWeight: 700, padding: "6px 12px", borderRadius: "20px" }}>
                    {ch.is_completed ? '✅ Done' : `⏳ ${ch.duration_days} days`}
                  </span>
                </div>
                {started && !ch.is_completed ? (
                  <>
                    <div style={{ background: "rgba(0,0,0,0.05)", borderRadius: "50px", height: "10px", overflow: "hidden", marginBottom: "10px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}>
                      <div style={{ background: "linear-gradient(90deg, var(--color-secondary), var(--color-primary))", height: "100%", borderRadius: "50px", width: `${progress}%`, transition: "width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 600 }}>
                      <span style={{ color: "var(--text-secondary)" }}>{ch.days_completed} / {ch.duration_days} days completed</span>
                      <span style={{ color: "var(--color-primary)" }}>+{ch.points_reward} pts</span>
                    </div>
                  </>
                ) : !started ? (
                  <button className="btn btn-sm btn-primary start-challenge" data-id={ch.id} style={{ borderRadius: "20px", fontWeight: 700, padding: "8px 20px" }}>
                    Start Challenge ✨
                  </button>
                ) : (
                  <div style={{ padding: "10px 15px", background: "rgba(255,255,255,0.5)", borderRadius: "12px", display: "inline-block" }}>
                    <p style={{ fontSize: "13px", color: "var(--color-sage)", fontWeight: 700, margin: 0 }}>
                      Amazing! You earned +{ch.points_reward} pts 💖
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Arcade Games */}
      <div className="card" style={{ background: "transparent", boxShadow: "none", padding: 0, marginTop: "30px", textAlign: "center" }} data-aos="zoom-in-up" data-aos-delay="300">
        <h3 className="card-title" style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>
          <i className="fa-solid fa-gamepad" style={{ color: "var(--color-primary)" }}></i> Arcade Mini-Games 🎮
        </h3>
        <div className="grid grid-2">
          {/* Mood Match */}
          <div className="games-challenge-card" style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ fontSize: "40px", marginBottom: "15px", animation: "gentleFloat 3s infinite" }}>🃏</div>
            <h4 style={{ fontSize: "18px", marginBottom: "8px", fontWeight: 700 }}>Mood Match</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Match the feminine emojis to test your memory and earn points!</p>
            <button className="btn btn-primary btn-play-game" data-game="mood_match" style={{ borderRadius: "20px", padding: "10px 24px", fontWeight: 700 }}>Play Now</button>
          </div>
          
          {/* Bubble Pop */}
          <div className="games-challenge-card" style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ fontSize: "40px", marginBottom: "15px", animation: "gentleFloat 4s infinite reverse" }}>🫧</div>
            <h4 style={{ fontSize: "18px", marginBottom: "8px", fontWeight: 700 }}>Pop The Stress</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>Pop as many anxiety bubbles as you can in 30 seconds!</p>
            <button className="btn btn-primary btn-play-game" data-game="bubble_pop" style={{ borderRadius: "20px", padding: "10px 24px", fontWeight: 700 }}>Play Now</button>
          </div>
        </div>
      </div>
      
      {/* Game Overlay Modal */}
      <div id="gameModal" style={{ display: "none", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(255,255,255,0.95)", zIndex: 10000, flexDirection: "column", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
        <button id="closeGame" className="btn btn-outline" style={{ position: "absolute", top: "20px", right: "20px", borderRadius: "50%", width: "40px", height: "40px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-xmark"></i></button>
        <h2 id="gameTitle" style={{ fontSize: "32px", marginBottom: "10px", color: "var(--color-primary)" }}>Game</h2>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", fontSize: "18px", fontWeight: 700 }}>
          <span style={{ color: "var(--text-secondary)" }}>Score: <span id="currentScore" style={{ color: "var(--color-primary)" }}>0</span></span>
          <span id="timerDisplay" style={{ color: "var(--color-warning)", display: "none" }}>Time: <span>30</span>s</span>
        </div>
        
        <div id="gameArea" style={{ position: "relative", width: "90%", maxWidth: "600px", height: "400px", background: "linear-gradient(135deg, var(--color-primary-light), white)", borderRadius: "24px", border: "2px solid rgba(255,105,180,0.3)", overflow: "hidden", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", padding: "20px", gap: "10px", boxShadow: "0 10px 30px rgba(255,105,180,0.1)" }}>
          {/* Game renders here */}
        </div>
        
        <button id="startGameBtn" className="btn btn-primary" style={{ marginTop: "24px", borderRadius: "20px", padding: "12px 30px", fontSize: "18px", fontWeight: 700 }}>Start Game ✨</button>
      </div>

      <Script src="/js/minigames.js" strategy="lazyOnload" />
    </div>
  );
}
