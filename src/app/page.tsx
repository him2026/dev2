import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd, { faqSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "HIM - Her Intelligent Mate | #1 AI Period Companion & Feminine Health Ally",
  description: "Experience HIM (Her Intelligent Mate) — the leading AI period companion and feminine wellness assistant. Intelligent menstrual cycle prediction, empathetic PMS support, mood tracking, and 24/7 voice companion.",
  keywords: [
    "AI period companion",
    "period companion",
    "feminine AI companion",
    "AI companion period",
    "women AI companion",
    "period tracker AI",
    "cycle tracking AI",
    "PMS support AI companion",
    "feminine health companion",
    "menstrual companion",
    "Her Intelligent Mate",
    "herintelligentmate.in"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in",
  },
  openGraph: {
    title: "HIM - Her Intelligent Mate | #1 AI Period Companion",
    description: "Discover HIM — your empathetic AI period companion. Predict cycle phases, manage PMS symptoms, track moods, and get 24/7 comforting voice and chat support.",
    url: "https://www.herintelligentmate.in",
    siteName: "HIM - Her Intelligent Mate",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM AI Period Companion" }],
    type: "website",
  },
};

export default function Home() {
  return (
    <HomeClientWrapper>
      <JsonLd data={faqSchema} />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="HIM Homepage">
            <span className="logo-icon">
              <i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i>
            </span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest" aria-label="Main Navigation">
            <a href="#features" className="nav-link-guest">Features</a>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
            <Link href="/feminine-ai-companion" className="nav-link-guest">Feminine AI</Link>
            <Link href="/cycle-tracking-ai" className="nav-link-guest">Cycle AI</Link>
            <Link href="/blog" className="nav-link-guest">Articles</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started</Link>
          </nav>
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open Navigation Menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <div className="mobile-menu-overlay" id="mobileMenuOverlay">
        <div className="mobile-menu-content">
          <button className="mobile-menu-close" id="mobileMenuClose" aria-label="Close Menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <a href="#features">Features</a>
          <Link href="/period-companion">AI Period Companion</Link>
          <Link href="/feminine-ai-companion">Feminine AI Companion</Link>
          <Link href="/cycle-tracking-ai">Cycle Tracking AI</Link>
          <Link href="/blog">Wellness Articles</Link>
          <Link href="/login">Login</Link>
          <Link href="/register" className="btn btn-primary">Get Started Free</Link>
        </div>
      </div>

      <main>
        {/* HERO SECTION */}
        <section className="hero-revamp" aria-labelledby="hero-heading">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge" data-aos="fade-down">
                <i className="fa-solid fa-wand-magic-sparkles"></i> World's #1 AI Period Companion
              </div>
              <h1 id="hero-heading" data-aos="fade-right" data-aos-delay="100">
                Your <span className="gradient-text">Intelligent Mate</span>
                <br />
                Through Every Cycle Rhythm
              </h1>
              <p data-aos="fade-right" data-aos-delay="200">
                <strong>HIM (Her Intelligent Mate)</strong> is the global benchmark for empathetic period companions and feminine AI support. From predicting your menstrual cycle phases to providing soothing PMS voice chats and mood tracking, HIM is your dedicated 24/7 digital ally.
              </p>

              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
                <Link href="/register" className="btn btn-primary btn-lg">
                  Meet Your AI Companion
                </Link>
                <a href="#features" className="btn btn-secondary btn-lg">
                  <i className="fa-solid fa-play" style={{ fontSize: "12px" }}></i> Explore Capabilities
                </a>
              </div>

              <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-primary)" }}>4</div>
                  <div className="label">Cycle Phases</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-secondary)" }}>AI</div>
                  <div className="label">Empathy Engine</div>
                </div>
                <div className="hero-stat">
                  <div className="number" style={{ color: "var(--color-sage)" }}>24/7</div>
                  <div className="label">Feminine Support</div>
                </div>
              </div>

              <div className="hero-context-card" data-aos="fade-up" data-aos-delay="500">
                <div
                  className="ctx-icon"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div className="ctx-info">
                  <h4 style={{ fontSize: "14px", marginBottom: "4px", color: "var(--text-primary)", fontWeight: 800 }}>
                    Phase Intelligence
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                    Your energy levels peak during the <strong style={{ color: "var(--color-sage)" }}>Follicular Phase</strong>. Perfect for setting new personal goals!
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
              <div className="hero-glow-circle"></div>
              <div className="orbit-ring ring-1"></div>
              <div className="orbit-ring ring-2"></div>
              <div className="orbit-ring ring-3"></div>

              {/* Central Circular Image Frame */}
              <div className="central-woman-frame">
                <img
                  src="/images/wellness_illustration.png"
                  alt="HIM AI Period Companion and Feminine Wellness Visual"
                  className="main-hero-img"
                />
              </div>

              {/* Perfectly Aligned Level Floating Badges */}
              <div className="orbit-container">
                <div className="floating-card fc-1">
                  <div className="fc-icon" style={{ background: "#E8FFEF", color: "#2E7D32" }}>
                    <i className="fa-solid fa-heart-pulse"></i>
                  </div>
                  <div className="fc-text">Phase Tracking</div>
                </div>
                <div className="floating-card fc-2">
                  <div className="fc-icon" style={{ background: "#FFF0F3", color: "#E8567F" }}>
                    <i className="fa-solid fa-face-smile"></i>
                  </div>
                  <div className="fc-text">Mood Insights</div>
                </div>
                <div className="floating-card fc-3">
                  <div className="fc-icon" style={{ background: "#F3EEFF", color: "#9B8EC0" }}>
                    <i className="fa-solid fa-robot"></i>
                  </div>
                  <div className="fc-text">HIM AI Chat</div>
                </div>
                <div className="floating-card fc-4">
                  <div className="fc-icon" style={{ background: "#EBF3FB", color: "#1976D2" }}>
                    <i className="fa-solid fa-microphone"></i>
                  </div>
                  <div className="fc-text">Voice Companion</div>
                </div>
                <div className="floating-card fc-5">
                  <div className="fc-icon" style={{ background: "#FFF5EB", color: "#F57C00" }}>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="fc-text">Wellness Badges</div>
                </div>
              </div>

              <div className="deco-element de-1"><i className="fa-solid fa-heart"></i></div>
              <div className="deco-element de-2"><i className="fa-solid fa-star"></i></div>
              <div className="deco-element de-3"><i className="fa-solid fa-sparkles"></i></div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES SECTION */}
        <section className="glass-features" id="features" aria-labelledby="features-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                Feminine AI Technology
              </span>
              <h2 id="features-heading">Intelligent Features for Your Cycle</h2>
              <p>Designed specifically to nurture physical comfort, emotional equilibrium, and cycle clarity</p>
            </div>

            <div className="feature-grid-revamp">
              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="0">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h3>Smart Cycle Prediction</h3>
                <p>Machine-learning algorithm calibrated to your body. Accurately predicts Menstrual, Follicular, Ovulatory, and Luteal phases.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-comment-dots"></i>
                </div>
                <h3>Empathetic Period AI Companion</h3>
                <p>Chat with HIM anytime. Receives phase context in real-time to offer empathetic emotional support and PMS guidance.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                  <i className="fa-solid fa-microphone"></i>
                </div>
                <h3>Voice AI Companion</h3>
                <p>Natural, soothing voice dialogue powered by NVIDIA Chatterbox for hands-free support during high-cramp or low-energy days.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="0">
                <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3>Phase Wellness Library</h3>
                <p>Curated articles, audiobooks, and mindfulness guides tailored to your cycle phase, from nutrition to gentle workouts.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <h3>Gamified Self-Care</h3>
                <p>Earn badges, unlock achievements, and build streaks as you prioritize your daily mood tracking and health routines.</p>
              </div>

              <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3>Deep Health Analytics</h3>
                <p>Visualize mood trends, physical symptoms, and cycle lengths over months to uncover patterns and take control of your well-being.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TOPIC HUBS - SINGLE COLUMN LAYOUT */}
        <section className="topic-hubs-section" style={{ padding: "80px 0", background: "linear-gradient(180deg, #FAF7FF 0%, #FFFFFF 100%)" }} aria-labelledby="topic-hubs-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span style={{ color: "var(--color-secondary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                Dedicated Knowledge Hubs
              </span>
              <h2 id="topic-hubs-heading">Explore Feminine AI & Period Resources</h2>
              <p>In-depth guides, specialized capabilities, and research-backed tools for every aspect of women's cycle health</p>
            </div>

            {/* SINGLE COLUMN CONTAINER */}
            <div className="topic-hubs-container-single">
              <div className="topic-hub-banner-card" data-aos="fade-up">
                <div className="topic-hub-banner-left">
                  <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                    <i className="fa-solid fa-heart"></i>
                  </div>
                  <div className="topic-hub-banner-info">
                    <h3>AI Period Companion</h3>
                    <p>Discover how HIM delivers 24/7 empathetic chat, PMS comfort, and personalized cycle support tailored to your unique rhythm.</p>
                  </div>
                </div>
                <Link href="/period-companion" className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                  Learn About AI Period Companion &rarr;
                </Link>
              </div>

              <div className="topic-hub-banner-card" data-aos="fade-up" data-aos-delay="100">
                <div className="topic-hub-banner-left">
                  <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                    <i className="fa-solid fa-sparkles"></i>
                  </div>
                  <div className="topic-hub-banner-info">
                    <h3>Feminine AI Companion</h3>
                    <p>Explore cutting-edge empathetic artificial intelligence built specifically for women's emotional and physical wellness.</p>
                  </div>
                </div>
                <Link href="/feminine-ai-companion" className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                  Explore Feminine AI &rarr;
                </Link>
              </div>

              <div className="topic-hub-banner-card" data-aos="fade-up" data-aos-delay="200">
                <div className="topic-hub-banner-left">
                  <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                    <i className="fa-solid fa-chart-pie"></i>
                  </div>
                  <div className="topic-hub-banner-info">
                    <h3>Cycle Tracking AI</h3>
                    <p>Master the 4 phases of your menstrual cycle with predictive algorithms, symptom correlation, and energy forecasts.</p>
                  </div>
                </div>
                <Link href="/cycle-tracking-ai" className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                  Master Cycle Tracking &rarr;
                </Link>
              </div>

              <div className="topic-hub-banner-card" data-aos="fade-up" data-aos-delay="300">
                <div className="topic-hub-banner-left">
                  <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                    <i className="fa-solid fa-newspaper"></i>
                  </div>
                  <div className="topic-hub-banner-info">
                    <h3>Wellness Articles & Guides</h3>
                    <p>Read our expert guides on managing PMS naturally, understanding hormonal shifts, and leveraging AI for feminine care.</p>
                  </div>
                </div>
                <Link href="/blog" className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                  Browse Wellness Articles &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE HIM */}
        <section className="usps-section" style={{ padding: "100px 0", background: "#fff" }} aria-labelledby="usps-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2 id="usps-heading">Why Choose HIM?</h2>
              <p>The HIM difference lies in empathetic AI, strict data privacy, and holistic design</p>
            </div>
            <div className="card-grid-center">
              <div className="usps-card" data-aos="zoom-in" data-aos-delay="0">
                <i className="fa-solid fa-shield-heart" style={{ fontSize: "32px", color: "var(--color-primary)", marginBottom: "20px" }}></i>
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Privacy by Design</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Your health logs and conversations are end-to-end protected. We never sell or compromise your private data.</p>
              </div>
              <div className="usps-card" data-aos="zoom-in" data-aos-delay="100">
                <i className="fa-solid fa-brain" style={{ fontSize: "32px", color: "var(--color-secondary)", marginBottom: "20px" }}></i>
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>AI-First Empathy</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Powered by DeepSeek V4 Flash for context-aware, emotionally sensitive companion dialogue tailored to your mood.</p>
              </div>
              <div className="usps-card" data-aos="zoom-in" data-aos-delay="200">
                <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: "32px", color: "var(--color-sage)", marginBottom: "20px" }}></i>
                <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Premium UX</h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>A calm, aesthetically beautiful interface engineered to soothe stress and elevate daily wellness.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION (FLASHCARD STYLE) */}
        <section className="faq-section" style={{ padding: "90px 0", background: "#FAF7FF" }} aria-labelledby="faq-heading">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="hero-badge" style={{ marginBottom: "16px" }}>
                <i className="fa-solid fa-layer-group"></i> FLASHCARDS
              </span>
              <h2 id="faq-heading">Frequently Asked Questions</h2>
              <p>Explore flashcards detailing everything you need to know about HIM</p>
            </div>

            {/* FLASHCARD FAQ STACK */}
            <div className="faq-flashcard-container">
              <div className="faq-flashcard" data-aos="fade-up">
                <div className="faq-flashcard-header">
                  <span className="faq-flashcard-badge">FLASHCARD 01</span>
                  <h3>What is an AI Period Companion?</h3>
                </div>
                <div className="faq-flashcard-body">
                  <p>
                    An AI Period Companion is an intelligent, empathetic digital assistant designed specifically for women. It accurately predicts menstrual cycle phases, tracks mood fluctuations, provides science-backed PMS coping strategies, and engages in comforting 24/7 conversations adapted to your hormonal phase.
                  </p>
                </div>
              </div>

              <div className="faq-flashcard" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-flashcard-header">
                  <span className="faq-flashcard-badge" style={{ background: "rgba(177, 156, 217, 0.15)", color: "var(--color-secondary)" }}>FLASHCARD 02</span>
                  <h3>How does HIM (Her Intelligent Mate) support women during PMS and menstruation?</h3>
                </div>
                <div className="faq-flashcard-body">
                  <p>
                    HIM blends cycle forecasting with emotionally intelligent conversational AI. It offers voice interaction, phase-specific self-care guides, mood tracking, and empathetic dialogue to alleviate stress, cramps, and emotional ups and downs during premenstrual and menstrual phases.
                  </p>
                </div>
              </div>

              <div className="faq-flashcard" data-aos="fade-up" data-aos-delay="200">
                <div className="faq-flashcard-header">
                  <span className="faq-flashcard-badge" style={{ background: "rgba(46, 125, 50, 0.12)", color: "var(--color-sage)" }}>FLASHCARD 03</span>
                  <h3>Is my period and cycle health data private on HIM?</h3>
                </div>
                <div className="faq-flashcard-body">
                  <p>
                    Yes. Your privacy is paramount. HIM is architected with privacy-by-design standards: all cycle logs, mood journals, and AI chats are strictly encrypted, confidential, and will never be monetized or sold to third parties.
                  </p>
                </div>
              </div>

              <div className="faq-flashcard" data-aos="fade-up" data-aos-delay="300">
                <div className="faq-flashcard-header">
                  <span className="faq-flashcard-badge" style={{ background: "rgba(245, 124, 0, 0.12)", color: "var(--color-warning)" }}>FLASHCARD 04</span>
                  <h3>Can I talk to HIM using voice commands?</h3>
                </div>
                <div className="faq-flashcard-body">
                  <p>
                    Yes! HIM includes a dedicated Voice Companion feature powered by NVIDIA Chatterbox, allowing comfortable, hands-free voice conversations whenever typing feels tiring during heavy flow or cramp days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box" data-aos="zoom-in">
              <div className="cta-content">
                <h2>Ready to meet your AI Period Companion?</h2>
                <p>Join thousands of women worldwide who have elevated their cycle experience with HIM.</p>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/register" className="btn btn-primary btn-lg" style={{ boxShadow: "0 10px 30px rgba(255, 112, 150, 0.4)" }}>
                    Create Free Account
                  </Link>
                  <Link href="/login" className="btn btn-white btn-lg" style={{ background: "white", color: "var(--text-primary)" }}>
                    Login to Dashboard
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
                <span className="logo-icon">
                  <i className="fa-solid fa-heart" style={{ color: "#FF7096" }}></i>
                </span>
                <span className="logo-text" style={{ color: "#FFFFFF", WebkitTextFillColor: "#FFFFFF" }}>
                  HIM
                </span>
              </div>
              <p>Her Intelligent Mate — The world's #1 AI period companion & feminine health ally.</p>
            </div>
            <div className="footer-links">
              <h4>SEO Topic Hubs</h4>
              <Link href="/period-companion">AI Period Companion</Link>
              <Link href="/feminine-ai-companion">Feminine AI Companion</Link>
              <Link href="/cycle-tracking-ai">Cycle Tracking AI</Link>
              <Link href="/blog">Wellness Articles</Link>
            </div>
            <div className="footer-links">
              <h4>Platform</h4>
              <a href="#features">Features</a>
              <a href="#faq">FAQ</a>
              <Link href="/register">Get Started</Link>
              <Link href="/login">Login</Link>
            </div>
            <div className="footer-links">
              <h4>Legal & Privacy</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security Overview</a>
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
