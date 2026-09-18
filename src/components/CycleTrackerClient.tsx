"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AOS from "aos";
import Chart from "chart.js/auto";

interface CycleTrackerClientProps {
  cycleSettings: {
    avg_cycle_length: number;
    avg_period_length: number;
    last_period_start: string | null;
    next_predicted_date: string | null;
    cycle_regularity: string | null;
  };
  periodLogs: Array<{
    start_date: string;
    end_date: string | null;
    flow_intensity: string;
  }>;
  symptomLogs?: Array<{
    log_date: string;
    severity: string;
  }>;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const FACTS = [
  "Your body burns 100-300 extra calories a day during your luteal phase! It's okay to indulge a little.",
  "Adequate sleep during your period can significantly reduce cramps and fatigue. Prioritize rest!",
  "Your pain tolerance and energy levels are highest during the follicular phase. Great time for a new workout!",
  "Hydration is your best friend. Drinking plenty of water reduces bloating and hormonal headaches.",
  "Your intuition, communication skills, and creativity actually peak during your ovulation phase!"
];

export default function CycleTrackerClient({
  cycleSettings,
  periodLogs = [],
  symptomLogs = [],
}: CycleTrackerClientProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [randomFact, setRandomFact] = useState("");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const cycleLength = cycleSettings.avg_cycle_length || 28;
  const periodLength = cycleSettings.avg_period_length || 5;
  const lastPeriodStart = cycleSettings.last_period_start || new Date().toISOString().split("T")[0];

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
    setRandomFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
  }, []);

  // Calculate cycle phase info
  const getCurrentPhase = () => {
    if (!lastPeriodStart) return { name: "Follicular Phase", color: "#10B981", icon: "fa-leaf", description: "High energy, great time to start new projects." };
    const start = new Date(lastPeriodStart + "T00:00:00");
    const diffTime = new Date().getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;

    if (dayInCycle <= periodLength) {
      return { name: "Menstrual Phase", color: "#E8567F", icon: "fa-droplet", description: "Time to rest and recharge. Be gentle with yourself." };
    }
    if (dayInCycle <= Math.round(cycleLength * 0.45)) {
      return { name: "Follicular Phase", color: "#10B981", icon: "fa-leaf", description: "High energy, great time to start new projects." };
    }
    if (dayInCycle <= Math.round(cycleLength * 0.55)) {
      return { name: "Ovulation Phase", color: "#F59E0B", icon: "fa-sun", description: "Peak confidence and vitality. Shine bright!" };
    }
    return { name: "Luteal Phase", color: "#8B5CF6", icon: "fa-moon", description: "Wind down, reflect, and nourish your body." };
  };

  const phaseInfo = getCurrentPhase();

  const daysUntil = cycleSettings.next_predicted_date
    ? Math.max(0, Math.ceil((new Date(cycleSettings.next_predicted_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))
    : 14;

  // Calculate cycle lengths for mini chart
  const cycleLengths: number[] = [];
  for (let i = 0; i < Math.min(6, periodLogs.length - 1); i++) {
    const diff = Math.floor(
      (new Date(periodLogs[i].start_date).getTime() - new Date(periodLogs[i + 1].start_date).getTime()) /
        (1000 * 3600 * 24)
    );
    cycleLengths.push(diff);
  }
  const cycleLengthsReversed = [...cycleLengths].reverse();

  // Mini Chart
  useEffect(() => {
    if (chartRef.current && cycleLengthsReversed.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: cycleLengthsReversed.map((_, i) => `Cycle ${i + 1}`),
            datasets: [
              {
                label: "Days",
                data: cycleLengthsReversed,
                borderColor: "#E8567F",
                backgroundColor: "rgba(232,86,127,0.2)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#E8567F",
                pointRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { display: false, min: 15 },
              x: { display: false },
            },
          },
        });
      }
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [cycleLengthsReversed.length]);

  // Calendar logic
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getPhaseForDay = (date: Date) => {
    const start = new Date(lastPeriodStart + "T00:00:00");
    const diffTime = date.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;

    if (dayInCycle <= periodLength) return "menstrual";
    if (dayInCycle <= Math.round(cycleLength * 0.45)) return "follicular";
    if (dayInCycle <= Math.round(cycleLength * 0.55)) return "ovulation";
    return "luteal";
  };

  const isLoggedPeriodDay = (dateStr: string) => {
    return periodLogs.some((log) => {
      const start = log.start_date.split("T")[0];
      let end = log.end_date ? log.end_date.split("T")[0] : null;
      if (!end) {
        const startDate = new Date(start + "T00:00:00");
        startDate.setDate(startDate.getDate() + periodLength - 1);
        end = startDate.toISOString().split("T")[0];
      }
      return dateStr >= start && dateStr <= end;
    });
  };

  const isPredicted = (date: Date) => {
    const start = new Date(lastPeriodStart + "T00:00:00");
    const diffDays = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return false;
    const dayInCycle = (diffDays % cycleLength) + 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dayInCycle <= periodLength && date > today;
  };

  // Build calendar days
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push({ key: `empty-${i}`, empty: true });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split("T")[0];
    const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

    const logged = isLoggedPeriodDay(dateStr);
    const predicted = !logged && isPredicted(date);
    const phase = !logged && !predicted ? getPhaseForDay(date) : null;

    let emoji = "";
    let phaseClass = "";

    if (logged) {
      phaseClass = "menstrual";
      emoji = "🩸";
    } else if (predicted) {
      phaseClass = "predicted";
      emoji = "🔮";
    } else if (phase === "follicular") {
      phaseClass = "follicular";
      emoji = "🌿";
    } else if (phase === "ovulation") {
      phaseClass = "ovulation";
      emoji = "🌸";
    } else if (phase === "luteal") {
      phaseClass = "luteal";
      emoji = "🍂";
    }

    calendarCells.push({
      key: `day-${day}`,
      empty: false,
      day,
      isToday,
      phaseClass,
      emoji,
    });
  }

  return (
    <div className="bg-tracker">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Phase Banner */}
        <div
          className="tracker-banner"
          style={{ "--phase-color": phaseInfo.color } as React.CSSProperties}
          data-aos="zoom-in-up"
        >
          <div className="tracker-banner-left">
            <div
              className="phase-badge"
              style={{ background: `${phaseInfo.color}20`, color: phaseInfo.color }}
            >
              <i className={`fa-solid ${phaseInfo.icon}`}></i> {phaseInfo.name}
            </div>
            <p>{phaseInfo.description}</p>
          </div>
          <div className="tracker-banner-right">
            <div className="countdown">
              <span className="countdown-number">{daysUntil}</span>
              <span className="countdown-label">
                days until<br />next period
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            width: "100%",
            alignItems: "stretch",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Column 1: Calendar & Motivation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card calendar-card" data-aos="zoom-in-up" data-aos-delay="100">
              <div className="calendar-header">
                <button
                  type="button"
                  className="btn btn-icon"
                  id="prevMonth"
                  onClick={prevMonth}
                  aria-label="Previous month"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h3 id="calendarTitle">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h3>
                <button
                  type="button"
                  className="btn btn-icon"
                  id="nextMonth"
                  onClick={nextMonth}
                  aria-label="Next month"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              <div className="calendar-weekdays">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="calendar-grid" id="calendarGrid">
                {calendarCells.map((cell) => {
                  if (cell.empty) {
                    return <div key={cell.key} className="cal-day empty"></div>;
                  }
                  return (
                    <div
                      key={cell.key}
                      className={`cal-day ${cell.isToday ? "today" : ""} ${cell.phaseClass || ""}`}
                    >
                      {cell.day}
                      {cell.emoji && (
                        <div
                          style={{
                            fontSize: "12px",
                            lineHeight: 1,
                            marginTop: "2px",
                            animation: cell.phaseClass === "menstrual" ? "gentleFloat 2s infinite" : "none",
                          }}
                        >
                          {cell.emoji}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="calendar-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--phase-menstrual, #E8567F)" }}></span> Period
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--phase-follicular, #10B981)" }}></span> Follicular
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--phase-ovulation, #F59E0B)" }}></span> Ovulation
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ background: "var(--phase-luteal, #8B5CF6)" }}></span> Luteal
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot-predicted"></span> Predicted
                </div>
              </div>

              {/* Motivational Graphics */}
              <div
                style={{
                  marginTop: "40px",
                  padding: "24px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
                  borderRadius: "24px",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "100px",
                    height: "100px",
                    background: "radial-gradient(circle, rgba(232,86,127,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: "36px",
                    marginBottom: "12px",
                    animation: "gentleFloat 4s infinite",
                    color: "var(--color-primary)",
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <h4
                  style={{
                    fontSize: "16px",
                    color: "var(--color-primary)",
                    fontWeight: 800,
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Did You Know?
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 600,
                  }}
                >
                  {randomFact}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Info & Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Link
              href="/log-period"
              className="btn btn-primary"
              style={{
                width: "100%",
                borderRadius: "24px",
                padding: "16px",
                fontWeight: 800,
                fontSize: "16px",
                textAlign: "center",
              }}
              data-aos="zoom-in-up"
              data-aos-delay="150"
            >
              <i className="fa-solid fa-plus"></i> Log New Period
            </Link>

            {cycleLengthsReversed.length > 0 && (
              <div
                className="card calendar-card"
                style={{ padding: "20px" }}
                data-aos="zoom-in-up"
                data-aos-delay="200"
              >
                <h4
                  style={{
                    fontSize: "16px",
                    marginBottom: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <i className="fa-solid fa-chart-simple" style={{ color: "var(--color-primary)" }}></i> Cycle Trend
                </h4>
                <div style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }}>
                  <canvas ref={chartRef} height="100"></canvas>
                </div>
              </div>
            )}

            <div
              className="card calendar-card"
              style={{ padding: "20px" }}
              data-aos="zoom-in-up"
              data-aos-delay="250"
            >
              <h4 className="card-title" style={{ marginBottom: "20px" }}>
                Cycle Info
              </h4>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Average Cycle</span>
                  <span className="info-value">{cycleSettings.avg_cycle_length} days</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Average Period</span>
                  <span className="info-value">{cycleSettings.avg_period_length} days</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Period</span>
                  <span className="info-value">
                    {cycleSettings.last_period_start
                      ? new Date(cycleSettings.last_period_start).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Next Predicted</span>
                  <span className="info-value">
                    {cycleSettings.next_predicted_date
                      ? new Date(cycleSettings.next_predicted_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Regularity</span>
                  <span
                    className={`info-value badge badge-${
                      cycleSettings.cycle_regularity === "regular" ? "success" : "warning"
                    }`}
                  >
                    {cycleSettings.cycle_regularity
                      ? cycleSettings.cycle_regularity.charAt(0).toUpperCase() +
                        cycleSettings.cycle_regularity.slice(1)
                      : "Regular"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Recent Periods & Artwork */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              className="card calendar-card"
              style={{ padding: "20px" }}
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <h4 className="card-title">Recent Periods</h4>
              {periodLogs.length === 0 ? (
                <p className="text-muted" style={{ textAlign: "center", padding: "16px" }}>
                  No periods logged yet.
                </p>
              ) : (
                <div className="period-list">
                  {periodLogs.slice(0, 5).map((log, idx) => (
                    <div className="period-item" key={idx}>
                      <div className="period-dates">
                        <strong>
                          {new Date(log.start_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </strong>
                        {log.end_date ? (
                          <>
                            {" "}
                            —{" "}
                            {new Date(log.end_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </>
                        ) : (
                          <span className="badge badge-primary">Ongoing</span>
                        )}
                      </div>
                      <span className={`flow-indicator flow-${log.flow_intensity}`}>
                        {log.flow_intensity.charAt(0).toUpperCase() + log.flow_intensity.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="card"
              data-aos="fade-up"
              data-aos-delay="350"
              style={{
                flex: 1,
                padding: 0,
                overflow: "hidden",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid rgba(255,255,255,0.8)",
                background: "rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                minHeight: "250px",
              }}
            >
              <img
                src="/images/wellness_illustration.png"
                alt="Wellness Illustration"
                style={{ width: "100%", height: "auto", objectFit: "cover", opacity: 0.9 }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: "18px",
                    letterSpacing: "1px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    color: "white !important",
                  }}
                >
                  Honor Your Body&apos;s Rhythm
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
