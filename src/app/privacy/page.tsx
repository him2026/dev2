import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | HIM - Her Intelligent Mate",
  description: "Privacy Policy for Her Intelligent Mate (HIM). Learn how we protect your data, cycle logs, and personal information.",
  alternates: {
    canonical: "https://www.herintelligentmate.in/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
          <h1 style={{ marginBottom: "2rem" }}>Privacy Policy</h1>
          <div className="prose">
            <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
            <p>Welcome to Her Intelligent Mate (HIM). We are committed to protecting your privacy and ensuring your personal and health data remains secure and confidential.</p>
            
            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us, including:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>Account information (email, password)</li>
              <li>Health and cycle data (period dates, symptoms, mood logs)</li>
              <li>Chat interactions with the HIM AI Companion</li>
            </ul>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
            <p>Your data is used strictly to provide and improve the HIM platform experience. Specifically:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
              <li>To predict your menstrual cycle and ovulation windows accurately.</li>
              <li>To provide personalized AI companion responses and wellness recommendations.</li>
              <li>To secure your account and authenticate users.</li>
            </ul>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Data Security & Encryption</h2>
            <p>We employ industry-standard encryption (e.g., bcrypt for passwords) and secure data storage. Your sensitive health data and chat logs are stored securely and are not shared with unauthorized third parties.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. We Do Not Sell Your Data</h2>
            <p>HIM will never sell, rent, or lease your personal information, health logs, or chat histories to third parties, advertisers, or data brokers.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us through the platform support.</p>
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
