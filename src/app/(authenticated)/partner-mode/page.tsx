"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import { QRCodeSVG } from "qrcode.react";

export default function PartnerModePage() {
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const generateCode = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/partner/generate-code", {
        method: "POST"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setPairingCode(data.code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const partnerBase = process.env.NEXT_PUBLIC_PARTNER_URL || 
    (typeof window !== "undefined" && !window.location.hostname.includes("localhost") 
      ? `${window.location.protocol}//partner.${window.location.hostname.replace(/^app\./, "")}` 
      : "http://localhost:3001");
  const partnerUrl = `${partnerBase}/?code=${pairingCode}`;

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
          <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: "24px", background: "linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)", padding: "30px", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="d-flex align-items-center mb-4" style={{ display: "flex", alignItems: "center", marginBottom: "20px", width: "100%" }}>
              <div className="icon-box bg-primary text-white rounded-4 p-3 me-3" style={{ width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", background: "var(--color-primary)", color: "white", borderRadius: "16px", marginRight: "16px" }}>
                <i className="fa-solid fa-link-slash"></i>
              </div>
              <h4 className="mb-0" style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Connect a Partner</h4>
            </div>

            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            {!pairingCode ? (
              <>
                <p className="text-secondary mb-4 text-center" style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>Generate a unique pairing code and QR to share with your partner.</p>
                <button 
                  onClick={generateCode} 
                  className="btn btn-primary px-4 py-3" 
                  disabled={loading}
                  style={{ borderRadius: "12px", fontWeight: "bold", padding: "12px 24px", width: "100%", maxWidth: "250px" }}
                >
                  {loading ? "Generating..." : "Generate Pairing Code"}
                </button>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <div style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                  <QRCodeSVG value={partnerUrl} size={180} level={"Q"} />
                </div>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <p style={{ margin: "0 0 8px 0", color: "var(--text-secondary)", fontSize: "14px" }}>Or enter this code manually:</p>
                  <div style={{ background: "rgba(0,0,0,0.05)", padding: "12px 24px", borderRadius: "12px", fontSize: "24px", fontWeight: "bold", letterSpacing: "2px", color: "var(--color-primary)" }}>
                    {pairingCode}
                  </div>
                </div>
                <button onClick={() => setPairingCode(null)} className="btn btn-outline-secondary btn-sm" style={{ padding: "8px 16px", borderRadius: "8px" }}>Cancel Pairing</button>
              </div>
            )}

            <div className="alert alert-info border-0 rounded-4 mt-4" style={{ fontSize: "14px", background: "rgba(0, 122, 255, 0.1)", color: "#0056b3", padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
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
                <p className="small text-muted" style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>Gives partners actionable advice on how to help (e.g., "bring her favorite snacks today").</p>
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
