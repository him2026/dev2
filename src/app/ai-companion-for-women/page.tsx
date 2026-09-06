import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI Companion for Women | Empathetic Female AI Assistant - HIM",
  description: "Discover HIM — the premier AI Companion for Women. Empowering women globally with empathetic 24/7 conversation, menstrual cycle intelligence, mood tracking, and complete privacy.",
  keywords: [
    "AI companion for women",
    "women AI companion",
    "female AI companion",
    "AI for women",
    "female AI assistant",
    "women wellness AI companion",
    "her intelligent mate AI for women"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/ai-companion-for-women",
  },
  openGraph: {
    title: "AI Companion for Women | Empathetic Female AI Assistant - HIM",
    description: "Discover the world's leading AI Companion for Women built specifically for female health, emotional care, and cycle wellness.",
    url: "https://www.herintelligentmate.in/ai-companion-for-women",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM AI Companion for Women" }],
  },
};

const aiCompanionForWomenSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.herintelligentmate.in/ai-companion-for-women/#webpage",
  "url": "https://www.herintelligentmate.in/ai-companion-for-women",
  "name": "AI Companion for Women - Empathetic Female AI Assistant",
  "description": "Discover HIM's AI Companion for Women, offering 24/7 empathetic chat, cycle tracking, and emotional care built exclusively for women.",
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  }
};

export default function AiCompanionForWomenPage() {
  return (
    <HomeClientWrapper>
      <JsonLd data={aiCompanionForWomenSchema} />
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
                <i className="fa-solid fa-heart"></i> World's #1 AI Companion for Women
              </div>
              <h1 data-aos="fade-right">
                Empathetic <span className="gradient-text">AI Companion for Women</span>
              </h1>
              <p data-aos="fade-right" data-aos-delay="100">
                Women deserve technology that truly gets them. <strong>HIM (Her Intelligent Mate)</strong> is designed as the ultimate <strong>AI Companion for Women</strong> — providing empathetic digital dialogue, mood insights, cycle prediction, and self-care recommendations tailored to female physiological and emotional rhythms.
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Meet Your AI Mate
                </Link>
              </div>
            </div>
            <div className="hero-visual" data-aos="fade-left">
              <div className="central-woman-frame">
                <img src="/images/wellness_illustration.png" alt="AI Companion for Women Illustration" className="main-hero-img" />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 0", background: "#fff" }}>
          <div className="container">
            <div className="section-header">
              <h2>Built Specifically for Women's Needs</h2>
              <p>Empathetic intelligence calibrated for female health, emotional care, and cycle awareness</p>
            </div>
            <div className="feature-grid-revamp" style={{ marginTop: "40px" }}>
              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-user-female"></i>
                </div>
                <h3>24/7 Female Support</h3>
                <p>Feel supported at any time. Talk to HIM about stress, mood shifts, daily goals, or menstrual symptoms without hesitation.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-microphone"></i>
                </div>
                <h3>Voice Companion</h3>
                <p>Natural voice interaction powered by speech synthesis for hands-free conversations whenever typing feels tiring.</p>
              </div>

              <div className="feature-card-premium">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-shield-heart"></i>
                </div>
                <h3>Privacy Guaranteed</h3>
                <p>Your health metrics and conversations remain 100% private, encrypted, and strictly confidential.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2>Experience the #1 AI Companion for Women Today</h2>
                <p>Join thousands of women worldwide on www.herintelligentmate.in.</p>
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
