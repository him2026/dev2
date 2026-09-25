import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const metadata: Metadata = {
  title: "Security Overview | HIM - Her Intelligent Mate",
  description: "Learn about the security measures Her Intelligent Mate (HIM) uses to protect your data.",
  alternates: {
    canonical: "https://www.herintelligentmate.in/security",
  },
};

export default function SecurityOverviewPage() {
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
          <h1 style={{ marginBottom: "2rem" }}>Security Overview</h1>
          <div className="prose">
            <p>At Her Intelligent Mate (HIM), we take the security of your personal and health data seriously.</p>
            
            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Data Encryption</h2>
            <p>All data transmitted between your browser and our servers is encrypted using industry-standard TLS (Transport Layer Security). Your sensitive data, such as passwords, are hashed and salted using robust algorithms (e.g., bcrypt) before being stored in our databases.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Infrastructure Security</h2>
            <p>HIM is hosted on secure, modern cloud infrastructure that provides ongoing threat monitoring, automated patching, and strict access controls.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>AI Privacy</h2>
            <p>Interactions with our AI companions are processed securely. We ensure that personal health information shared in chat is treated with the highest level of confidentiality and is not used to train public AI models without anonymization and consent.</p>

            <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Continuous Monitoring</h2>
            <p>We continually monitor our systems for potential vulnerabilities and employ best practices in secure software development to protect against emerging threats.</p>
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
