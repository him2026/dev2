import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cycle Tracking AI | Menstrual Cycle Predictor & Insights - HIM",
  description: "Master your 4 cycle phases with HIM's Cycle Tracking AI. Intelligent period prediction, ovulation estimation, mood correlation, and hormonal insights for women globally.",
  keywords: [
    "cycle tracking AI",
    "AI period tracker",
    "menstrual cycle AI",
    "ovulation predictor AI",
    "period cycle insights",
    "hormonal phase tracker",
    "her intelligent mate cycle tracking"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/cycle-tracking-ai",
  },
  openGraph: {
    title: "Cycle Tracking AI | Menstrual Cycle Predictor & Insights - HIM",
    description: "Predict your period and master all 4 cycle phases with advanced AI cycle tracking on HIM.",
    url: "https://www.herintelligentmate.in/cycle-tracking-ai",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM Cycle Tracking AI" }],
  },
};

const cycleTrackingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.herintelligentmate.in/cycle-tracking-ai/#webpage",
  "url": "https://www.herintelligentmate.in/cycle-tracking-ai",
  "name": "Cycle Tracking AI - Menstrual Cycle Predictor & Insights",
  "description": "Predict period dates, track ovulation, analyze mood trends, and receive phase recommendations using HIM Cycle Tracking AI.",
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  }
};

export default function CycleTrackingAiPage() {
  return (
    <HomeClientWrapper>
      <JsonLd data={cycleTrackingSchema} />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i></span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest">
            <Link href="/" className="nav-link-guest">Home</Link>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
            <Link href="/feminine-ai-companion" className="nav-link-guest">Feminine AI</Link>
            <Link href="/blog" className="nav-link-guest">Articles</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }}>
        <section className="hero-revamp">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" data-aos="fade-down">
                <i className="fa-solid fa-chart-line"></i> Advanced Algorithmic Predictions
              </div>
              <h1 data-aos="fade-right">
                Next-Generation <span className="gradient-text">Cycle Tracking AI</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Unlock deep clarity into your body with <strong>HIM's Cycle Tracking AI</strong>. Our predictive engine maps out your exact cycle phases — Menstrual, Follicular, Ovulatory, and Luteal — providing smart notifications, energy forecasts, and symptom tracking.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Start Tracking Free
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <img src="/images/wellness_illustration.png" alt="Cycle Tracking AI Visual" className="main-hero-img" />
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="section-header">
              <h2>Master the 4 Phases of Your Cycle</h2>
              <p>HIM provides tailored AI guidance for each hormonal transition</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-droplet"></i>
                </div>
                <h3>1. Menstrual Phase</h3>
                <p>Rest, recharge, and receive gentle cramp relief protocols, cozy audiobooks, and empathetic AI check-ins.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <h3>2. Follicular Phase</h3>
                <p>Capitalize on rising estrogen and energy levels. Perfect timing for strategic planning, creativity, and workout goals.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                  <i className="fa-solid fa-sun"></i>
                </div>
                <h3>3. Ovulatory Phase</h3>
                <p>Peak social confidence and communication energy. Track fertility windows and maximize your radiant vitality.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-moon"></i>
                </div>
                <h3>4. Luteal Phase</h3>
                <p>Prepare for pre-period changes with grounding exercises, PMS emotional support, and soothing bedtime routines.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2>Take Control of Your Menstrual Health Today</h2>
                <p>Join thousands of women leveraging Cycle Tracking AI on www.herintelligentmate.in.</p>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Create Your Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate (www.herintelligentmate.in). All Rights Reserved.</p>
        </div>
      </footer>
    </HomeClientWrapper>
  );
}
