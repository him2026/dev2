"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [themePanelOpen, setThemePanelOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifCount = 0; // Replace with real logic later

  const handleThemeChange = (theme: string) => {
    // Add theme change logic here if needed
    // Usually via a ThemeProvider
    setThemePanelOpen(false);
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
          <div className="header-left">
            <button className="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
              <i className="fa-solid fa-bars"></i>
            </button>
            <Link href="/dashboard" className="logo">
              <span className="logo-icon">
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className="logo-text">HIM</span>
            </Link>
          </div>

          <nav className="header-nav" aria-label="Main navigation">
            <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
              <i className="fa-solid fa-house"></i> <span>Dashboard</span>
            </Link>
            <Link href="/cycle-tracker" className={`nav-link ${pathname === "/cycle-tracker" ? "active" : ""}`}>
              <i className="fa-solid fa-calendar-days"></i> <span>Tracker</span>
            </Link>
            <Link href="/chat" className={`nav-link ${pathname === "/chat" ? "active" : ""}`}>
              <i className="fa-solid fa-comments"></i> <span>Chat</span>
            </Link>
            <Link href="/mood-journal" className={`nav-link ${pathname === "/mood-journal" ? "active" : ""}`}>
              <i className="fa-solid fa-book"></i> <span>Journal</span>
            </Link>
            <Link href="/wellness" className={`nav-link ${pathname === "/wellness" ? "active" : ""}`}>
              <i className="fa-solid fa-spa"></i> <span>Wellness</span>
            </Link>
            <Link href="/games" className={`nav-link ${pathname === "/games" ? "active" : ""}`}>
              <i className="fa-solid fa-gamepad"></i> <span>Challenges</span>
            </Link>
            <Link href="/audiobooks" className={`nav-link ${pathname === "/audiobooks" ? "active" : ""}`}>
              <i className="fa-solid fa-headphones"></i> <span>Audiobooks</span>
            </Link>
            <Link href="/insights" className={`nav-link ${pathname === "/insights" ? "active" : ""}`}>
              <i className="fa-solid fa-chart-line"></i> <span>Insights</span>
            </Link>
          </nav>

          <div className="header-right">
            <button className="call-header-btn" aria-label="Call HIM" title="Call HIM">
              <i className="fa-solid fa-phone"></i>
            </button>

            <div className="theme-panel-wrapper">
              <button
                className="theme-panel-btn"
                onClick={() => setThemePanelOpen(!themePanelOpen)}
                aria-label="Change theme"
                title="Quick Theme"
              >
                <i className="fa-solid fa-palette"></i>
                <span className="tp-dot" id="tpDot"></span>
              </button>
              <div className={`theme-panel-dropdown ${themePanelOpen ? "open" : ""}`}>
                <div className="tp-header">
                  <h4>
                    <i className="fa-solid fa-palette"></i> App Theme
                  </h4>
                  <Link href="/profile#theme-section">All themes &rarr;</Link>
                </div>
                {/* Simplified theme grid for now */}
                <div className="tp-grid">
                  <button className="tp-swatch" onClick={() => handleThemeChange("pink")}>
                    <span className="tp-circle" style={{ background: "linear-gradient(135deg,#FF7096,#B19CD9)" }}></span>
                  </button>
                  <button className="tp-swatch" onClick={() => handleThemeChange("darknite")}>
                    <span className="tp-circle" style={{ background: "linear-gradient(135deg,#1A1030,#FF7096)" }}></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="notif-wrapper">
              <button className="notif-btn" onClick={() => setNotifOpen(!notifOpen)}>
                <i className="fa-solid fa-bell"></i>
                {notifCount > 0 && <span className="notif-badge">{notifCount}</span>}
              </button>
              <div className={`notif-dropdown ${notifOpen ? "open" : ""}`} style={{ display: notifOpen ? "block" : "none" }}>
                <div className="notif-header">
                  <h4>Notifications</h4>
                  <a href="#">Mark all read</a>
                </div>
                <div className="notif-list">
                  <p className="notif-empty">No new notifications</p>
                </div>
              </div>
            </div>

            <div className="profile-wrapper">
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="profile-avatar">{session?.user?.name?.charAt(0).toUpperCase() || "U"}</div>
                <span className="profile-name">{session?.user?.name || "User"}</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="profile-dropdown" style={{ display: profileOpen ? "block" : "none" }}>
                <Link href="/profile">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <hr />
                <a href="#" className="logout-link" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: "/login" }); }}>
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
