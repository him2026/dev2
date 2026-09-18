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
          </div>

          <div className="header-right">
            {/* Voice Call Button */}
            <Link href="/voice" className="call-header-btn" id="callHeaderBtn" aria-label="Call HIM" title="Call HIM">
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
                  <h4><i className="fa-solid fa-palette"></i> App Theme</h4>
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
                      <span className="tp-circle" style={{ background: `linear-gradient(135deg,${t.colors})` }}></span>
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
                      <span className="tp-circle" style={{ background: `linear-gradient(135deg,${t.colors})` }}></span>
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

            {/* Profile Dropdown */}
            <div className="profile-wrapper">
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <div className="profile-avatar">U</div>
                <span className="profile-name">User</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="profile-dropdown" style={{ display: profileOpen ? "block" : "none" }}>
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
