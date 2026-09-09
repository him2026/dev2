import { getSession } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

export default async function CycleTracker() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const userId = session.id;

  const { data: cycleSettings, error: cycleError } = await supabase
    .from("cycle_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (cycleError || !cycleSettings) {
    redirect("/dashboard");
  }

  const { data: periodLogsData } = await supabase
    .from("period_logs")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  const periodLogs = periodLogsData || [];

  const daysUntil = cycleSettings?.next_predicted_date 
    ? Math.ceil((new Date(cycleSettings.next_predicted_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    : 14;

  const phaseInfo = {
    name: "Follicular Phase",
    description: "High energy, great time to start new projects.",
    color: "#10B981", // Mint
    icon: "fa-leaf"
  };

  const facts = [
    "Your body burns 100-300 extra calories a day during your luteal phase! It's okay to indulge a little.",
    "Adequate sleep during your period can significantly reduce cramps and fatigue. Prioritize rest!",
    "Your pain tolerance and energy levels are highest during the follicular phase. Great time for a new workout!",
    "Hydration is your best friend. Drinking plenty of water reduces bloating and hormonal headaches.",
    "Your intuition, communication skills, and creativity actually peak during your ovulation phase!"
  ];
  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  // Calculate cycle lengths for mini chart
  const cycleLengths = [];
  for (let i = 0; i < Math.min(6, periodLogs.length - 1); i++) {
    const diff = Math.floor((new Date(periodLogs[i].start_date).getTime() - new Date(periodLogs[i+1].start_date).getTime()) / (1000 * 3600 * 24));
    cycleLengths.push(diff);
  }
  const cycleLengthsReversed = cycleLengths.reverse();

  return (
    <div className="bg-tracker">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        {/* Phase Banner */}
        <div className="tracker-banner" style={{ "--phase-color": phaseInfo.color } as React.CSSProperties} data-aos="zoom-in-up">
          <div className="tracker-banner-left">
            <div className="phase-badge" style={{ background: `${phaseInfo.color}20`, color: phaseInfo.color }}>
              <i className={`fa-solid ${phaseInfo.icon}`}></i> {phaseInfo.name}
            </div>
            <p>{phaseInfo.description}</p>
          </div>
          <div className="tracker-banner-right">
            <div className="countdown">
              <span className="countdown-number">{daysUntil > 0 ? daysUntil : 0}</span>
              <span className="countdown-label">days until<br />next period</span>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", width: "100%", alignItems: "stretch", maxWidth: "1400px", margin: "0 auto" }}>
          
          {/* Column 1: Calendar & Motivation */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card calendar-card" data-aos="zoom-in-up" data-aos-delay="100">
              <div className="calendar-header">
                <button className="btn btn-icon" id="prevMonth" aria-label="Previous month">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h3 id="calendarTitle">Calendar (Static)</h3>
                <button className="btn btn-icon" id="nextMonth" aria-label="Next month">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
              <div className="calendar-weekdays">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="calendar-grid" id="calendarGrid">
                {/* Dummy Grid for visual similarity */}
                <div className="calendar-day text-muted">28</div>
                <div className="calendar-day text-muted">29</div>
                <div className="calendar-day text-muted">30</div>
                <div className="calendar-day text-muted">31</div>
                <div className="calendar-day">1</div>
                <div className="calendar-day">2</div>
                <div className="calendar-day">3</div>
                {/* Add more as needed by JS tracker logic */}
              </div>
              
              <div className="calendar-legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: "var(--phase-menstrual)" }}></span> Period</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: "var(--phase-follicular)" }}></span> Follicular</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: "var(--phase-ovulation)" }}></span> Ovulation</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: "var(--phase-luteal)" }}></span> Luteal</div>
                <div className="legend-item"><span className="legend-dot legend-dot-predicted"></span> Predicted</div>
              </div>
              
              <div style={{ marginTop: "40px", padding: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))", borderRadius: "24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 10px 20px rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(232,86,127,0.1) 0%, transparent 70%)", borderRadius: "50%" }}></div>
                <div style={{ fontSize: "36px", marginBottom: "12px", animation: "gentleFloat 4s infinite", color: "var(--color-primary)" }}><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                <h4 style={{ fontSize: "16px", color: "var(--color-primary)", fontWeight: 800, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Did You Know?</h4>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, fontWeight: 600 }}>
                  {randomFact}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Info & Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Link href="/log-period" className="btn btn-primary" style={{ width: "100%", borderRadius: "24px", padding: "16px", fontWeight: 800, fontSize: "16px" }} data-aos="zoom-in-up" data-aos-delay="150">
              <i className="fa-solid fa-plus"></i> Log New Period
            </Link>
            
            {cycleLengthsReversed.length > 0 && (
              <div className="card calendar-card" style={{ padding: "20px" }} data-aos="zoom-in-up" data-aos-delay="200">
                <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-secondary)" }}><i className="fa-solid fa-chart-simple" style={{ color: "var(--color-primary)" }}></i> Cycle Trend</h4>
                <div style={{ width: "100%", maxWidth: "200px", margin: "0 auto" }}>
                  <canvas id="miniCycleChart" height="100"></canvas>
                </div>
              </div>
            )}
            
            <div className="card calendar-card" style={{ padding: "20px" }} data-aos="zoom-in-up" data-aos-delay="250">
              <h4 className="card-title" style={{ marginBottom: "20px" }}>Cycle Info</h4>
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
                  <span className="info-value">{cycleSettings.last_period_start ? new Date(cycleSettings.last_period_start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Next Predicted</span>
                  <span className="info-value">{cycleSettings.next_predicted_date ? new Date(cycleSettings.next_predicted_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Regularity</span>
                  <span className={`info-value badge badge-${cycleSettings.cycle_regularity === 'regular' ? 'success' : 'warning'}`}>
                    {cycleSettings.cycle_regularity?.charAt(0).toUpperCase() + cycleSettings.cycle_regularity?.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Recent Periods & Artwork */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="card calendar-card" style={{ padding: "20px" }} data-aos="zoom-in-up" data-aos-delay="300">
              <h4 className="card-title">Recent Periods</h4>
              {periodLogs.length === 0 ? (
                <p className="text-muted" style={{ textAlign: "center", padding: "16px" }}>No periods logged yet.</p>
              ) : (
                <div className="period-list">
                  {periodLogs.slice(0, 5).map((log: any, idx: number) => (
                    <div className="period-item" key={idx}>
                      <div className="period-dates">
                        <strong>{new Date(log.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</strong>
                        {log.end_date ? (
                          <> — {new Date(log.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</>
                        ) : (
                          <span className="badge badge-primary">Ongoing</span>
                        )}
                      </div>
                      <span className={`flow-indicator flow-${log.flow_intensity}`}>
                        {log.flow_intensity?.charAt(0).toUpperCase() + log.flow_intensity?.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="card" data-aos="fade-up" data-aos-delay="350" style={{ flex: 1, padding: 0, overflow: "hidden", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "250px" }}>
              <img src="/images/wellness_illustration.png" alt="Wellness Illustration" style={{ width: "100%", height: "auto", objectFit: "cover", opacity: 0.9 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)", color: "white", textAlign: "center" }}>
                <h4 style={{ margin: 0, fontWeight: 800, fontSize: "18px", letterSpacing: "1px", textShadow: "0 2px 4px rgba(0,0,0,0.3)", color: "white !important" }}>Honor Your Body's Rhythm</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
