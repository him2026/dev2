"use client";

import React, { useEffect } from "react";
import AOS from "aos";

export default function HomeClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.015;

      const womanFrame = document.querySelector(".central-woman-frame") as HTMLElement;
      if (womanFrame) {
        womanFrame.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
      }

      const glowCircle = document.querySelector(".hero-glow-circle") as HTMLElement;
      if (glowCircle) {
        glowCircle.style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progress = document.getElementById("scrollProgress");
      if (progress) {
        progress.style.width = scrolled + "%";
      }

      const header = document.getElementById("header");
      if (header) {
        if (window.scrollY > 50) {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
        } else {
          header.style.background = "rgba(255, 255, 255, 0.95)";
          header.style.boxShadow = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Mobile Menu
    const menuBtn = document.getElementById("mobileMenuBtn");
    const menuClose = document.getElementById("mobileMenuClose");
    const menuOverlay = document.getElementById("mobileMenuOverlay");

    const openMenu = () => menuOverlay?.classList.add("show");
    const closeMenu = () => menuOverlay?.classList.remove("show");
    const handleMenuOverlayClick = (e: MouseEvent) => {
      if (e.target === menuOverlay) closeMenu();
    };

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
      document.body.classList.remove("guest");
    };
  }, []);

  return <>{children}</>;
}
