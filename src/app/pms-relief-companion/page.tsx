import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd, { medicalWebPageSchema, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PMS Relief Companion | AI-Powered PMS Symptom Support & Tracker - HIM",
  description: "Get personalized PMS relief with HIM at herintelligentmate.in. AI-powered PMS symptom tracking, cramp management, mood support, guided breathing, and empathetic companion chat for premenstrual syndrome relief.",
  keywords: [
    "PMS relief",
    "PMS relief online",
    "PMS tracker",
    "PMS support online",
    "PMS symptom tracker",
    "PMS companion",
    "premenstrual syndrome help",
    "PMS cramp relief",
    "PMS mood support",
    "PMS management online",
    "period cramp relief",
    "menstrual pain relief",
    "PMS self-care",
    "PMS AI companion",
    "herintelligentmate.in"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/pms-relief-companion",
  },
  openGraph: {
    title: "PMS Relief Companion | AI-Powered PMS Support - HIM",
    description: "Personalized PMS relief with AI symptom tracking, cramp management & empathetic companion chat at herintelligentmate.in.",
    url: "https://www.herintelligentmate.in/pms-relief-companion",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM PMS Relief Companion - herintelligentmate.in" }],
    type: "website",
  },
};

const pageSchemas = [
  medicalWebPageSchema({
    url: "https://www.herintelligentmate.in/pms-relief-companion",
    name: "PMS Relief Companion - AI-Powered PMS Symptom Support & Tracker",
    description: "Personalized PMS relief with AI symptom tracking, cramp management, mood support, and empathetic companion chat at herintelligentmate.in.",
  }),
  breadcrumbSchema([
    { name: "Home", url: "https://www.herintelligentmate.in" },
    { name: "PMS Relief Companion", url: "https://www.herintelligentmate.in/pms-relief-companion" },
  ]),
];

export default function PmsReliefCompanionPage() {
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
            <Link href="/wellness-for-women" className="nav-link-guest">Wellness</Link>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
            <Link href="/blog" className="nav-link-guest">Articles</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started Free</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }}>
        <section className="hero-revamp" aria-labelledby="pms-heading">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" data-aos="fade-down">
                <i className="fa-solid fa-hand-holding-heart"></i> AI-Powered PMS Relief
              </div>
              <h1 id="pms-heading" data-aos="fade-right">
                Your <span className="gradient-text">PMS Relief Companion</span> — Never Suffer Alone Again
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Premenstrual syndrome affects over 90% of women. <strong>HIM (Her Intelligent Mate)</strong> at <strong>herintelligentmate.in</strong> provides personalized PMS relief through AI-powered symptom tracking, evidence-based cramp management, mood stabilization techniques, and an empathetic companion who understands exactly what you're going through.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Get PMS Relief Now
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <img src="/images/wellness_illustration.png" alt="HIM PMS Relief Companion - AI Symptom Support" className="main-hero-img" />
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>How HIM Helps with PMS Relief</h2>
              <p>Targeted, phase-aware support for every premenstrual symptom</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium" data-aos="fade-up">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-notes-medical"></i>
                </div>
                <h3>PMS Symptom Tracker</h3>
                <p>Log cramps, bloating, breast tenderness, headaches, irritability, and fatigue. HIM correlates symptoms with your cycle phase for predictive relief planning.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-spa"></i>
                </div>
                <h3>Cramp Relief Protocols</h3>
                <p>Evidence-based cramp management: heat therapy guidance, magnesium-rich food suggestions, gentle pelvic tilts, and breathing exercises mapped to your pain intensity.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h3>Mood Stabilization Support</h3>
                <p>PMS mood swings are valid. HIM provides empathetic dialogue, cognitive reframing techniques, and guided mindfulness exercises to help you navigate emotional turbulence.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box" data-aos="zoom-in">
              <div className="cta-content">
                <h2>Get Personalized PMS Relief Today</h2>
                <p>Join women worldwide finding comfort with the AI PMS relief companion at www.herintelligentmate.in.</p>
                <Link href="/register" className="btn btn-primary btn-lg" style={{ boxShadow: "0 10px 30px rgba(255, 112, 150, 0.4)" }}>
                  Create Free Account
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
