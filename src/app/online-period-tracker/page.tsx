import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd, { medicalWebPageSchema, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Online Period Tracker | Free AI Menstrual Cycle Calendar & PMS Tracker - HIM",
  description: "Use the best free online period tracker at herintelligentmate.in — AI-powered menstrual cycle calendar, PMS symptom tracker, ovulation predictor, fertility window calculator, and mood tracking. No download needed, 100% free, 100% private.",
  keywords: [
    "online period tracker",
    "period tracker online",
    "free period tracker",
    "period tracker website",
    "period calendar online",
    "period calculator",
    "menstrual cycle tracker",
    "menstruation tracker",
    "PMS tracker",
    "ovulation tracker",
    "ovulation calculator",
    "fertility tracker",
    "period prediction",
    "menstrual calendar",
    "best period tracker",
    "free period tracker online",
    "period tracker for women",
    "best online period tracker 2026",
    "herintelligentmate.in"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/online-period-tracker",
  },
  openGraph: {
    title: "Free Online Period Tracker | AI-Powered Cycle Calendar - HIM",
    description: "Track your period online, predict ovulation, manage PMS symptoms & more — 100% free, no download needed. Visit herintelligentmate.in.",
    url: "https://www.herintelligentmate.in/online-period-tracker",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM Online Period Tracker - herintelligentmate.in" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Online Period Tracker | herintelligentmate.in",
    description: "AI-powered online period tracker with cycle prediction, PMS relief & mood tracking. 100% free at herintelligentmate.in — no download needed.",
    images: ["/images/og-image.jpg"],
  },
};

const pageSchemas = [
  medicalWebPageSchema({
    url: "https://www.herintelligentmate.in/online-period-tracker",
    name: "Free Online Period Tracker - AI Cycle Calendar & PMS Tracker",
    description: "Best free online period tracker with AI menstrual cycle prediction, PMS tracking, and ovulation calculator at herintelligentmate.in.",
  }),
  breadcrumbSchema([
    { name: "Home", url: "https://www.herintelligentmate.in" },
    { name: "Online Period Tracker", url: "https://www.herintelligentmate.in/online-period-tracker" },
  ]),
];

export default function OnlinePeriodTrackerPage() {
  return (
    <HomeClientWrapper>
      <JsonLd data={pageSchemas} />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="HIM Homepage">
            <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i></span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest" aria-label="Main Navigation">
            <Link href="/" className="nav-link-guest">Home</Link>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
            <Link href="/wellness-for-women" className="nav-link-guest">Wellness</Link>
            <Link href="/feminine-ai-companion" className="nav-link-guest">Feminine AI</Link>
            <Link href="/blog" className="nav-link-guest">Articles</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started Free</Link>
          </nav>
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open Navigation Menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }}>
        <section className="hero-revamp" aria-labelledby="period-tracker-heading">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" data-aos="fade-down">
                <i className="fa-solid fa-calendar-check"></i> Best Free Online Period Tracker 2026
              </div>
              <h1 id="period-tracker-heading" data-aos="fade-right">
                The <span className="gradient-text">Best Free Online Period Tracker</span> Powered by AI
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Stop guessing when your period will arrive. <strong>HIM (Her Intelligent Mate)</strong> at <strong>herintelligentmate.in</strong> is the most accurate free online period tracker — using AI to predict your menstrual cycle, track ovulation windows, manage PMS symptoms, and provide personalized wellness guidance. No download needed — works right in your browser on any device.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Start Tracking Free
                </Link>
                <Link href="/cycle-tracking-ai" className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-chart-line" style={{ fontSize: "12px" }}></i> See Cycle AI
                </Link>
              </div>

              <div className="hero-stats" data-aos="fade-up" data-aos-delay="300">
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-primary)" }}>100%</div>
                  <div className="label">Free Forever</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-secondary)" }}>4</div>
                  <div className="label">Cycle Phases</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-sage)" }}>AI</div>
                  <div className="label">Predictions</div>
                </div>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <div className="central-woman-frame">
                <img src="/images/wellness_illustration.png" alt="HIM Online Period Tracker - Best Free Menstrual Cycle Calendar" className="main-hero-img" />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }} aria-labelledby="features-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                Why Women Choose HIM
              </span>
              <h2 id="features-heading">Everything a Period Tracker Should Be — Online & Free</h2>
              <p>Smarter than a calendar. More empathetic than any other period tracker. Works on any browser — no download needed.</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium" data-aos="fade-up">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h3>AI Period Prediction</h3>
                <p>Machine-learning algorithms that learn your unique cycle. Accurately predicts your next period, fertile window, and ovulation dates — improving with every cycle you log.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-face-smile-beam"></i>
                </div>
                <h3>PMS Symptom Tracker</h3>
                <p>Log cramps, bloating, headaches, mood swings, and fatigue. HIM correlates symptoms with your cycle phase and recommends targeted relief strategies.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h3>Ovulation & Fertility Tracker</h3>
                <p>Precise ovulation window tracking using your personalized cycle data. Know your most fertile days with AI confidence scoring.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="0">
                <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                  <i className="fa-solid fa-globe"></i>
                </div>
                <h3>Works on Any Browser</h3>
                <p>No download or installation needed. HIM works on Chrome, Safari, Firefox, Edge, and every mobile browser. Just visit herintelligentmate.in and start tracking.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-shield-heart"></i>
                </div>
                <h3>100% Private & Encrypted</h3>
                <p>Your period data stays yours. All cycle logs, mood journals, and conversations are end-to-end encrypted. HIM never sells or shares your health data.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-comment-dots"></i>
                </div>
                <h3>24/7 AI Companion Chat</h3>
                <p>More than a tracker — HIM is a companion. Chat about symptoms, get self-care advice, or just vent. Available anytime right in your browser.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box" data-aos="zoom-in">
              <div className="cta-content">
                <h2>Start Tracking Your Period Online for Free</h2>
                <p>Join thousands of women worldwide using the smartest free online period tracker at www.herintelligentmate.in — no download needed.</p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/register" className="btn btn-primary btn-lg" style={{ boxShadow: "0 10px 30px rgba(255, 112, 150, 0.4)" }}>
                    Create Free Account
                  </Link>
                  <Link href="/period-companion" className="btn btn-white btn-lg" style={{ background: "white", color: "var(--text-primary)" }}>
                    Learn About AI Period Companion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo" style={{ marginBottom: "16px" }}>
                <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "#FF7096" }}></i></span>
                <span className="logo-text" style={{ color: "#FFFFFF", WebkitTextFillColor: "#FFFFFF" }}>HIM</span>
              </div>
              <p>Her Intelligent Mate — The best free online period tracker & AI wellness companion at herintelligentmate.in.</p>
            </div>
            <div className="footer-links">
              <h4>Explore</h4>
              <Link href="/period-companion">AI Period Companion</Link>
              <Link href="/wellness-for-women">Wellness for Women</Link>
              <Link href="/feminine-ai-companion">Feminine AI Companion</Link>
              <Link href="/cycle-tracking-ai">Cycle Tracking AI</Link>
              <Link href="/blog">Wellness Articles</Link>
            </div>
            <div className="footer-links">
              <h4>Platform</h4>
              <Link href="/register">Get Started Free</Link>
              <Link href="/login">Login</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate (www.herintelligentmate.in). All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </HomeClientWrapper>
  );
}
