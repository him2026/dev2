"use client";

import React, { useEffect } from "react";
import AOS from "aos";

export default function HomeClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

    // Parallax mouse effect on hero visual (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Skip on mobile

      const moveX = (e.clientX - window.innerWidth / 2) * 0.012;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.012;

      const womanFrame = document.querySelector(".central-woman-frame") as HTMLElement;
      if (womanFrame) {
        womanFrame.style.transform = `translate(${moveX * 1.2}px, ${moveY * 1.2}px)`;
      }

      const glowCircle = document.querySelector(".hero-glow-circle") as HTMLElement;
      if (glowCircle) {
        glowCircle.style.transform = `translate(${moveX * 0.6}px, ${moveY * 0.6}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Scroll progress bar
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const progress = document.getElementById("scrollProgress");
      if (progress) {
        progress.style.width = scrolled + "%";
      }

      // Header shadow on scroll
      const header = document.getElementById("header");
      if (header) {
        if (window.scrollY > 50) {
          header.style.background = "rgba(255, 255, 255, 0.97)";
          header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mobile Menu - with slide-in animation
    const menuBtn = document.getElementById("mobileMenuBtn");
    const menuClose = document.getElementById("mobileMenuClose");
    const menuOverlay = document.getElementById("mobileMenuOverlay");

    const openMenu = () => {
      menuOverlay?.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeMenu = () => {
      menuOverlay?.classList.remove("show");
      document.body.style.overflow = ""; // Restore scrolling
    };

    const handleMenuOverlayClick = (e: MouseEvent) => {
      if (e.target === menuOverlay) closeMenu();
    };

    // Close menu when a link is clicked
    const menuLinks = menuOverlay?.querySelectorAll("a");
    menuLinks?.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    menuBtn?.addEventListener("click", openMenu);
    menuClose?.addEventListener("click", closeMenu);
    menuOverlay?.addEventListener("click", handleMenuOverlayClick);

    document.body.classList.add("guest");

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      menuBtn?.removeEventListener("click", openMenu);
      menuClose?.removeEventListener("click", closeMenu);
      menuOverlay?.removeEventListener("click", handleMenuOverlayClick);
      menuLinks?.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
      document.body.classList.remove("guest");
      document.body.style.overflow = "";
    };
  }, []);

  return <>{children}</>;
}
