"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import { useTheme } from "@/components/ThemeProvider";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  
  const [user, setUser] = useState({
    full_name: "Jane Doe",
    email: "jane@example.com",
    date_of_birth: "1995-05-15",
    avg_cycle_length: 28,
    avg_period_length: 5,
    notification_enabled: true
  });
  
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    AOS.init({ duration: 600, once: false });
  }, []);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy update
    setSuccessMsg("Profile updated!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy update
    setSuccessMsg("Password changed successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleThemeChange = (name: string) => {
    setTheme(name);
    const msg = document.getElementById('theme-saved-msg');
    if (msg) {
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 2500);
    }
  };

  const confirmDelete = () => {
    if (window.confirm('Delete Account? This will permanently delete ALL your data. This action cannot be undone.')) {
      // Dummy delete
      alert("Account deleted.");
    }
  };

  return (
    <div className="container-sm" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
      <h2 data-aos="zoom-in-up" style={{ marginBottom: "24px" }}>
        <i className="fa-solid fa-user" style={{ color: "var(--color-secondary)" }}></i> Profile Settings
      </h2>
      
      {errorMsg && (
        <div className="flash-message flash-error" style={{ margin: "0 0 16px" }}>
          <i className="fa-solid fa-exclamation-circle"></i>
          <span>{errorMsg}</span>
        </div>
      )}
      {successMsg && (
        <div className="flash-message flash-success" style={{ margin: "0 0 16px" }}>
          <i className="fa-solid fa-check-circle"></i>
          <span>{successMsg}</span>
        </div>
      )}
      
      {/* Profile Info */}
      <div className="card mb-3" data-aos="zoom-in-up">
        <h3 className="card-title">Personal Information</h3>
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" name="full_name" value={user.full_name} onChange={e => setUser({...user, full_name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={user.email} disabled />
            <p className="form-hint">Email cannot be changed</p>
          </div>
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-input" name="date_of_birth" value={user.date_of_birth} onChange={e => setUser({...user, date_of_birth: e.target.value})} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Avg Cycle Length (days)</label>
              <input type="number" className="form-input" name="avg_cycle_length" value={user.avg_cycle_length} min="20" max="45" onChange={e => setUser({...user, avg_cycle_length: parseInt(e.target.value)})} />
            </div>
            <div className="form-group">
              <label className="form-label">Avg Period Length (days)</label>
              <input type="number" className="form-input" name="avg_period_length" value={user.avg_period_length} min="2" max="10" onChange={e => setUser({...user, avg_period_length: parseInt(e.target.value)})} />
            </div>
          </div>
          <label className="form-check mb-2">
            <input type="checkbox" name="notification_enabled" checked={user.notification_enabled} onChange={e => setUser({...user, notification_enabled: e.target.checked})} />
            Enable notifications
          </label>
          <button type="submit" className="btn btn-primary"><i className="fa-solid fa-save"></i> Save Changes</button>
        </form>
      </div>
      
      {/* Change Password */}
      <div className="card mb-3" data-aos="zoom-in-up" data-aos-delay="100">
        <h3 className="card-title">Change Password</h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-input" name="current_password" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" name="new_password" required />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input type="password" className="form-input" name="confirm_password" required />
            </div>
          </div>
          <button type="submit" className="btn btn-secondary"><i className="fa-solid fa-key"></i> Change Password</button>
        </form>
      </div>
      
      {/* Theme Color Changer */}
      <div className="card mb-3" data-aos="zoom-in-up" data-aos-delay="150" id="theme-section">
        <h3 className="card-title">
          <i className="fa-solid fa-palette" style={{ color: "var(--color-secondary)" }}></i>
          &nbsp;App Theme &amp; Color
        </h3>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
          Personalise your experience by choosing a colour palette that feels like <em>you</em>.
        </p>

        {/* ✨ Light & Pastel */}
        <div className="theme-section-label">Light &amp; Pastel</div>
        <div className="theme-grid">
          {[
            { id: 'pink', name: 'Blossom', colors: '#FF7096,#B19CD9' },
            { id: 'pookie', name: 'Pookie', colors: '#FFB3C6,#FFC8DD' },
            { id: 'cottoncandy', name: 'Cotton Candy', colors: '#FF85A1,#85C1FF' },
            { id: 'peach', name: 'Peachy', colors: '#FFAD8A,#FFCBA4' },
            { id: 'lavender', name: 'Lavender', colors: '#9B72CF,#C9A8E8' },
            { id: 'rosegold', name: 'Rose Gold', colors: '#E8A0BF,#C67C9E' },
            { id: 'mint', name: 'Mint', colors: '#10B981,#6EE7B7' },
            { id: 'ocean', name: 'Ocean', colors: '#0EA5E9,#38BDF8' },
            { id: 'sunset', name: 'Sunset', colors: '#F97316,#FBBF24' },
            { id: 'cherry', name: 'Cherry', colors: '#EF4444,#FB7185' },
          ].map(t => (
            <button key={t.id} className={`theme-swatch ${theme === t.id ? 'active' : ''}`} title={t.name} onClick={() => handleThemeChange(t.id)}>
              <span className="swatch-preview" style={{ background: `linear-gradient(135deg,${t.colors})` }}></span>
              <span className="swatch-label">{t.name}</span>
              <span className="swatch-check"><i className="fa-solid fa-check"></i></span>
            </button>
          ))}
        </div>

        {/* 🌙 Dark Modes */}
        <div className="theme-section-label" style={{ marginTop: "22px" }}>Dark Modes</div>
        <div className="theme-grid">
          {[
            { id: 'darknite', name: 'Dark Night', colors: '#1A1030,#FF7096' },
            { id: 'darkviolet', name: 'Dark Violet', colors: '#0D0820,#7C3AED' },
            { id: 'darkocean', name: 'Dark Ocean', colors: '#050F1A,#0EA5E9' },
            { id: 'darkrose', name: 'Dark Rose', colors: '#180810,#FB7185' },
            { id: 'darkforest', name: 'Dark Forest', colors: '#071A0E,#10B981' },
          ].map(t => (
            <button key={t.id} className={`theme-swatch ${theme === t.id ? 'active' : ''}`} title={t.name} onClick={() => handleThemeChange(t.id)}>
              <span className="swatch-preview" style={{ background: `linear-gradient(135deg,${t.colors})` }}></span>
              <span className="swatch-label">{t.name}</span>
              <span className="swatch-check"><i className="fa-solid fa-check"></i></span>
            </button>
          ))}
        </div>

        <p id="theme-saved-msg" style={{ display: "none", marginTop: "14px", fontSize: "13px", color: "var(--color-success)", fontWeight: 600 }}>
          <i className="fa-solid fa-circle-check"></i> Theme saved!
        </p>
      </div>

      {/* Danger Zone */}
      <div className="card" data-aos="zoom-in-up" data-aos-delay="200" style={{ borderColor: "var(--color-error)" }}>
        <h3 className="card-title" style={{ color: "var(--color-error)" }}>Danger Zone</h3>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
          Deleting your account will permanently remove all your data including cycle history, mood logs, and chat history. This cannot be undone.
        </p>
        <button type="button" className="btn btn-sm" style={{ background: "var(--color-error)", color: "white" }} onClick={confirmDelete}>
          <i className="fa-solid fa-trash"></i> Delete Account
        </button>
      </div>
    </div>
  );
}
