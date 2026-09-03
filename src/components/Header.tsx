"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
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
            <div className="theme-wrapper">
              <button className="theme-btn" onClick={() => setThemePanelOpen(!themePanelOpen)}>
                <i className="fa-solid fa-palette"></i>
              </button>
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
                <div className="profile-avatar">U</div>
                <span className="profile-name">User</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="profile-dropdown" style={{ display: profileOpen ? "block" : "none" }}>
                <Link href="/profile">
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
