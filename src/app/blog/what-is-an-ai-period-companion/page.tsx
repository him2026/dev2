import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "What is an AI Period Companion and How It Transforms Menstrual Health",
  description: "Learn how AI period companions combine machine learning cycle prediction with empathetic dialogue to support women's emotional and physical well-being.",
  keywords: [
    "what is an AI period companion",
    "AI period companion explained",
    "period AI assistant",
    "menstrual cycle AI",
    "feminine AI companion blog"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/blog/what-is-an-ai-period-companion",
  },
  openGraph: {
    title: "What is an AI Period Companion and How It Transforms Menstrual Health",
    description: "Discover how AI period companions combine cycle algorithms with empathetic conversation.",
    url: "https://www.herintelligentmate.in/blog/what-is-an-ai-period-companion",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "What is an AI Period Companion" }],
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What is an AI Period Companion and How It Transforms Menstrual Health",
  "image": "https://www.herintelligentmate.in/images/og-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "url": "https://www.herintelligentmate.in"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Her Intelligent Mate",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.herintelligentmate.in/images/og-image.jpg"
    }
  },
  "datePublished": "2026-09-06",
  "dateModified": "2026-09-06",
  "description": "An in-depth explanation of AI period companions, cycle prediction, PMS empathy, and digital feminine wellness."
};

export default function ArticleWhatIsAiPeriodCompanion() {
  return (
    <HomeClientWrapper>
      <JsonLd data={articleSchema} />
      <div className="scroll-progress" id="scrollProgress"></div>

      <header className="header header-guest" id="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon"><i className="fa-solid fa-heart" style={{ color: "var(--color-primary)" }}></i></span>
            <span className="logo-text">HIM</span>
          </Link>
          <nav className="header-nav-guest">
            <Link href="/" className="nav-link-guest">Home</Link>
            <Link href="/blog" className="nav-link-guest">Back to Articles</Link>
            <Link href="/period-companion" className="nav-link-guest">Period Companion</Link>
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }}>
        <article className="container" style={{ maxWidth: "800px", paddingBottom: "80px" }}>
          <header style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "var(--color-primary)", fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              AI Technology & Health
            </span>
            <h1 style={{ fontSize: "36px", margin: "16px 0", lineHeight: "1.3" }}>
              What is an AI Period Companion and How It Transforms Menstrual Health
            </h1>
            <p style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>Published by Her Intelligent Mate Editorial Team | September 6, 2026</p>
          </header>

          <div style={{ fontSize: "17px", lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <p>
              For decades, period tracking was limited to static calendars or basic mobile apps that simply estimated your next start date based on an average 28-day model. However, women's bodies do not operate on a rigid clock. Fluctuations in hormones like estrogen and progesterone dramatically influence physical energy, mental focus, mood shifts, and sleep quality across the four phases of the menstrual cycle.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "36px", marginBottom: "16px" }}>
              Defining the AI Period Companion
            </h2>
            <p>
              An <strong>AI Period Companion</strong> is an advanced, context-aware digital partner designed specifically for female physiology and mental well-being. Unlike standard tracking tools, an AI period companion like <strong>HIM (Her Intelligent Mate)</strong> pairs predictive cycle intelligence with empathetic artificial intelligence.
            </p>
            <p>
              By learning your unique cycle history, daily mood logs, and symptom patterns, HIM provides personalized real-time support. Whether you need physical self-care advice during cramp days or comforting emotional conversation during PMS mood dips, HIM is available 24/7.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "36px", marginBottom: "16px" }}>
              Key Capabilities of HIM AI Period Companion
            </h2>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px" }}>
              <li style={{ marginBottom: "12px" }}>
                <strong>Phase-Aware Conversational AI:</strong> Adapts conversation tone according to whether you are in your Menstrual, Follicular, Ovulatory, or Luteal phase.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong>Hands-Free Voice Support:</strong> Powered by natural voice synthesis, allowing relaxing speech interactions when typing feels difficult.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong>Empathetic PMS Guidance:</strong> Recommends nutrition, hydration, gentle stretch routines, and mindfulness tailored to your exact symptoms.
              </li>
              <li style={{ marginBottom: "12px" }}>
                <strong>End-to-End Privacy:</strong> All health data and chat logs are strictly encrypted and confidential.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "36px", marginBottom: "16px" }}>
              Why Women Worldwide Are Choosing HIM
            </h2>
            <p>
              As women seek holistic digital companions that honor their privacy and nurture their well-being, <strong>www.herintelligentmate.in</strong> stands out as the premier destination for AI period care. Experience how empathetic technology can elevate your monthly rhythm.
            </p>
          </div>

          <div style={{ marginTop: "60px", padding: "40px", background: "#FAF7FF", borderRadius: "24px", textAlign: "center" }}>
            <h3 style={{ marginBottom: "12px", color: "var(--text-primary)" }}>Meet Your Personal AI Period Companion</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Create your free account today on HIM and transform your cycle journey.</p>
            <Link href="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
          </div>
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HIM - Her Intelligent Mate (www.herintelligentmate.in). All Rights Reserved.</p>
        </div>
      </footer>
    </HomeClientWrapper>
  );
}
