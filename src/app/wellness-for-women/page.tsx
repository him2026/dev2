import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd, { medicalWebPageSchema, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Wellness for Women | AI-Powered Female Health & Self-Care Platform - HIM",
  description: "HIM (Her Intelligent Mate) at herintelligentmate.in is the #1 wellness platform for women. AI-powered mood tracking, menstrual health insights, guided breathing, mindfulness audiobooks, and empathetic companion chat designed for women's holistic well-being. Free online — no download needed.",
  keywords: [
    "wellness for women",
    "women wellness",
    "women wellness website",
    "female wellness platform",
    "women health website",
    "women self-care online",
    "feminine wellness",
    "women mental health support",
    "mood tracker for women",
    "women mindfulness",
    "wellness companion for women",
    "holistic health women",
    "women wellness tracker",
    "self care for women",
    "women health India",
    "best wellness platform for women",
    "herintelligentmate.in"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/wellness-for-women",
  },
  openGraph: {
    title: "Wellness for Women | AI Female Health & Self-Care - HIM",
    description: "Complete wellness platform for women: mood tracking, menstrual insights, guided breathing, mindfulness & empathetic AI chat — free online at herintelligentmate.in.",
    url: "https://www.herintelligentmate.in/wellness-for-women",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM Wellness for Women - herintelligentmate.in" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Wellness Platform for Women | herintelligentmate.in",
    description: "AI-powered wellness companion for women. Mood tracking, cycle insights, guided breathing & mindfulness — free at herintelligentmate.in.",
    images: ["/images/og-image.jpg"],
  },
};

const pageSchemas = [
  medicalWebPageSchema({
    url: "https://www.herintelligentmate.in/wellness-for-women",
    name: "Wellness for Women - AI-Powered Female Health & Self-Care Platform",
    description: "Complete AI wellness platform for women with mood tracking, menstrual health insights, guided breathing, and empathetic companion chat at herintelligentmate.in.",
  }),
  breadcrumbSchema([
    { name: "Home", url: "https://www.herintelligentmate.in" },
    { name: "Wellness for Women", url: "https://www.herintelligentmate.in/wellness-for-women" },
  ]),
];

export default function WellnessForWomenPage() {
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
            <Link href="/online-period-tracker" className="nav-link-guest">Period Tracker</Link>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
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
        <section className="hero-revamp" aria-labelledby="wellness-heading">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" data-aos="fade-down">
                <i className="fa-solid fa-spa"></i> #1 Wellness Platform for Women
              </div>
              <h1 id="wellness-heading" data-aos="fade-right">
                Complete <span className="gradient-text">Wellness for Women</span> — Mind, Body & Cycle
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Women's health is more than just period tracking. <strong>HIM (Her Intelligent Mate)</strong> at <strong>herintelligentmate.in</strong> is a comprehensive wellness platform for women that integrates mood journaling, menstrual health intelligence, guided breathing exercises, mindfulness audiobooks, and an AI companion that truly understands feminine well-being. Free online — works on any browser, no download needed.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Start Your Wellness Journey
                </Link>
                <Link href="/online-period-tracker" className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-calendar" style={{ fontSize: "12px" }}></i> Period Tracker
                </Link>
              </div>

              <div className="hero-stats" data-aos="fade-up" data-aos-delay="300">
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-primary)" }}>6+</div>
                  <div className="label">Wellness Features</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-secondary)" }}>24/7</div>
                  <div className="label">AI Companion</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-sage)" }}>100%</div>
                  <div className="label">Free & Private</div>
                </div>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <div className="central-woman-frame">
                <img src="/images/wellness_illustration.png" alt="HIM Wellness for Women - Complete Female Health & Self-Care Platform" className="main-hero-img" />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }} aria-labelledby="wellness-features-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span style={{ color: "var(--color-secondary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                Holistic Feminine Wellness
              </span>
              <h2 id="wellness-features-heading">Everything You Need for Women&apos;s Wellness — Online & Free</h2>
              <p>A complete digital sanctuary for women's physical, emotional, and mental well-being. No downloads, works on any browser.</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium" data-aos="fade-up">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-face-smile"></i>
                </div>
                <h3>Mood Journaling & Tracking</h3>
                <p>Track emotional states daily with emoji-based mood logging. Visualize mood patterns correlated with your menstrual cycle phases over weeks and months.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <h3>Menstrual Health Intelligence</h3>
                <p>AI-powered cycle phase tracking with personalized insights for each phase — Menstrual, Follicular, Ovulatory, and Luteal — tailored to your body.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-wind"></i>
                </div>
                <h3>Guided Breathing & Relaxation</h3>
                <p>Clinically-inspired breathing exercises — 4-4-6 box breathing, progressive muscle relaxation, and calming voice-guided meditation for stress and PMS relief.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up">
                <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3>Wellness Audiobooks Library</h3>
                <p>Curated feminine wellness audiobooks covering mindfulness, body positivity, hormonal health, and self-care — perfect for winding down on heavy flow days.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <h3>Gamified Wellness Streaks</h3>
                <p>Earn badges and build streaks for consistent mood logging, self-care routines, and health check-ins. Making wellness fun and rewarding.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3>Deep Health Analytics</h3>
                <p>Visualize your wellness data over months — mood trends, symptom correlation, cycle irregularity detection, and personalized health insights.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box" data-aos="zoom-in">
              <div className="cta-content">
                <h2>Start Your Wellness Journey Today — Free Online</h2>
                <p>Join thousands of women worldwide using the most complete wellness platform for women at www.herintelligentmate.in.</p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/register" className="btn btn-primary btn-lg" style={{ boxShadow: "0 10px 30px rgba(255, 112, 150, 0.4)" }}>
                    Create Free Account
                  </Link>
                  <Link href="/feminine-ai-companion" className="btn btn-white btn-lg" style={{ background: "white", color: "var(--text-primary)" }}>
                    Meet Your AI Companion
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
              <p>Her Intelligent Mate — The #1 wellness platform for women & AI health companion at herintelligentmate.in.</p>
            </div>
            <div className="footer-links">
              <h4>Explore</h4>
              <Link href="/online-period-tracker">Online Period Tracker</Link>
              <Link href="/period-companion">AI Period Companion</Link>
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
