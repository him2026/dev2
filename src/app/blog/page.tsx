import { Metadata } from "next";
import Link from "next/link";
import HomeClientWrapper from "@/components/HomeClientWrapper";

export const metadata: Metadata = {
  title: "Feminine Health & AI Period Companion Articles | HIM Blog",
  description: "Explore articles, guides, and expert insights on AI period companions, menstrual cycle tracking, PMS management, and feminine health innovation from HIM.",
  keywords: [
    "AI period companion blog",
    "feminine AI articles",
    "period tracking guide",
    "PMS management tips",
    "women health AI blog",
    "her intelligent mate articles"
  ],
  alternates: {
    canonical: "https://www.herintelligentmate.in/blog",
  },
  openGraph: {
    title: "Feminine Health & AI Period Companion Articles | HIM Blog",
    description: "Expert articles on AI period companions, cycle tracking, and feminine wellness.",
    url: "https://www.herintelligentmate.in/blog",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HIM Blog" }],
  },
};

export default function BlogHubPage() {
  const articles = [
    {
      slug: "what-is-an-ai-period-companion",
      title: "What is an AI Period Companion and How It Transforms Menstrual Health",
      excerpt: "Discover how AI period companions like HIM combine cycle prediction algorithms with empathetic dialogue to support women through every phase.",
      date: "September 6, 2026",
      category: "AI Technology & Health",
    },
    {
      slug: "managing-pms-with-feminine-ai",
      title: "Managing PMS and Mood Swings with a Feminine AI Companion",
      excerpt: "Learn how empathetic conversational AI provides real-time emotional support, symptom tracking, and self-care strategies during premenstrual days.",
      date: "September 4, 2026",
      category: "Wellness & Self-Care",
    },
    {
      slug: "future-of-womens-health-ai",
      title: "The Future of Women's Health: Why Empathetic AI is Revolutionizing Cycle Tracking",
      excerpt: "An in-depth look at how privacy-first feminine AI tools are empowering women around the globe to take ownership of their biological rhythms.",
      date: "September 1, 2026",
      category: "Feminine Health Trends",
    },
  ];

  return (
    <HomeClientWrapper>
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
            <Link href="/login" className="btn btn-ghost-nav">Login</Link>
            <Link href="/register" className="btn btn-primary-sm">Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: "120px" }}>
        <section className="hero-revamp" style={{ paddingBottom: "60px" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
            <span className="hero-badge" data-aos="fade-down" style={{ display: "inline-flex" }}>
              <i className="fa-solid fa-book-open"></i> Knowledge & Insights
            </span>
            <h1 data-aos="fade-up" style={{ marginTop: "16px" }}>
              Feminine Health & <span className="gradient-text">AI Companion Articles</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Evidence-based guides, technology breakdowns, and wellness strategies curated by Her Intelligent Mate.
            </p>
          </div>
        </section>

        <section style={{ padding: "60px 0 100px 0", background: "#fff" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
              {articles.map((art, idx) => (
                <article key={art.slug} className="feature-card-premium" style={{ background: "#FAF7FF", display: "flex", flexDirection: "column", justifyContent: "space-between" }} data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {art.category}
                    </span>
                    <h2 style={{ fontSize: "20px", margin: "12px 0", lineHeight: "1.4", color: "var(--text-primary)" }}>
                      <Link href={`/blog/${art.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {art.title}
                      </Link>
                    </h2>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
                      {art.excerpt}
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "16px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>{art.date}</span>
                    <Link href={`/blog/${art.slug}`} className="btn btn-secondary btn-sm">
                      Read Article &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-revamp">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2>Empower Your Health Journey with HIM</h2>
                <p>Start conversing with your personal AI period companion today at www.herintelligentmate.in.</p>
                <Link href="/register" className="btn btn-primary btn-lg">
                  Join Free Today
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
