import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const metadata: Metadata = {
  title: "Terms of Service | HIM - Her Intelligent Mate",
  description: "Terms of Service for Her Intelligent Mate (HIM).",
  alternates: {
    canonical: "https://www.herintelligentmate.in/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <HomeClientWrapper>
      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i></span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest">
            <Link href="/" className="nav-link-guest">Home</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "calc(100vh - 200px)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h1 style={{ marginBottom: "2rem" }}>Terms of Service</h1>
          <div className="prose">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            <p>By using Her Intelligent Mate (HIM), you agree to these Terms of Service. Please read them carefully.</p>
            
            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
            <p>By accessing or using the HIM platform, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Medical Disclaimer</h2>
            <p>HIM is an AI-powered wellness platform. <strong>It is not a replacement for professional medical advice, diagnosis, or treatment.</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. User Accounts</h2>
            <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. Prohibited Uses</h2>
            <p>You agree not to use the platform in any way that violates applicable laws or regulations, or to exploit, harm, or attempt to exploit or harm others.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these terms at any time. We will provide notice of significant changes.</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate (www.herintelligentmate.in). All Rights Reserved.</p>
        </div>
      </footer>
    </HomeClientWrapper>
  );
}
