"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import Chart from "chart.js/auto";

export default function InsightsPage() {
  const chartRef1 = useRef<HTMLCanvasElement>(null);
  const chartRef2 = useRef<HTMLCanvasElement>(null);
  const chartRef3 = useRef<HTMLCanvasElement>(null);

  const cycleHistory = [
    { start_date: '2023-10-01', end_date: '2023-10-05', flow_intensity: 'medium' },
    { start_date: '2023-09-02', end_date: '2023-09-07', flow_intensity: 'heavy' },
    { start_date: '2023-08-04', end_date: '2023-08-09', flow_intensity: 'light' },
  ];
  
  const avgCycleLength = 28;
  const moodData = [
    { log_date: '2023-10-01', mood: 'happy', intensity: 8 },
    { log_date: '2023-10-02', mood: 'calm', intensity: 6 },
    { log_date: '2023-10-03', mood: 'tired', intensity: 4 },
  ];
  const symptomTotals = { cramps: 5, headache: 3, bloating: 4, fatigue: 6, mood_swings: 2, acne: 1, back_pain: 2, cravings: 4 };
  const cycleLengths = [29, 29, 28];
  const pcosFlag = false;

  useEffect(() => {
    AOS.init({ duration: 600, once: false });

    // Mood Chart
    if (chartRef1.current) {
      const ctx = chartRef1.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(255, 112, 150, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 112, 150, 0.0)');
        
        const moodMap: Record<string, number> = { happy:5, calm:4, neutral:3, tired:2, anxious:2, irritated:1, angry:1, sad:1 };

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: moodData.map(m => new Date(m.log_date).toLocaleDateString('en', {month:'short', day:'numeric'})),
            datasets: [{
              label: 'Mood Level',
              data: moodData.map(m => moodMap[m.mood] || 3),
              borderColor: '#FF85A1',
              backgroundColor: gradient,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#FF7096',
              pointRadius: 4,
              borderWidth: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const val = context.raw as number;
                    const text = ['','Sad','Tired','Neutral','Calm','Happy'][val] || 'Neutral';
                    return ` Mood: ${text} (Level ${val})`;
                  }
                }
              }
            },
            scales: {
              y: { min: 0, max: 6, ticks: { callback: (v: any) => ['','Sad','Tired','Neutral','Calm','Happy'][v] || '', font: { size: 12, family: "'Inter', sans-serif" }, color: getComputedStyle(document.documentElement).getPropertyValue('--text-muted') } },
              x: { ticks: { maxTicksLimit: 7, font: { family: "'Inter', sans-serif" }, color: getComputedStyle(document.documentElement).getPropertyValue('--text-muted') } }
            }
          }
        });
      }
    }

    // Symptom Chart
    if (chartRef2.current) {
      const symptomLabels = ['Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood Swings', 'Acne', 'Back Pain', 'Cravings'];
      const symptomValues = Object.values(symptomTotals);
      new Chart(chartRef2.current, {
        type: 'doughnut',
        data: {
          labels: symptomLabels,
          datasets: [{
            data: symptomValues,
            backgroundColor: [
              '#FF85A1', '#FFB3C6', '#FFC8DD', '#C9A8E8', '#FFAD8A', '#E8A0BF', '#A78BFA', '#FDA4AF'
            ],
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverOffset: 15
          }]
        },
        options: { 
          responsive: true, 
          maintainAspectRatio: false,
          plugins: { 
            legend: { 
              position: 'right', 
              labels: { 
                boxWidth: 12,
                padding: 15,
                font: { size: 12, family: "'Inter', sans-serif" } 
              } 
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0) as number;
                  const percentage = (((context.raw as number) / total) * 100).toFixed(1);
                  return ` ${context.label}: ${context.raw} logs (${percentage}%)`;
                }
              }
            }
          },
          cutout: '70%'
        }
      });
    }

    // Cycle Chart
    if (chartRef3.current) {
      new Chart(chartRef3.current, {
        type: 'bar',
        data: {
          labels: cycleLengths.map((_, i) => `Cycle ${i + 1}`),
          datasets: [{
            label: 'Cycle Length (Days)',
            data: cycleLengths,
            backgroundColor: cycleLengths.map(d => d >= 25 && d <= 35 ? 'rgba(255, 179, 198, 0.8)' : 'rgba(255, 112, 150, 0.8)'),
            borderRadius: 12
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const days = context.raw as number;
                  const status = days >= 25 && days <= 35 ? 'Regular' : 'Irregular';
                  return ` ${days} Days (${status})`;
                }
              }
            }
          },
          scales: { 
            y: { 
              beginAtZero: false, 
              min: 15, 
              title: { display: true, text: 'Number of Days', font: { weight: 'bold' } },
              ticks: { font: { family: "'Inter', sans-serif" } } 
            },
            x: { ticks: { font: { family: "'Inter', sans-serif" } } }
          }
        }
      });
    }
  }, []);

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px", maxWidth: "98%", paddingLeft: "20px", paddingRight: "20px" }}>
      <style dangerouslySetInnerHTML={{__html: `
        .glass-insight-card {
            background: var(--bg-card) !important;
            backdrop-filter: blur(25px) !important;
            -webkit-backdrop-filter: blur(25px) !important;
            border: 1px solid var(--border-light) !important;
            box-shadow: var(--shadow-md) !important;
            border-radius: 32px !important;
            padding: 40px !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .glass-insight-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg) !important;
        }
        .chart-container { position: relative; width: 100%; height: 350px; margin: 0 auto; }
        .symptom-container { position: relative; width: 100%; height: 350px; display: flex; justify-content: center; }
      `}} />

      <div data-aos="zoom-in-up" style={{ marginBottom: "40px", textAlign: "center" }}>
        <h2><i className="fa-solid fa-chart-line" style={{ color: "var(--color-secondary)" }}></i> Health Insights</h2>
        <p className="text-muted">Visual analytics of your mood, symptoms, and cycle patterns</p>
      </div>
      
      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", width: "100%", marginBottom: "40px" }} data-aos="zoom-in-up" data-aos-delay="100">
        <div className="card text-center glass-insight-card" style={{ padding: "30px", width: "100%" }}>
          <h4 style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Total Cycles Tracked</h4>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "var(--color-primary)" }}>{cycleHistory.length}</div>
        </div>
        <div className="card text-center glass-insight-card" style={{ padding: "30px", width: "100%" }}>
          <h4 style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Avg Cycle Length</h4>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "var(--color-secondary-dark)" }}>{avgCycleLength} days</div>
        </div>
        <div className="card text-center glass-insight-card" style={{ padding: "30px", width: "100%" }}>
          <h4 style={{ color: "var(--text-muted)", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Moods Logged</h4>
          <div style={{ fontSize: "48px", fontWeight: 900, color: "var(--color-sage)" }}>{moodData.length}</div>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px", width: "100%", marginBottom: "40px" }}>
        {/* Mood Trend Chart */}
        <div className="card glass-insight-card" data-aos="zoom-in-up" data-aos-delay="200" style={{ textAlign: "center", width: "100%" }}>
          <h3 className="card-title" style={{ marginBottom: "30px", fontSize: "22px", color: "var(--color-primary)" }}>Mood Trend (30 Days)</h3>
          <div className="chart-container">
            <canvas ref={chartRef1} id="moodChart"></canvas>
          </div>
        </div>
        
        {/* Symptom Distribution */}
        <div className="card glass-insight-card" data-aos="zoom-in-up" data-aos-delay="300" style={{ textAlign: "center", width: "100%" }}>
          <h3 className="card-title" style={{ marginBottom: "30px", fontSize: "22px", color: "var(--color-primary)" }}>Symptom Distribution</h3>
          <div className="symptom-container">
            <canvas ref={chartRef2} id="symptomChart"></canvas>
          </div>
        </div>
      </div>
      
      {/* Cycle Length History */}
      <div className="card glass-insight-card mb-3" data-aos="zoom-in-up" style={{ textAlign: "center", width: "100%", maxWidth: "1400px", margin: "0 auto 40px auto" }}>
        <h3 className="card-title" style={{ marginBottom: "30px", fontSize: "22px", color: "var(--color-primary)" }}>Cycle Length History</h3>
        <div className="chart-container" style={{ maxWidth: "100%" }}>
          <canvas ref={chartRef3} id="cycleChart"></canvas>
        </div>
        {/* Legend Indication */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px", fontSize: "13px", fontWeight: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "20px", background: "rgba(255, 179, 198, 0.8)", borderRadius: "4px" }}></span>
            <span style={{ color: "var(--text-secondary)" }}>Regular Cycle (25-35 days)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "20px", background: "rgba(255, 112, 150, 0.8)", borderRadius: "4px" }}></span>
            <span style={{ color: "var(--text-secondary)" }}>Irregular Cycle</span>
          </div>
        </div>
      </div>
      
      {/* PCOS Alert */}
      {pcosFlag && (
        <div className="card mb-3" data-aos="zoom-in-up" style={{ background: "var(--bg-card)", border: "1px solid var(--color-warning)" }}>
          <h3 style={{ color: "var(--color-warning)" }}><i className="fa-solid fa-triangle-exclamation"></i> Irregularity Detected</h3>
          <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
            Your cycle lengths vary significantly. This could indicate conditions like PCOS. 
            <strong>This is not a diagnosis</strong> — please consult a healthcare professional for proper evaluation.
          </p>
        </div>
      )}
      
      {/* Cycle History Table */}
      <div className="card glass-insight-card" data-aos="zoom-in-up" style={{ textAlign: "center", width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        <h3 className="card-title" style={{ marginBottom: "30px", fontSize: "22px", color: "var(--color-primary)" }}>Period History</h3>
        <div style={{ overflowX: "auto", width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "16px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                <th style={{ padding: "16px", textAlign: "center", color: "var(--text-primary)", fontWeight: 800 }}>Start</th>
                <th style={{ padding: "16px", textAlign: "center", color: "var(--text-primary)", fontWeight: 800 }}>End</th>
                <th style={{ padding: "16px", textAlign: "center", color: "var(--text-primary)", fontWeight: 800 }}>Duration</th>
                <th style={{ padding: "16px", textAlign: "center", color: "var(--text-primary)", fontWeight: 800 }}>Flow</th>
              </tr>
            </thead>
            <tbody>
              {cycleHistory.map((log, idx) => {
                const duration = log.end_date ? Math.floor((new Date(log.end_date).getTime() - new Date(log.start_date).getTime()) / (1000 * 3600 * 24)) + 1 : '—';
                return (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{new Date(log.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{log.end_date ? new Date(log.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : <span className="badge badge-primary">Ongoing</span>}</td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{duration !== '—' ? `${duration} days` : duration}</td>
                    <td style={{ padding: "16px" }}><span className={`flow-indicator flow-${log.flow_intensity}`}>{log.flow_intensity.charAt(0).toUpperCase() + log.flow_intensity.slice(1)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
