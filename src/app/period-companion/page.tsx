import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Period Companion | Empathetic Menstrual & PMS Ally - HIM",
  description: "Meet your AI Period Companion on HIM (Her Intelligent Mate). Real-time PMS support, 24/7 empathetic chat, cycle tracking, and comforting voice interactions for women worldwide.",
  keywords: [
    "AI period companion",
    "period companion",
    "period AI companion",
    "PMS support AI",
    "menstrual companion AI",
    "AI companion for period",
    "empathetic period assistant",
    "her intelligent mate period companion"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/period-companion",
  },
  openGraph: {
    title: "AI Period Companion | Empathetic Menstrual & PMS Ally - HIM",
    description: "Discover the world's leading AI Period Companion. 24/7 emotional support, cycle phase prediction, and soothing voice interactions.",
    url: "https://www.herintelligentmate.in/period-companion",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM AI Period Companion" }],
  },
};

const periodCompanionSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.herintelligentmate.in/period-companion/#webpage",
  "url": "https://www.herintelligentmate.in/period-companion",
  "name": "AI Period Companion - Empathetic Menstrual & PMS Ally",
  "description": "Discover HIM's AI Period Companion, offering 24/7 empathetic conversation, phase tracking, and PMS relief for women globally.",
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  }
};

export default function PeriodCompanionPage() {
  return (
    <HomeClientWrapper>
      <JsonLd data={periodCompanionSchema} />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i></span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest">
            <Link href="/" className="nav-link-guest">Home</Link>
            <Link href="/feminine-ai-companion" className="nav-link-guest">Feminine AI</Link>
            <Link href="/cycle-tracking-ai" className="nav-link-guest">Cycle AI</Link>
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
                <i className="fa-solid fa-heart-pulse"></i> Targeted AI Period Companion
              </div>
              <h1 data-aos="fade-right">
                The World's Leading <span className="gradient-text">AI Period Companion</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Menstruation is more than just a biological event — it is a monthly journey of emotional, mental, and physical shifts. <strong>HIM (Her Intelligent Mate)</strong> is designed as your empathetic AI period companion, providing 24/7 understanding, PMS relief guidance, and soothing voice conversations tailored to every phase of your period.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Start Talking to HIM Free
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <img src="/images/wellness_illustration.png" alt="AI Period Companion Illustration" className="main-hero-img" />
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="section-header">
              <h2>Why You Need an AI Period Companion</h2>
              <p>Empathetic digital companionship calibrated specifically for menstrual health</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-face-smile-beam"></i>
                </div>
                <h3>24/7 Emotional Comfort</h3>
                <p>Feel heard during mood swings, anxiety, or low energy. HIM provides gentle, supportive dialogue without judgment.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-spa"></i>
                </div>
                <h3>PMS Symptom Guidance</h3>
                <p>Get personalized self-care recommendations for cramps, bloating, fatigue, and headaches mapped to your exact phase.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-microphone-lines"></i>
                </div>
                <h3>Hands-Free Voice Dialogue</h3>
                <p>When typing feels exhausting during painful cramp days, speak naturally with HIM using soothing voice synthesis.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2>Experience the #1 AI Period Companion Today</h2>
                <p>Join thousands of women who trust www.herintelligentmate.in for cycle comfort and empowerment.</p>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Create Your Account
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
