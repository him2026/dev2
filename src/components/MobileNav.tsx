"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
      <Link href="/dashboard" className={`mobile-nav-item ${pathname === "/dashboard" ? "active" : ""}`}>
        <i className="fa-solid fa-house"></i>
        <span>Home</span>
      </Link>
      <Link href="/cycle-tracker" className={`mobile-nav-item ${pathname === "/cycle-tracker" ? "active" : ""}`}>
        <i className="fa-solid fa-calendar-days"></i>
        <span>Tracker</span>
      </Link>
      <Link href="/chat" className={`mobile-nav-item ${pathname === "/chat" ? "active" : ""}`}>
        <i className="fa-solid fa-comments"></i>
        <span>Chat</span>
      </Link>
      <Link href="/wellness" className={`mobile-nav-item ${pathname === "/wellness" ? "active" : ""}`}>
        <i className="fa-solid fa-spa"></i>
        <span>Wellness</span>
      </Link>
      <Link href="/audiobooks" className={`mobile-nav-item ${pathname === "/audiobooks" ? "active" : ""}`}>
        <i className="fa-solid fa-headphones"></i>
        <span>Audio</span>
      </Link>
      <Link href="/insights" className={`mobile-nav-item ${pathname === "/insights" ? "active" : ""}`}>
        <i className="fa-solid fa-chart-line"></i>
        <span>Insights</span>
      </Link>
    </nav>
  );
}
