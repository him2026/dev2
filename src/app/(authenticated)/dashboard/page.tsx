import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { redirect } from "next/navigation";
import QuickMoodSelector from "@/components/QuickMoodSelector";
import DashboardTabNavigator from "@/components/DashboardTabNavigator";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const userId = session.id;

  const { data: user, error } = await supabase
    .from("users")
    .select("*, cycle_settings(*)")
    .eq("id", userId)
    .single();

  if (error || !user) {
    redirect("/login");
  }

  const cycleSettings = Array.isArray(user.cycle_settings) ? user.cycle_settings[0] : user.cycle_settings;

  // Streak & wellness calculations
  const streak = 1;
  const points = 0;
  const wellnessScore = 85;
  const daysUntil = cycleSettings?.next_predicted_date
    ? Math.ceil((new Date(cycleSettings.next_predicted_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : 14;

  const phaseInfo = {
    name: "Follicular Phase",
    description: "High energy, great time to start new projects.",
    color: "#10B981", // Mint
    icon: "fa-leaf",
  };

  const todayTip = {
    title: "Stay Hydrated",
    body: "Drinking enough water helps reduce bloating and keeps your energy up during this phase.",
  };

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data: moodData } = await supabase
    .from("mood_logs")
    .select("mood")
    .eq("user_id", userId)
    .gte("log_date", todayStart.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const todayMood = moodData?.mood || null;

  return (
    <div className="container">
      {/* Welcome Banner */}
      <div className="welcome-banner" data-aos="zoom-in-down" data-aos-easing="ease-out-cubic" data-aos-duration="800">
        <div className="welcome-text">
          <h1>Hi, {user.full_name.trim().split(" ")[0]}!</h1>
          <p>Here&apos;s your wellness overview and instant companion navigator</p>
        </div>
        <div className="welcome-date">
          <span className="day">{new Date().getDate()}</span>
          <span className="month">
            {new Date().toLocaleString("en-US", { month: "short", year: "numeric" })}
          </span>
        </div>
      </div>

      {/* Flagship Feature Suite & Real-Time Tab Navigator Deck */}
      <DashboardTabNavigator />

      {/* Quick Stats Grid */}
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
          <div className="stat-icon" style={{ background: "rgba(244, 63, 94, 0.15)", color: "#E11D48" }}>
            <i className="fa-solid fa-calendar-day"></i>
          </div>
          <div className="stat-info">
            <h3>{daysUntil > 0 ? daysUntil : 0} days</h3>
            <p>
              Until next period
              <br />
              {cycleSettings?.next_predicted_date && (
                <small>
                  {new Date(cycleSettings.next_predicted_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              )}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#D97706" }}>
            <i className="fa-solid fa-fire"></i>
          </div>
          <div className="stat-info">
            <h3>
              {streak} day{streak !== 1 ? "s" : ""}
            </h3>
            <p>Logging streak</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#059669" }}>
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
        {/* Quick Actions (High Contrast & Theme-Proof) */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-duration="600">
          <h3 className="card-title">
            <i className="fa-solid fa-bolt" style={{ color: "var(--color-primary)", marginRight: "8px" }}></i>
            Quick Actions
          </h3>
          <div className="quick-actions">
            <Link href="/voice" className="action-btn action-voice" data-aos="flip-up" data-aos-delay="100">
              <span className="action-badge-pulse">LIVE</span>
              <i className="fa-solid fa-microphone-lines"></i>
              <span>Voice</span>
            </Link>
            <Link href="/chat" className="action-btn action-chat" data-aos="flip-up" data-aos-delay="200">
              <span className="action-badge-ai">AI 24/7</span>
              <i className="fa-solid fa-comments"></i>
              <span>AI Chat</span>
            </Link>
            <Link href="/log-period" className="action-btn action-period" data-aos="flip-up" data-aos-delay="300">
              <i className="fa-solid fa-droplet"></i>
              <span>Log Period</span>
            </Link>
            <Link href="/mood-journal" className="action-btn action-mood" data-aos="flip-up" data-aos-delay="400">
              <i className="fa-solid fa-face-smile"></i>
              <span>Log Mood</span>
            </Link>
          </div>
        </div>

        {/* Today's Mood */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="600">
          <h3 className="card-title">
            <i className="fa-solid fa-heart" style={{ color: "#EC4899", marginRight: "8px" }}></i>
            How are you feeling?
          </h3>
          <QuickMoodSelector initialMood={todayMood} />
        </div>

        {/* Today's Tip */}
        {todayTip && (
          <div className="card tip-card deck-card" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="600">
            <div className="tip-header">
              <i className="fa-solid fa-lightbulb" style={{ color: "var(--color-warning)" }}></i>
              <h3 className="card-title">Today&apos;s Tip</h3>
            </div>
            <h4>{todayTip.title}</h4>
            <p>{todayTip.body}</p>
            <Link href="/wellness" className="btn btn-sm btn-outline mt-2">
              More Tips &rarr;
            </Link>
          </div>
        )}

        {/* Points & Badges */}
        <div className="card deck-card" data-aos="zoom-in-up" data-aos-delay="400" data-aos-duration="600">
          <div className="tip-header">
            <i className="fa-solid fa-trophy" style={{ color: "#F59E0B" }}></i>
            <h3 className="card-title">Your Progress</h3>
          </div>
          <div className="points-display">
            <div className="points-value">
              <i className="fa-solid fa-star" style={{ color: "#F59E0B" }}></i>
              <span>{points}</span> points
            </div>
            <Link href="/games" className="btn btn-sm btn-outline">
              View Badges &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
