"use client";

import { useState, useEffect } from "react";
import AOS from "aos";

export default function WellnessHub() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const phaseInfo = {
    name: "Follicular Phase",
    color: "#10B981",
  };

  const vibe = { text: "Blooming energy" };

  const tips = [
    { category_icon: 'fa-leaf', category_name: 'Cycle', title: 'Seed Cycling', body: 'Add pumpkin and flax seeds to your diet to support healthy estrogen production.' },
    { category_icon: 'fa-bolt', category_name: 'Energy', title: 'Morning Light', body: 'Get 15 minutes of sunlight first thing in the morning to regulate your circadian rhythm.' },
    { category_icon: 'fa-brain', category_name: 'Mental', title: 'Set Intentions', body: 'Your brain is primed for new beginnings. Write down 3 goals for this cycle.' },
  ];

  const curated = [
    { cat: 'cycle', tag: 'Cycle Health', title: 'Understanding Your Menstrual Cycle', desc: 'Learn the 4 phases and how each affects your mood, energy, and body.', read: '8 min', url: 'https://www.healthline.com/health/womens-health/stages-of-menstrual-cycle', full: 'Your menstrual cycle is a powerful monthly rhythm divided into 4 phases.<br><br><strong>Menstrual phase (Days 1-5):</strong> Hormone levels drop, causing the uterine lining to shed. Rest and iron-rich foods are essential.<br><br><strong>Follicular phase (Days 6-13):</strong> Estrogen rises as follicles develop. Energy and creativity peak — great time to start new projects.<br><br><strong>Ovulation (Day 14):</strong> An egg is released. You may feel more social, confident and energized.<br><br><strong>Luteal phase (Days 15-28):</strong> Progesterone rises. You may experience PMS symptoms like bloating or mood swings. Prioritize gentle movement and magnesium-rich foods.<br><br>Understanding this cycle helps you work <em>with</em> your body, not against it.' },
    { cat: 'nutrition', tag: 'Nutrition', title: 'Best Foods to Eat During Your Period', desc: 'From dark chocolate to leafy greens, discover the foods that reduce cramps, bloating and fatigue.', read: '6 min', url: 'https://www.healthline.com/nutrition/foods-to-eat-on-your-period', full: 'What you eat during your period can dramatically affect how you feel.<br><br><strong>Dark berries & leafy greens</strong> — rich in iron and antioxidants to replenish blood loss.<br><strong>Dark chocolate (70%+)</strong> — contains magnesium which eases cramps and boosts serotonin.<br><strong>Fatty fish (salmon, sardines)</strong> — omega-3s reduce inflammation and period pain.<br><strong>Turmeric & ginger</strong> — natural anti-inflammatory agents that relieve cramps.<br><strong>Avocado</strong> — healthy fats and potassium to reduce bloating.<br><br><strong>Avoid:</strong> Excess salt, caffeine, processed sugars.<br><br>Eating mindfully during your cycle is one of the most powerful tools you have for wellness.' },
    { cat: 'mental', tag: 'Mental Health', title: 'How Hormones Affect Your Mood', desc: 'Estrogen, progesterone, serotonin — understand the connection between your cycle and emotional wellbeing.', read: '7 min', url: 'https://www.verywellmind.com/how-hormones-affect-mental-health-5215466', full: 'Hormones are your brain\'s chemical messengers, and they fluctuate significantly throughout your cycle.<br><br><strong>Estrogen</strong> boosts serotonin and dopamine. When estrogen is high (follicular/ovulation), many feel happy and motivated.<br><br><strong>Progesterone</strong> has a calming effect but can also cause fatigue when it drops sharply.<br><br><strong>PMS & PMDD:</strong> In the luteal phase, the drop in estrogen can trigger anxiety, irritability, and sadness. This is completely normal.<br><br><strong>Tips:</strong><br>- Journal your emotions daily<br>- Exercise releases endorphins<br>- Limit alcohol' },
    { cat: 'fitness', tag: 'Fitness', title: 'Cycle Syncing Your Workouts', desc: 'Discover how to align your exercise routine with your menstrual phases for maximum results.', read: '9 min', url: 'https://www.mindbodygreen.com/articles/cycle-syncing-workouts', full: 'Cycle syncing means adapting your lifestyle — including workouts — to match your hormonal phases.<br><br><strong>Menstrual:</strong> Rest or gentle yoga.<br><br><strong>Follicular:</strong> Energy is rising! Cardio, HIIT, dance.<br><br><strong>Ovulation:</strong> Peak strength and endurance. Heavy lifting, intense runs.<br><br><strong>Luteal:</strong> Shift to moderate intensity. Pilates, swimming, barre.' },
    { cat: 'sleep', tag: 'Sleep', title: 'Why Your Sleep Changes With Your Cycle', desc: 'Progesterone, body temperature, and insomnia — the surprising ways hormones disrupt sleep.', read: '5 min', url: 'https://www.sleepfoundation.org/women-sleep/menstrual-cycle-and-sleep', full: 'Sleep quality and duration shift throughout your cycle.<br><br><strong>Follicular:</strong> Sleep is generally great.<br><br><strong>Ovulation:</strong> A small LH surge can slightly raise body temp, causing lighter sleep.<br><br><strong>Luteal:</strong> Progesterone rises — natural sedative, but the drop before period causes insomnia for many.<br><br><strong>Menstrual:</strong> Cramps can disrupt sleep. Heating pad helps.' },
    { cat: 'mental', tag: 'Self-Care', title: 'Building a Period Self-Care Routine', desc: 'Simple, science-backed rituals that ease PMS, reduce stress, and help you feel your best.', read: '6 min', url: 'https://www.self.com/story/period-self-care', full: 'A thoughtful self-care routine tuned to your cycle can transform how you experience each month.<br><br><strong>Morning:</strong> Warm lemon water, stretch, journal.<br><br><strong>Movement:</strong> 15 mins reduces cramps by 30%.<br><br><strong>Nutrition:</strong> Batch-cook iron-rich meals.<br><br><strong>Evening:</strong> Epsom salt baths relax muscles.' },
  ];

  const filteredArticles = activeFilter === "all" ? curated : curated.filter(a => a.cat === activeFilter);

  return (
    <div className="content-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        
        <div className="section-header" style={{ textAlign: "center", marginBottom: "32px" }}>
          <div className="text-reveal-wrapper">
            <h2 className="text-reveal" style={{ fontSize: "36px", textShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <i className="fa-solid fa-spa" style={{ color: "var(--color-sage)" }}></i> Wellness Hub
            </h2>
          </div>
          <br />
          <div className="text-reveal-wrapper" style={{ marginTop: "8px" }}>
            <p className="text-reveal" style={{ color: "var(--text-secondary)", fontSize: "18px", animationDelay: "0.2s" }}>
              Embrace your <span style={{ color: phaseInfo.color, fontWeight: 700, background: "var(--color-primary-light)", padding: "2px 10px", borderRadius: "12px" }}>{phaseInfo.name}</span>. {vibe.text}
            </p>
          </div>
        </div>

        {/* Affirmation Banner */}
        <div className="card" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", marginBottom: "30px", textAlign: "center", padding: "40px", position: "relative", overflow: "hidden" }} data-aos="zoom-in-up">
          <p style={{ fontSize: "14px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: "var(--color-primary)", marginBottom: "12px" }}>Daily Affirmation</p>
          <h3 style={{ fontSize: "26px", marginBottom: "12px", fontWeight: 800, color: "var(--text-primary)" }}>I am growing, learning, and expanding.</h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", fontSize: "16px", lineHeight: 1.6 }}>My potential is limitless. I embrace new beginnings and the energy of fresh starts.</p>
        </div>

        {/* Tips Grid */}
        <div style={{ textAlign: "center" }}>
          <div className="text-reveal-wrapper mb-3">
            <h3 className="text-reveal" style={{ fontSize: "22px" }}>Nurturing Tips for Your {phaseInfo.name}</h3>
          </div>
        </div>
        <div className="grid grid-3 mb-4">
          {tips.map((tip, i) => (
            <div key={i} className="card" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-light)", textAlign: "center" }} data-aos="zoom-in-up" data-aos-delay={(i % 3) * 100}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                  <i className={`fa-solid ${tip.category_icon}`}></i>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>{tip.category_name}</span>
                </div>
              </div>
              <h4 style={{ marginBottom: "8px", fontSize: "17px" }}>{tip.title}</h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{tip.body}</p>
            </div>
          ))}
        </div>

        {/* Curated Article Library */}
        <div style={{ width: "100%", marginBottom: "40px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }} data-aos="zoom-in-up">
            <h3 style={{ fontSize: "26px", fontWeight: 800 }}>Wellness Library</h3>
            <p style={{ color: "var(--text-muted)", marginTop: "6px" }}>Curated reads for every phase of your cycle</p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .art-filter {
                padding: 8px 20px; border-radius: 50px; border: 2px solid var(--color-primary-light);
                background: white; color: var(--color-primary); font-weight: 700; font-size: 13px;
                cursor: pointer; transition: all 0.2s;
            }
            .art-filter.active, .art-filter:hover {
                background: var(--color-primary); color: white; border-color: var(--color-primary);
            }
            .art-card:hover {
                transform: translateY(-6px) !important;
                box-shadow: var(--shadow-lg) !important;
                border-color: var(--color-primary) !important;
            }
          `}} />

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "28px" }}>
            {[
              { id: "all", label: "All" },
              { id: "cycle", label: "Cycle" },
              { id: "nutrition", label: "Nutrition" },
              { id: "mental", label: "Mental Health" },
              { id: "fitness", label: "Fitness" },
              { id: "sleep", label: "Sleep" },
            ].map(f => (
              <button
                key={f.id}
                className={`art-filter ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px", width: "100%" }}>
            {filteredArticles.map((a, i) => (
              <div
                key={i}
                className="art-card"
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 80}
                style={{ background: "var(--bg-card)", backdropFilter: "blur(16px)", border: "1px solid var(--border-light)", borderRadius: "24px", padding: "28px", cursor: "pointer", transition: "all 0.3s ease", textAlign: "left", boxSizing: "border-box" }}
                onClick={() => setSelectedArticle(a)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "11px", fontWeight: 800, padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{a.tag}</span>
                  <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--text-muted)" }}>Time: {a.read}</span>
                </div>
                <h4 style={{ fontSize: "17px", fontWeight: 800, marginBottom: "10px", color: "var(--text-primary)", textAlign: "left" }}>{a.title}</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "left" }}>{a.desc}</p>
                <div style={{ marginTop: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <button className="btn btn-primary" style={{ padding: "8px 18px", fontSize: "13px", borderRadius: "20px" }}>Read Article</button>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: "12px", color: "var(--text-muted)", textDecoration: "none" }}>Source</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Care Reminders */}
        <div className="card" style={{ background: "var(--bg-card)", backdropFilter: "blur(10px)", border: "1px solid var(--border-light)", padding: "40px", textAlign: "center" }} data-aos="zoom-in-up">
          <h3 style={{ marginBottom: "24px", fontSize: "24px" }}><i className="fa-solid fa-bell" style={{ color: "var(--color-sage)" }}></i> Gentle Reminders</h3>

          <div className="grid grid-4">
            <div style={{ transition: "transform 0.3s" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: "40px", marginBottom: "12px", color: "var(--color-primary)" }}><i className="fa-solid fa-droplet"></i></div>
              <p style={{ fontSize: "14px", fontWeight: 700 }}>Stay Hydrated</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Sip water throughout the day</p>
            </div>
            <div style={{ transition: "transform 0.3s" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: "40px", marginBottom: "12px", color: "var(--color-sage)" }}><i className="fa-solid fa-couch"></i></div>
              <p style={{ fontSize: "14px", fontWeight: 700 }}>Move Gently</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Listen to your body's needs</p>
            </div>
            <div style={{ transition: "transform 0.3s" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: "40px", marginBottom: "12px", color: "var(--color-secondary-dark)" }}><i className="fa-solid fa-bed"></i></div>
              <p style={{ fontSize: "14px", fontWeight: 700 }}>Rest Well</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Prioritize your beauty sleep</p>
            </div>
            <div style={{ transition: "transform 0.3s" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: "40px", marginBottom: "12px", color: "var(--color-warning)" }}><i className="fa-solid fa-apple-whole"></i></div>
              <p style={{ fontSize: "14px", fontWeight: 700 }}>Nourish</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Fuel yourself with love</p>
            </div>
          </div>
        </div>

      </div>

      {/* Article Modal Reader */}
      {selectedArticle && (
        <div style={{ display: "flex", position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedArticle(null)}>
          <div style={{ background: "var(--bg-card)", borderRadius: "32px", maxWidth: "760px", width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 40px 80px rgba(0,0,0,0.2)", position: "relative", padding: "48px 40px" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedArticle(null)} style={{ position: "absolute", top: "20px", right: "20px", background: "var(--color-primary-light)", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "18px", cursor: "pointer", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>&times;</button>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div>
                <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "11px", fontWeight: 800, padding: "4px 12px", borderRadius: "20px" }}>{selectedArticle.tag}</span>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Time: {selectedArticle.read}</div>
              </div>
            </div>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-primary)", marginBottom: "20px", lineHeight: 1.3 }}>{selectedArticle.title}</h2>
            <div style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: selectedArticle.full }}></div>
            
            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ borderRadius: "20px", fontSize: "14px", padding: "10px 24px" }}>Read Full Article</a>
              <button onClick={() => setSelectedArticle(null)} style={{ background: "transparent", border: "2px solid var(--border-color)", borderRadius: "20px", padding: "10px 24px", fontSize: "14px", cursor: "pointer", color: "var(--text-secondary)", fontWeight: 700 }}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
