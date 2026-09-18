"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const sidebarMenu = document.getElementById("sidebarMenu");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarClose = document.getElementById("sidebarClose");

    const openSidebar = () => {
      sidebarMenu?.classList.add("open", "active");
      sidebarOverlay?.classList.add("show", "active");
    };

    const closeSidebar = () => {
      sidebarMenu?.classList.remove("open", "active");
      sidebarOverlay?.classList.remove("show", "active");
    };

    sidebarToggle?.addEventListener("click", openSidebar);
    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Close sidebar on route change
    const links = sidebarMenu?.querySelectorAll("a");
    links?.forEach((link) => {
      link.addEventListener("click", closeSidebar);
    });

    return () => {
      sidebarToggle?.removeEventListener("click", openSidebar);
      sidebarClose?.removeEventListener("click", closeSidebar);
      sidebarOverlay?.removeEventListener("click", closeSidebar);
      links?.forEach((link) => {
        link.removeEventListener("click", closeSidebar);
      });
    };
  }, [pathname]);

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
      <aside className="sidebar-menu" id="sidebarMenu" aria-label="Main sidebar navigation">
        <div className="sidebar-header">
          <Link href="/dashboard" className="logo">
            <span className="logo-icon">
              <i className="fa-solid fa-heart"></i>
            </span>
            <span className="logo-text">HIM</span>
          </Link>
          <button className="sidebar-close" id="sidebarClose" aria-label="Close sidebar">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="sidebar-content">
          {/* Flagship AI Section */}
          <div className="sidebar-section">
            <h6 className="sidebar-label">
              <i className="fa-solid fa-wand-magic-sparkles"></i> Flagship AI Companions
            </h6>
            <Link
              href="/voice"
              className={`sidebar-link flagship-link ${pathname === "/voice" ? "active" : ""}`}
            >
              <i className="fa-solid fa-microphone-lines" style={{ color: "#10B981" }}></i>
              <span>Voice Assistant</span>
              <span className="sidebar-badge badge-voice">LIVE</span>
            </Link>
            <Link
              href="/chat"
              className={`sidebar-link flagship-link ${pathname === "/chat" ? "active" : ""}`}
            >
              <i className="fa-solid fa-comments" style={{ color: "#EC4899" }}></i>
              <span>HIM AI Chat</span>
              <span className="sidebar-badge badge-chat">AI 24/7</span>
            </Link>
          </div>

          {/* Core Wellness Section */}
          <div className="sidebar-section">
            <h6 className="sidebar-label">
              <i className="fa-solid fa-heart-pulse"></i> Cycle &amp; Wellness
            </h6>
            <Link
              href="/dashboard"
              className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""}`}
            >
              <i className="fa-solid fa-house"></i> Dashboard
            </Link>
            <Link
              href="/cycle-tracker"
              className={`sidebar-link ${pathname === "/cycle-tracker" ? "active" : ""}`}
            >
              <i className="fa-solid fa-calendar-days"></i> Cycle Tracker
            </Link>
            <Link
              href="/log-period"
              className={`sidebar-link ${pathname === "/log-period" ? "active" : ""}`}
            >
              <i className="fa-solid fa-droplet"></i> Log Period
            </Link>
            <Link
              href="/mood-journal"
              className={`sidebar-link ${pathname === "/mood-journal" ? "active" : ""}`}
            >
              <i className="fa-solid fa-face-smile"></i> Mood Journal
            </Link>
            <Link
              href="/wellness"
              className={`sidebar-link ${pathname === "/wellness" ? "active" : ""}`}
            >
              <i className="fa-solid fa-spa"></i> Wellness Hub
            </Link>
            <Link
              href="/audiobooks"
              className={`sidebar-link ${pathname === "/audiobooks" ? "active" : ""}`}
            >
              <i className="fa-solid fa-headphones"></i> Audiobooks &amp; Sleep
            </Link>
          </div>

          {/* Connection & Care */}
          <div className="sidebar-section">
            <h6 className="sidebar-label">
              <i className="fa-solid fa-users"></i> Connection &amp; Health
            </h6>
            <Link
              href="/partner-mode"
              className={`sidebar-link ${pathname === "/partner-mode" ? "active" : ""}`}
            >
              <i className="fa-solid fa-user-group"></i> Partner Sharing
            </Link>
            <Link
              href="/reports"
              className={`sidebar-link ${pathname === "/reports" ? "active" : ""}`}
            >
              <i className="fa-solid fa-file-medical"></i> Health Reports
            </Link>
            <Link
              href="/community"
              className={`sidebar-link ${pathname === "/community" ? "active" : ""}`}
            >
              <i className="fa-solid fa-masks-theater"></i> Community Forum
            </Link>
          </div>

          {/* Growth & Insights */}
          <div className="sidebar-section">
            <h6 className="sidebar-label">
              <i className="fa-solid fa-chart-line"></i> Insights &amp; Account
            </h6>
            <Link
              href="/games"
              className={`sidebar-link ${pathname === "/games" ? "active" : ""}`}
            >
              <i className="fa-solid fa-gamepad"></i> Challenges &amp; Games
            </Link>
            <Link
              href="/insights"
              className={`sidebar-link ${pathname === "/insights" ? "active" : ""}`}
            >
              <i className="fa-solid fa-chart-pie"></i> Data Insights
            </Link>
            <Link
              href="/profile"
              className={`sidebar-link ${pathname === "/profile" ? "active" : ""}`}
            >
              <i className="fa-solid fa-user-gear"></i> Profile &amp; Themes
            </Link>
          </div>
        </div>

        <div className="sidebar-footer">
          <a href="#" className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        </div>
      </aside>
      <div className="sidebar-overlay" id="sidebarOverlay"></div>
    </>
  );
}
