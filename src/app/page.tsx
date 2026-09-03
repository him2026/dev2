"use client";

import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

      document.querySelectorAll(".floating-card").forEach((card) => {
        const el = card as HTMLElement;
        const speed = parseFloat(el.getAttribute("data-speed") || "1");
        el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
      });

      document.querySelectorAll(".deco-element").forEach((card) => {
        const el = card as HTMLElement;
        const speed = 2;
        el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px) rotate(${moveX * 10}deg)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById("scrollProgress");
      if (progress) {
        progress.style.width = scrolled + "%";
      }

      const header = document.getElementById("header");
      if (header) {
        if (window.scrollY > 50) {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Mobile Menu
    const menuBtn = document.getElementById("mobileMenuBtn");
    const menuClose = document.getElementById("mobileMenuClose");
    const menuOverlay = document.getElementById("mobileMenuOverlay");

    const openMenu = () => menuOverlay?.classList.add("show");
    const closeMenu = () => menuOverlay?.classList.remove("show");
    const handleMenuOverlayClick = (e: MouseEvent) => {
      if (e.target === menuOverlay) closeMenu();
    };

    menuBtn?.addEventListener("click", openMenu);
    menuClose?.addEventListener("click", closeMenu);
    menuOverlay?.addEventListener("click", handleMenuOverlayClick);

    document.body.classList.add("guest");

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      menuBtn?.removeEventListener("click", openMenu);
      menuClose?.removeEventListener("click", closeMenu);
      menuOverlay?.removeEventListener("click", handleMenuOverlayClick);
      document.body.classList.remove("guest");
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">
              <i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i>
            </span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest">
            <a href="#features" className="nav-link-guest">
              Features
            </a>
            <a href="#how-it-works" className="nav-link-guest">
              How It Works
            </a>
            <Link href="/login" className="btn btn-ghost-nav">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary-sm">
              Get Started
            </Link>
          </nav>
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>

      <div className="mobile-menu-overlay" id="mobileMenuOverlay">
        <div className="mobile-menu-content">
          <button className="mobile-menu-close" id="mobileMenuClose">
            <i className="fa-solid fa-xmark"></i>
          </button>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link href="/login">Login</Link>
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>

      <section className="hero-revamp">
        <div className="hero-container">
          <div className="hero-text">
            <div className="hero-badge" data-aos="fade-down">
              <i className="fa-solid fa-wand-magic-sparkles"></i> AI-Powered Period Companion
            </div>
            <h1 data-aos="fade-right" data-aos-delay="100">
              Your <span className="gradient-text">Intelligent Mate</span>
              <br />
              Through Every Rhythm
            </h1>
            <p data-aos="fade-right" data-aos-delay="200">
              HIM understands your emotions, predicts your cycle, and provides comfort when you need it most. More than a tracker — your empathetic digital ally.
            </p>

            <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
              <Link href="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <a href="#features" className="btn btn-secondary btn-lg">
                <i className="fa-solid fa-play" style={{ fontSize: "12px" }}></i> See Features
              </a>
            </div>

            <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
              <div className="hero-stat">
                <div className="number" style={{ color: "var(--color-primary)" }}>
                  4
                </div>
                <div className="label">Cycle Phases</div>
              </div>
              <div className="hero-stat">
                <div className="number" style={{ color: "var(--color-secondary)" }}>
                  AI
                </div>
                <div className="label">Empathy Engine</div>
              </div>
              <div className="hero-stat">
                <div className="number" style={{ color: "var(--color-sage)" }}>
                  24/7
                </div>
                <div className="label">Support</div>
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
                  Phase Insight
                </h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                  Your energy levels are highest during the <strong style={{ color: "var(--color-sage)" }}>Follicular Phase</strong>. Perfect for new goals!
                </p>
              </div>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-glow-circle"></div>

            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="orbit-ring ring-3"></div>

            <div className="orbit-container">
              <div className="floating-card fc-1" data-speed="2">
                <div className="fc-icon" style={{ background: "#E8FFEF", color: "#2E7D32" }}>
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <div className="fc-text">Phase Tracking</div>
              </div>
              <div className="floating-card fc-2" data-speed="-3">
                <div className="fc-icon" style={{ background: "#FFF0F3", color: "#E8567F" }}>
                  <i className="fa-solid fa-face-smile"></i>
                </div>
                <div className="fc-text">Mood Insights</div>
              </div>
              <div className="floating-card fc-3" data-speed="4">
                <div className="fc-icon" style={{ background: "#F3EEFF", color: "#9B8EC0" }}>
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div className="fc-text">HIM AI Chat</div>
              </div>
              <div className="floating-card fc-4" data-speed="-2">
                <div className="fc-icon" style={{ background: "#EBF3FB", color: "#1976D2" }}>
                  <i className="fa-solid fa-microphone"></i>
                </div>
                <div className="fc-text">Voice Support</div>
              </div>
              <div className="floating-card fc-5" data-speed="3">
                <div className="fc-icon" style={{ background: "#FFF5EB", color: "#F57C00" }}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="fc-text">Wellness Badges</div>
              </div>
            </div>

            <img
              src="/images/wellness_illustration.png"
              alt="Wellness Illustration"
              className="main-hero-img"
            />

            <div className="deco-element de-1">
              <i className="fa-solid fa-heart"></i>
            </div>
            <div className="deco-element de-2">
              <i className="fa-solid fa-star"></i>
            </div>
            <div className="deco-element de-3">
              <i className="fa-solid fa-circle"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-features" id="features">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Core Capabilities
            </span>
            <h2>The Future of Wellness</h2>
            <p>Designed to be as dynamic as your cycle</p>
          </div>

          <div className="feature-grid-revamp">
            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="0">
              <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <h3>Smart Cycle Engine</h3>
              <p>Advanced predictions that learn from your unique body patterns. More accuracy with every cycle.</p>
            </div>

            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <h3>Empathetic AI Chat</h3>
              <p>Your companion HIM understands your phase and mood, offering personalized comfort and science-backed advice.</p>
            </div>

            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper" style={{ background: "var(--color-mint)", color: "var(--color-sage)" }}>
                <i className="fa-solid fa-microphone"></i>
              </div>
              <h3>Voice Companion</h3>
              <p>Natural, soothing voice interaction powered by NVIDIA Chatterbox for hands-free support during those tough days.</p>
            </div>

            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="0">
              <div className="feature-icon-wrapper" style={{ background: "#FFF5EB", color: "var(--color-warning)" }}>
                <i className="fa-solid fa-book-open"></i>
              </div>
              <h3>Wellness Library</h3>
              <p>Curated articles and audiobooks tailored to your current phase, from nutrition to mindfulness.</p>
            </div>

            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                <i className="fa-solid fa-trophy"></i>
              </div>
              <h3>Gamified Health</h3>
              <p>Earn badges, unlock achievements, and build streaks as you prioritize your self-care journey.</p>
            </div>

            <div className="feature-card-premium" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper" style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}>
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3>Deep Analytics</h3>
              <p>Visualize your health trends over months to identify patterns and maintain optimal wellness.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="usps-section" style={{ padding: "100px 0", background: "#fff" }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Why Choose HIM?</h2>
            <p>The HIM difference is in the details</p>
          </div>
          <div className="card-grid-center">
            <div className="usps-card" data-aos="zoom-in" data-aos-delay="0">
              <i className="fa-solid fa-shield-heart" style={{ fontSize: "32px", color: "var(--color-primary)", marginBottom: "20px" }}></i>
              <h4 style={{ marginBottom: "12px" }}>Privacy by Design</h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Your data is encrypted and strictly private. We never sell your health information.</p>
            </div>
            <div className="usps-card" data-aos="zoom-in" data-aos-delay="100">
              <i className="fa-solid fa-brain" style={{ fontSize: "32px", color: "var(--color-secondary)", marginBottom: "20px" }}></i>
              <h4 style={{ marginBottom: "12px" }}>AI-First Approach</h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Powered by DeepSeek V4 Flash for the most empathetic and context-aware advice.</p>
            </div>
            <div className="usps-card" data-aos="zoom-in" data-aos-delay="200">
              <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: "32px", color: "var(--color-sage)", marginBottom: "20px" }}></i>
              <h4 style={{ marginBottom: "12px" }}>Premium Experience</h4>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>A beautiful, calming interface designed to reduce stress and improve mental well-being.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="future-section" style={{ padding: "100px 0", background: "linear-gradient(180deg, #fff, #F3EEFF)" }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span style={{ color: "var(--color-secondary)", fontWeight: 800, fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Coming Soon
            </span>
            <h2>The Future of HIM</h2>
            <p>Expanding the horizon of women's digital health</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", width: "100%", marginTop: "48px" }}>
            <div className="feature-card-premium" style={{ opacity: 0.9, borderStyle: "dashed" }} data-aos="fade-up">
              <div className="feature-icon-wrapper" style={{ background: "#F0F7FF", color: "#007AFF" }}>
                <i className="fa-solid fa-user-group"></i>
              </div>
              <h3>Partner Sharing Mode</h3>
              <p>Securely sync your cycle with a partner to improve communication and support during different phases.</p>
            </div>
            <div className="feature-card-premium" style={{ opacity: 0.9, borderStyle: "dashed" }} data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper" style={{ background: "#FFF0F0", color: "#FF3B30" }}>
                <i className="fa-solid fa-file-medical"></i>
              </div>
              <h3>Smart Doctor Reports</h3>
              <p>Generate professional health summaries and trend reports to share with your healthcare provider.</p>
            </div>
            <div className="feature-card-premium" style={{ opacity: 0.9, borderStyle: "dashed" }} data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper" style={{ background: "#F5F5F5", color: "#333" }}>
                <i className="fa-solid fa-masks-theater"></i>
              </div>
              <h3>Anonymous Community</h3>
              <p>A safe, judgment-free space to discuss health, wellness, and share experiences with other women.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works" style={{ background: "#FDF9FB", padding: "100px 0" }}>
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>Your Journey with HIM</h2>
            <p>Getting started is as simple as a heartbeat</p>
          </div>

          <div className="steps-container">
            <div className="step-item" data-aos="fade-up" data-aos-delay="0">
              <div className="step-circle">1</div>
              <h4>Personalize</h4>
              <p>Create your secure account and share your basic cycle info.</p>
            </div>
            <div className="step-item" data-aos="fade-up" data-aos-delay="100">
              <div className="step-circle">2</div>
              <h4>Log</h4>
              <p>Track your daily mood, symptoms, and cycle dates easily.</p>
            </div>
            <div className="step-item" data-aos="fade-up" data-aos-delay="200">
              <div className="step-circle">3</div>
              <h4>Engage</h4>
              <p>Talk to HIM, explore the library, and earn badges for consistency.</p>
            </div>
            <div className="step-item" data-aos="fade-up" data-aos-delay="300">
              <div className="step-circle">4</div>
              <h4>Thrive</h4>
              <p>Gain insights and feel more in control of your health rhythm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-revamp">
        <div className="container">
          <div className="cta-box" data-aos="zoom-in">
            <div className="cta-content">
              <h2>Ready to meet your Mate?</h2>
              <p>Join thousands of women who have transformed their cycle journey with HIM.</p>
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
              <p>Her Intelligent Mate — Empowering women through AI-driven wellness and empathetic technology.</p>
            </div>
            <div className="footer-links">
              <h4>Explore</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <Link href="/register">Get Started</Link>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Support</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
