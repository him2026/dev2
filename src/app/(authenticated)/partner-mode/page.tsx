"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function PartnerModePage() {
  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  return (
    <div className="container py-5" style={{ paddingTop: "20px" }}>
      <div className="section-header text-center mb-5" data-aos="fade-up">
        <div className="badge bg-soft-primary text-primary mb-2" style={{ backgroundColor: "rgba(0, 122, 255, 0.1)", padding: "8px 12px", borderRadius: "12px", fontSize: "14px", fontWeight: "bold" }}>Beta Feature</div>
        <h2 className="display-5 fw-bold" style={{ fontSize: "36px", fontWeight: "bold", margin: "16px 0" }}>Partner Sharing Mode</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px", color: "var(--text-secondary)", margin: "0 auto 30px auto" }}>
          Sync your cycle with a partner to foster understanding, improve communication, and ensure you have the support you need, exactly when you need it.
        </p>
      </div>

      <div className="row g-4" style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
        {/* Setup Card */}
        <div className="col-md-6" data-aos="fade-right" style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)", padding: "30px", border: "none" }}>
            <div className="d-flex align-items-center mb-4" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div className="icon-box bg-primary text-white rounded-4 p-3 me-3" style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", background: "var(--color-primary)", color: "white", borderRadius: "16px", marginRight: "16px" }}>
                <i className="fa-solid fa-link-slash"></i>
              </div>
              <h4 className="mb-0" style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Connect a Partner</h4>
            </div>
            <p className="text-secondary mb-4" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>Invite your partner to view your cycle status and receive phase-specific tips on how to support you.</p>
            
            <div className="mb-3" style={{ marginBottom: "20px" }}>
              <label className="form-label fw-bold" style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Partner&apos;s Email</label>
              <div className="input-group" style={{ display: "flex" }}>
                <input type="email" className="form-control" placeholder="partner@example.com" style={{ flex: 1, padding: "12px 16px", borderRadius: "12px 0 0 12px", border: "1px solid var(--border-light)", borderRight: "none" }} />
                <button className="btn btn-primary px-4" style={{ padding: "12px 24px", borderRadius: "0 12px 12px 0" }}>Send Invite</button>
              </div>
            </div>
            <div className="alert alert-info border-0 rounded-4" style={{ fontSize: "14px", background: "rgba(0, 122, 255, 0.1)", color: "#0056b3", padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="fa-solid fa-shield-check"></i> 
              <div>Your partner will <strong>only</strong> see your current phase name and wellness tips. Detailed logs remain private.</div>
            </div>
          </div>
        </div>

        {/* Benefits/Features Card */}
        <div className="col-md-6" data-aos="fade-left" style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: "24px", padding: "30px", border: "none", background: "var(--bg-card)" }}>
            <h4 className="mb-4" style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "bold" }}>Why use Partner Mode?</h4>
            <div className="d-flex mb-3" style={{ display: "flex", marginBottom: "20px" }}>
              <div className="text-primary me-3" style={{ color: "var(--color-primary)", marginRight: "16px", fontSize: "20px" }}><i className="fa-solid fa-check-circle"></i></div>
              <div>
                <h6 className="mb-1" style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>Phase Transparency</h6>
                <p className="small text-muted" style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>Helps partners understand mood shifts and energy levels.</p>
              </div>
            </div>
            <div className="d-flex mb-3" style={{ display: "flex", marginBottom: "20px" }}>
              <div className="text-primary me-3" style={{ color: "var(--color-primary)", marginRight: "16px", fontSize: "20px" }}><i className="fa-solid fa-check-circle"></i></div>
              <div>
                <h6 className="mb-1" style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>Support Tips</h6>
                <p className="small text-muted" style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>Gives partners actionable advice on how to help (e.g., &quot;bring her favorite snacks today&quot;).</p>
              </div>
            </div>
            <div className="d-flex" style={{ display: "flex" }}>
              <div className="text-primary me-3" style={{ color: "var(--color-primary)", marginRight: "16px", fontSize: "20px" }}><i className="fa-solid fa-check-circle"></i></div>
              <div>
                <h6 className="mb-1" style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>Shared Calendar</h6>
                <p className="small text-muted" style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>Plan activities, trips, or events around your cycle more easily.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
