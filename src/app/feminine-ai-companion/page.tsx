import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Feminine AI Companion | Empathetic AI for Women's Wellness - HIM",
  description: "Discover HIM — the world's leading Feminine AI Companion. Empowering women through empathetic conversation, hormonal phase tracking, emotional care, and total data privacy.",
  keywords: [
    "feminine AI companion",
    "AI companion for women",
    "feminine wellness AI",
    "empathetic AI women",
    "female AI assistant",
    "women health AI companion",
    "her intelligent mate feminine AI"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/feminine-ai-companion",
  },
  openGraph: {
    title: "Feminine AI Companion | Empathetic AI for Women's Wellness - HIM",
    description: "Discover the world's leading Feminine AI Companion built specifically for women's emotional and physical well-being.",
    url: "https://www.herintelligentmate.in/feminine-ai-companion",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM Feminine AI Companion" }],
  },
};

const feminineAiSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.herintelligentmate.in/feminine-ai-companion/#webpage",
  "url": "https://www.herintelligentmate.in/feminine-ai-companion",
  "name": "Feminine AI Companion - Empathetic AI for Women's Wellness",
  "description": "Discover HIM's Feminine AI Companion, offering emotional care, cycle phase awareness, and empathetic companion support built exclusively for women.",
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  }
};

export default function FeminineAiCompanionPage() {
  return (
    <HomeClientWrapper>
      <JsonLd data={feminineAiSchema} />
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
                <i className="fa-solid fa-sparkles"></i> Empathetic Feminine Technology
              </div>
              <h1 data-aos="fade-right">
                Empowering Women with a <span className="gradient-text">Feminine AI Companion</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                General AI assistants miss the nuances of female physiology and emotional rhythms. <strong>HIM (Her Intelligent Mate)</strong> is engineered as a dedicated <strong>Feminine AI Companion</strong> — understanding your body's subtle hormonal shifts, mood changes, and daily well-being needs with empathy and privacy.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Meet Your Feminine AI
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <img src="/images/wellness_parallax.png" alt="Feminine AI Companion Illustration" className="main-hero-img" />
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="section-header">
              <h2>What Makes HIM the Premier Feminine AI Companion?</h2>
              <p>Built from the ground up to support women's unique mental and physical health</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h3>Phase-Aware Intelligence</h3>
                <p>HIM tailors its conversation style, tone, and guidance whether you're in the Menstrual, Follicular, Ovulatory, or Luteal phase.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-shield-heart"></i>
                </div>
                <h3>100% Confidential & Secure</h3>
                <p>Your emotional thoughts and health logs are encrypted. Privacy is guaranteed for every woman using HIM.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-gem"></i>
                </div>
                <h3>Holistic Feminine Care</h3>
                <p>Combines mindfulness exercises, custom audiobooks, mood journals, and voice chat to support complete well-being.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2>Ready to Connect with Your Feminine AI Companion?</h2>
                <p>Join women globally on www.herintelligentmate.in.</p>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Get Started Free
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
