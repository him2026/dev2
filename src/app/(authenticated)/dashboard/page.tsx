import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      cycle_settings: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  const cycleSettings = user.cycle_settings;
  
  // Dummy calculations for now to match UI layout
  const streak = 1;
  const points = user.points || 0;
  const wellnessScore = 85;
  const daysUntil = cycleSettings?.next_predicted_date 
    ? Math.ceil((new Date(cycleSettings.next_predicted_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : 14;

  const phaseInfo = {
    name: "Follicular Phase",
    description: "High energy, great time to start new projects.",
    color: "#10B981", // Mint
    icon: "fa-leaf"
  };

  const todayTip = {
    title: "Stay Hydrated",
    body: "Drinking enough water helps reduce bloating and keeps your energy up during this phase."
  };

  const todayMood = null;

  return (
    <div className="container">
      {/* Welcome Banner */}
      <div className="welcome-banner" data-aos="zoom-in-down" data-aos-easing="ease-out-cubic" data-aos-duration="800">
        <div className="welcome-text">
          <h1>Hi, {user.full_name.split(' ')[0]}!</h1>
          <p>Here's your wellness overview for today</p>
        </div>
        <div className="welcome-date">
          <span className="day">{new Date().getDate()}</span>
          <span className="month">
            {new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid" data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="600">
        <div className="stat-card phase-card" style={{ "--phase-color": phaseInfo.color } as React.CSSProperties}>
          <div className="stat-icon" style={{ background: `${phaseInfo.color}20`, color: phaseInfo.color }}>
            <i className={`fa-solid ${phaseInfo.icon}`}></i>
          </div>
          <div className="stat-info">
            <h3>{phaseInfo.name}</h3>
            <p>{phaseInfo.description}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
            <i className="fa-solid fa-calendar-day"></i>
          </div>
          <div className="stat-info">
            <h3>{daysUntil > 0 ? daysUntil : 0} days</h3>
            <p>
              Until next period<br />
              {cycleSettings?.next_predicted_date && (
                <small>{new Date(cycleSettings.next_predicted_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</small>
              )}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
            <i className="fa-solid fa-fire"></i>
          </div>
          <div className="stat-info">
            <h3>{streak} day{streak !== 1 ? 's' : ''}</h3>
            <p>Logging streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
            <i className="fa-solid fa-heart-pulse"></i>
          </div>
          <div className="stat-info">
            <h3>{wellnessScore}/100</h3>
            <p>Wellness score</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid deck-container">
        {/* Quick Actions */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-duration="600">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions">
            <Link href="/cycle-tracker" className="action-btn action-period" data-aos="flip-up" data-aos-delay="100">
              <i className="fa-solid fa-droplet"></i>
              <span>Log Period</span>
            </Link>
            <Link href="/chat" className="action-btn action-chat" data-aos="flip-up" data-aos-delay="200">
              <i className="fa-solid fa-comments"></i>
              <span>Chat</span>
            </Link>
            <Link href="/voice" className="action-btn action-voice" data-aos="flip-up" data-aos-delay="300">
              <i className="fa-solid fa-microphone"></i>
              <span>Voice</span>
            </Link>
            <Link href="/mood-journal" className="action-btn action-mood" data-aos="flip-up" data-aos-delay="400">
              <i className="fa-solid fa-face-smile"></i>
              <span>Log Mood</span>
            </Link>
          </div>
        </div>

        {/* Today's Mood */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="600">
          <h3 className="card-title">How are you feeling?</h3>
          {todayMood ? (
            <div className="mood-logged">
              <p>You logged: <strong>{todayMood}</strong> today</p>
              <Link href="/mood-journal" className="btn btn-sm btn-outline">Update</Link>
            </div>
          ) : (
            <div className="mood-selector" id="quickMoodSelector">
              {[
                { id: "happy", label: "Happy" },
                { id: "sad", label: "Sad" },
                { id: "anxious", label: "Anxious" },
                { id: "angry", label: "Angry" },
                { id: "tired", label: "Tired" },
                { id: "calm", label: "Calm" },
                { id: "neutral", label: "Neutral" },
                { id: "irritated", label: "Irritated" }
              ].map((mood, i) => (
                <button
                  key={mood.id}
                  className="mood-emoji"
                  data-aos="zoom-in"
                  data-aos-delay={i * 50}
                  style={{ fontSize: "14px", width: "auto", padding: "8px 12px", borderRadius: "12px" }}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Today's Tip */}
        {todayTip && (
          <div className="card tip-card deck-card" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="600">
            <div className="tip-header">
              <i className="fa-solid fa-lightbulb" style={{ color: "var(--color-warning)" }}></i>
              <h3 className="card-title">Today's Tip</h3>
            </div>
            <h4>{todayTip.title}</h4>
            <p>{todayTip.body}</p>
            <Link href="/wellness" className="btn btn-sm btn-outline mt-2">More Tips</Link>
          </div>
        )}

        {/* Points & Badges */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="600">
          <h3 className="card-title">Your Progress</h3>
          <div className="points-display">
            <div className="points-value">
              <i className="fa-solid fa-star" style={{ color: "var(--color-warning)" }}></i>
              <span>{points}</span> points
            </div>
            <Link href="/games" className="btn btn-sm btn-outline">View Badges</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
