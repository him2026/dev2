"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    // Simulate password reset
    router.push("/login?msg=password_reset");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-art" data-aos="fade-in" data-aos-duration="1000"></div>
      <div className="auth-form-container">
        <div className="auth-card" data-aos="zoom-in-up" data-aos-duration="600">
          <div className="auth-header">
            <Link href="/" className="logo">
              <span className="logo-icon"><i className="fa-solid fa-heart"></i></span>
              <span className="logo-text">HIM</span>
            </Link>
            <h1>Reset Password</h1>
            <p>Choose a new secure password</p>
          </div>
          
          {error && (
            <div className="flash-message flash-error">
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="password">New Password</label>
              <input type="password" className="form-input" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 chars, 1 uppercase, 1 number" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
              <input type="password" className="form-input" id="confirm_password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              <i className="fa-solid fa-key"></i> Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
