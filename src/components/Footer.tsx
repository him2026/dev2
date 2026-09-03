import Link from "next/link";

export default function Footer({ isAuth = false }: { isAuth?: boolean }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">💕</span>
              <span className="logo-text" style={{ color: "var(--text-primary)" }}>HIM</span>
            </div>
            <p style={{ textAlign: "left" }}>
              Her Intelligent Mate — Your AI-powered period companion for emotional, physical, and mental wellness.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            {isAuth ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/cycle-tracker">Cycle Tracker</Link>
                <Link href="/chat">AI Chat</Link>
                <Link href="/wellness">Wellness Hub</Link>
              </>
            ) : (
              <>
                <a href="/#features">Features</a>
                <a href="/#how-it-works">How It Works</a>
                <Link href="/register">Get Started</Link>
              </>
            )}
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate. Made with 💕 for women everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
