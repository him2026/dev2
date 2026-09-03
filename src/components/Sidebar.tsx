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
      sidebarMenu?.classList.add("open");
      sidebarOverlay?.classList.add("show");
    };

    const closeSidebar = () => {
      sidebarMenu?.classList.remove("open");
      sidebarOverlay?.classList.remove("show");
    };

    sidebarToggle?.addEventListener("click", openSidebar);
    sidebarClose?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    return () => {
      sidebarToggle?.removeEventListener("click", openSidebar);
      sidebarClose?.removeEventListener("click", closeSidebar);
      sidebarOverlay?.removeEventListener("click", closeSidebar);
    };
  }, []);

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
      <aside className="sidebar-menu" id="sidebarMenu">
        <div className="sidebar-header">
          <Link href="/" className="logo">
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
          <div className="sidebar-section">
            <h6 className="sidebar-label">Main Menu</h6>
            <Link href="/dashboard" className={`sidebar-link ${pathname === "/dashboard" ? "active" : ""}`}>
              <i className="fa-solid fa-house"></i> Dashboard
            </Link>
            <Link href="/cycle-tracker" className={`sidebar-link ${pathname === "/cycle-tracker" ? "active" : ""}`}>
              <i className="fa-solid fa-calendar-days"></i> Cycle Tracker
            </Link>
            <Link href="/mood-journal" className={`sidebar-link ${pathname === "/mood-journal" ? "active" : ""}`}>
              <i className="fa-solid fa-face-smile"></i> Mood Journal
            </Link>
          </div>

          <div className="sidebar-section">
            <h6 className="sidebar-label">AI & Guidance</h6>
            <Link href="/chat" className={`sidebar-link ${pathname === "/chat" ? "active" : ""}`}>
              <i className="fa-solid fa-comments"></i> HIM AI Chat
            </Link>
            <Link href="/voice" className={`sidebar-link ${pathname === "/voice" ? "active" : ""}`}>
              <i className="fa-solid fa-microphone"></i> Voice Assistant
            </Link>
            <Link href="/wellness" className={`sidebar-link ${pathname === "/wellness" ? "active" : ""}`}>
              <i className="fa-solid fa-book-open"></i> Wellness Library
            </Link>
            <Link href="/audiobooks" className={`sidebar-link ${pathname === "/audiobooks" ? "active" : ""}`}>
              <i className="fa-solid fa-headphones"></i> Audiobooks
            </Link>
          </div>

          <div className="sidebar-section">
            <h6 className="sidebar-label">Advanced Features</h6>
            <Link href="/partner-mode" className={`sidebar-link ${pathname === "/partner-mode" ? "active" : ""}`}>
              <i className="fa-solid fa-user-group"></i> Partner Sharing
            </Link>
            <Link href="/reports" className={`sidebar-link ${pathname === "/reports" ? "active" : ""}`}>
              <i className="fa-solid fa-file-medical"></i> Health Reports
            </Link>
            <Link href="/community" className={`sidebar-link ${pathname === "/community" ? "active" : ""}`}>
              <i className="fa-solid fa-masks-theater"></i> Community Forum
            </Link>
          </div>

          <div className="sidebar-section">
            <h6 className="sidebar-label">Insights & Growth</h6>
            <Link href="/games" className={`sidebar-link ${pathname === "/games" ? "active" : ""}`}>
              <i className="fa-solid fa-gamepad"></i> Challenges
            </Link>
            <Link href="/insights" className={`sidebar-link ${pathname === "/insights" ? "active" : ""}`}>
              <i className="fa-solid fa-chart-line"></i> Data Insights
            </Link>
          </div>
        </div>
        <div className="sidebar-footer">
          <a
            href="#"
            className="logout-btn"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        </div>
      </aside>
      <div className="sidebar-overlay" id="sidebarOverlay"></div>
    </>
  );
}
