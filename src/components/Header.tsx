"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [allPagesOpen, setAllPagesOpen] = useState(false);

  const notifCount = 0;

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    setThemePanelOpen(false);
  };

  const toggleSidebar = () => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    if (sidebarMenu?.classList.contains("open") || sidebarMenu?.classList.contains("active")) {
      sidebarMenu.classList.remove("open", "active");
      sidebarOverlay?.classList.remove("show", "active");
    } else {
      sidebarMenu?.classList.add("open", "active");
      sidebarOverlay?.classList.add("show", "active");
    }
  };

  return (
    <>
      <div className="lang-topbar" id="langTopbar">
        <span className="lang-label">
          <i className="fa-solid fa-language"></i> Language:
        </span>
        <select id="indianLangSelect" aria-label="Select Indian language">
          <option value="en">🇮🇳 English</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
      </div>

      <header className="header" id="header">
        <div className="header-inner">
          {/* Header Left: Toggle Button + Logo */}
          <div className="header-left">
            <button
              className="sidebar-toggle"
              id="sidebarToggle"
              aria-label="Open navigation menu"
              onClick={toggleSidebar}
              title="All Pages Menu"
            >
              <i className="fa-solid fa-bars-staggered"></i>
              <span className="sidebar-toggle-text">Pages</span>
            </button>

            <Link href="/dashboard" className="logo" aria-label="HIM Dashboard">
              <span className="logo-icon">
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className="logo-text">HIM</span>
            </Link>
          </div>

          {/* Header Center: Desktop Navigation Tabs */}
          <nav className="header-nav-tabs" aria-label="Header tab navigation">
            <Link
              href="/dashboard"
              className={`nav-tab-btn ${pathname === "/dashboard" ? "active" : ""}`}
            >
              <i className="fa-solid fa-house"></i>
              <span>Dashboard</span>
            </Link>

            {/* Flagship Voice Tab */}
            <Link
              href="/voice"
              className={`nav-tab-btn nav-tab-voice ${pathname === "/voice" ? "active" : ""}`}
            >
              <span className="live-dot-pulse"></span>
              <i className="fa-solid fa-microphone-lines"></i>
              <span>Voice</span>
              <span className="nav-badge-live">LIVE</span>
            </Link>

            {/* Flagship Chat Tab */}
            <Link
              href="/chat"
              className={`nav-tab-btn nav-tab-chat ${pathname === "/chat" ? "active" : ""}`}
            >
              <i className="fa-solid fa-sparkles"></i>
              <span>AI Chat</span>
              <span className="nav-badge-ai">AI</span>
            </Link>

            <Link
              href="/cycle-tracker"
              className={`nav-tab-btn ${pathname === "/cycle-tracker" ? "active" : ""}`}
            >
              <i className="fa-solid fa-calendar-days"></i>
              <span>Cycle</span>
            </Link>

            <Link
              href="/mood-journal"
              className={`nav-tab-btn ${pathname === "/mood-journal" ? "active" : ""}`}
            >
              <i className="fa-solid fa-face-smile"></i>
              <span>Mood</span>
            </Link>

            <Link
              href="/wellness"
              className={`nav-tab-btn ${pathname === "/wellness" ? "active" : ""}`}
            >
              <i className="fa-solid fa-spa"></i>
              <span>Wellness</span>
            </Link>

            <Link
              href="/audiobooks"
              className={`nav-tab-btn ${pathname === "/audiobooks" ? "active" : ""}`}
            >
              <i className="fa-solid fa-headphones"></i>
              <span>Audio</span>
            </Link>

            {/* All Pages Mega Dropdown Trigger */}
            <div className="all-pages-dropdown-wrapper">
              <button
                type="button"
                className={`nav-tab-btn nav-tab-more ${allPagesOpen ? "active" : ""}`}
                onClick={() => setAllPagesOpen(!allPagesOpen)}
                aria-label="All 13+ pages"
              >
                <i className="fa-solid fa-table-cells-large"></i>
                <span>All Pages</span>
                <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px", marginLeft: "2px" }}></i>
              </button>

              {allPagesOpen && (
                <div className="all-pages-dropdown-menu">
                  <div className="dropdown-header">
                    <h4>
                      <i className="fa-solid fa-compass"></i> All HIM Pages (13+)
                    </h4>
                    <button
                      type="button"
                      className="dropdown-close-btn"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="dropdown-grid">
                    <Link
                      href="/voice"
                      className="dropdown-item item-highlight"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-microphone-lines" style={{ color: "#10B981" }}></i>
                      <div>
                        <strong>Voice Assistant</strong>
                        <small>Voice calls &amp; guidance</small>
                      </div>
                    </Link>

                    <Link
                      href="/chat"
                      className="dropdown-item item-highlight"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-comments" style={{ color: "#EC4899" }}></i>
                      <div>
                        <strong>HIM AI Chat</strong>
                        <small>Empathetic 24/7 AI</small>
                      </div>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-house" style={{ color: "var(--color-primary)" }}></i>
                      <div>
                        <strong>Dashboard</strong>
                        <small>Overview &amp; quick stats</small>
                      </div>
                    </Link>

                    <Link
                      href="/cycle-tracker"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-calendar-days" style={{ color: "#F43F5E" }}></i>
                      <div>
                        <strong>Cycle Tracker</strong>
                        <small>Period calendar &amp; phase</small>
                      </div>
                    </Link>

                    <Link
                      href="/log-period"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-droplet" style={{ color: "#EF4444" }}></i>
                      <div>
                        <strong>Log Period</strong>
                        <small>Flow &amp; symptom check-in</small>
                      </div>
                    </Link>

                    <Link
                      href="/mood-journal"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-face-smile" style={{ color: "#F59E0B" }}></i>
                      <div>
                        <strong>Mood Journal</strong>
                        <small>Daily reflections &amp; trends</small>
                      </div>
                    </Link>

                    <Link
                      href="/wellness"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-spa" style={{ color: "#14B8A6" }}></i>
                      <div>
                        <strong>Wellness Hub</strong>
                        <small>Self-care &amp; breathing</small>
                      </div>
                    </Link>

                    <Link
                      href="/audiobooks"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-headphones" style={{ color: "#6366F1" }}></i>
                      <div>
                        <strong>Audiobooks</strong>
                        <small>Calming sleep stories</small>
                      </div>
                    </Link>

                    <Link
                      href="/partner-mode"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-user-group" style={{ color: "#E11D48" }}></i>
                      <div>
                        <strong>Partner Sharing</strong>
                        <small>Sync cycle with partner</small>
                      </div>
                    </Link>

                    <Link
                      href="/reports"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-file-medical" style={{ color: "#0284C7" }}></i>
                      <div>
                        <strong>Health Reports</strong>
                        <small>Export doctor summaries</small>
                      </div>
                    </Link>

                    <Link
                      href="/community"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-users-line" style={{ color: "#8B5CF6" }}></i>
                      <div>
                        <strong>Community Forum</strong>
                        <small>Anonymous sisterhood</small>
                      </div>
                    </Link>

                    <Link
                      href="/games"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-gamepad" style={{ color: "#D97706" }}></i>
                      <div>
                        <strong>Challenges &amp; Games</strong>
                        <small>Daily streaks &amp; points</small>
                      </div>
                    </Link>

                    <Link
                      href="/insights"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-chart-line" style={{ color: "#059669" }}></i>
                      <div>
                        <strong>Data Insights</strong>
                        <small>Hormonal &amp; mood analysis</small>
                      </div>
                    </Link>

                    <Link
                      href="/profile"
                      className="dropdown-item"
                      onClick={() => setAllPagesOpen(false)}
                    >
                      <i className="fa-solid fa-user-gear" style={{ color: "#475569" }}></i>
                      <div>
                        <strong>Profile &amp; Settings</strong>
                        <small>Themes &amp; preferences</small>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Header Right */}
          <div className="header-right">
            {/* Direct Voice Quick-Call Button */}
            <Link
              href="/voice"
              className="call-header-btn"
              id="callHeaderBtn"
              aria-label="Call HIM Voice Assistant"
              title="Call HIM Voice Assistant"
            >
              <i className="fa-solid fa-phone"></i>
            </Link>

            {/* Quick Theme Panel */}
            <div className="theme-panel-wrapper" id="themePanelWrapper">
              <button
                className="theme-panel-btn"
                id="themePanelBtn"
                aria-label="Change theme"
                title="Quick Theme"
                onClick={() => setThemePanelOpen(!themePanelOpen)}
              >
                <i className="fa-solid fa-palette"></i>
                <span className="tp-dot" id="tpDot"></span>
              </button>

              <div
                className={`theme-panel-dropdown ${themePanelOpen ? "open" : ""}`}
                id="themePanelDropdown"
                style={{ display: themePanelOpen ? "block" : "none" }}
              >
                <div className="tp-header">
                  <h4>
                    <i className="fa-solid fa-palette"></i> App Theme
                  </h4>
                  <Link href="/profile#theme-section" onClick={() => setThemePanelOpen(false)}>
                    All themes &rarr;
                  </Link>
                </div>

                <div className="tp-section-label">✨ Light &amp; Pastel</div>
                <div className="tp-grid">
                  {[
                    { id: "pink", name: "Blossom", colors: "#FF7096,#B19CD9" },
                    { id: "pookie", name: "Pookie", colors: "#FFB3C6,#FFC8DD" },
                    { id: "cottoncandy", name: "Cotton", colors: "#FF85A1,#85C1FF" },
                    { id: "peach", name: "Peach", colors: "#FFAD8A,#FFCBA4" },
                    { id: "lavender", name: "Lavender", colors: "#9B72CF,#C9A8E8" },
                    { id: "rosegold", name: "Rose Gold", colors: "#E8A0BF,#C67C9E" },
                    { id: "mint", name: "Mint", colors: "#10B981,#6EE7B7" },
                    { id: "ocean", name: "Ocean", colors: "#0EA5E9,#38BDF8" },
                    { id: "sunset", name: "Sunset", colors: "#F97316,#FBBF24" },
                    { id: "cherry", name: "Cherry", colors: "#EF4444,#FB7185" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`tp-swatch ${theme === t.id ? "active" : ""}`}
                      onClick={() => handleThemeSelect(t.id)}
                      title={t.name}
                    >
                      <span
                        className="tp-circle"
                        style={{ background: `linear-gradient(135deg,${t.colors})` }}
                      ></span>
                      <span className="tp-name">{t.name}</span>
                    </button>
                  ))}
                </div>

                <div className="tp-section-label">🌙 Dark Modes</div>
                <div className="tp-grid">
                  {[
                    { id: "darknite", name: "Dark Night", colors: "#1A1030,#FF7096" },
                    { id: "darkviolet", name: "Dark Violet", colors: "#0D0820,#7C3AED" },
                    { id: "darkocean", name: "Dark Ocean", colors: "#050F1A,#0EA5E9" },
                    { id: "darkrose", name: "Dark Rose", colors: "#180810,#FB7185" },
                    { id: "darkforest", name: "Dark Forest", colors: "#071A0E,#10B981" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      className={`tp-swatch ${theme === t.id ? "active" : ""}`}
                      onClick={() => handleThemeSelect(t.id)}
                      title={t.name}
                    >
                      <span
                        className="tp-circle"
                        style={{ background: `linear-gradient(135deg,${t.colors})` }}
                      ></span>
                      <span className="tp-name">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="notif-wrapper">
              <button className="notif-btn" onClick={() => setNotifOpen(!notifOpen)}>
                <i className="fa-solid fa-bell"></i>
                {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
              </button>
              <div
                className={`notif-dropdown ${notifOpen ? "open" : ""}`}
                style={{ display: notifOpen ? "block" : "none" }}
              >
                <div className="notif-header">
                  <h4>Notifications</h4>
                  <a href="#">Mark all read</a>
                </div>
                <div className="notif-list">
                  <p className="notif-empty">No new notifications</p>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="profile-wrapper">
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="profile-avatar">U</div>
                <span className="profile-name">User</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div
                className="profile-dropdown"
                style={{ display: profileOpen ? "block" : "none" }}
              >
                <Link href="/profile" onClick={() => setProfileOpen(false)}>
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <hr />
                <a href="#" className="logout-link" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
