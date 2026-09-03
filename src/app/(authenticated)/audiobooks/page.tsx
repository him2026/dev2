"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AudiobooksPage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const musicContent = [
    { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio', tag: 'Study/Focus' },
    { id: '5qap5aO4i9A', title: 'Lofi Girl - Sleep Beats', tag: 'Relaxation' },
    { id: 'DWcUYEY6Wp4', title: 'Calm Piano Music', tag: 'Meditation' }
  ];

  const videoContent = [
    { id: 'v7AYKMP6rOE', title: '10 Min Morning Yoga', tag: 'Yoga' },
    { id: 'inpok4MKVLM', title: '5 Min Guided Meditation', tag: 'Mindfulness' },
    { id: 's98U9O69D0I', title: 'Cycle Syncing 101', tag: 'Education' }
  ];

  return (
    <div className="content-wrapper">
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "48px" }} data-aos="fade-down">
          <h2 style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-primary)" }}>
            <i className="fa-solid fa-headphones-simple" style={{ color: "var(--color-primary)" }}></i> Wellness Media & Library
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginTop: "8px" }}>Curated YouTube music and video for focus, sleep, and mindfulness</p>
        </div>

        {/* Media Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          
          {/* Soothing Music Section */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                <i className="fa-solid fa-music"></i>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800 }}>Soothing Music & Lo-fi</h3>
            </div>
            
            <div className="grid grid-3">
              {musicContent.map((item, index) => (
                <div key={index} className="card" style={{ padding: 0, overflow: "hidden", borderRadius: "24px", border: "1px solid var(--border-light)" }} data-aos="fade-up">
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                      src={`https://www.youtube.com/embed/${item.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <span style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "11px", fontWeight: 800, padding: "4px 10px", borderRadius: "12px", textTransform: "uppercase" }}>{item.tag}</span>
                    <h4 style={{ marginTop: "10px", fontSize: "17px", fontWeight: 700 }}>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Guided Wellness Videos Section */}
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--color-secondary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-secondary-dark)" }}>
                <i className="fa-solid fa-person-rays"></i>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 800 }}>Guided Wellness & Yoga</h3>
            </div>

            <div className="grid grid-3">
              {videoContent.map((item, index) => (
                <div key={index} className="card" style={{ padding: 0, overflow: "hidden", borderRadius: "24px", border: "1px solid var(--border-light)" }} data-aos="fade-up">
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                      src={`https://www.youtube.com/embed/${item.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <span style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary-dark)", fontSize: "11px", fontWeight: 800, padding: "4px 10px", borderRadius: "12px", textTransform: "uppercase" }}>{item.tag}</span>
                    <h4 style={{ marginTop: "10px", fontSize: "17px", fontWeight: 700 }}>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .content-wrapper {
            background: var(--bg-body);
            min-height: 100vh;
        }
        .card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
            border-color: var(--color-primary);
        }
      `}} />
    </div>
  );
}
