"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }
    
    // Simulate sending email
    setSent(true);
    setError("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-art" data-aos="fade-in" data-aos-duration="1000"></div>
      <div className="auth-form-container">
        <div className="auth-card" data-aos="zoom-in-up" data-aos-duration="600">
          <div className="auth-header">
            <Link href="/" className="logo">
              <span className="logo-icon">💕</span>
              <span className="logo-text">HIM</span>
            </Link>
            <h1>Forgot Password</h1>
            <p>Enter your email and we&apos;ll send you a reset link</p>
          </div>
          
          {sent ? (
            <>
              <div className="flash-message flash-success">
                <i className="fa-solid fa-check-circle"></i>
                <span>If that email exists in our system, a reset link has been sent. Check your inbox.</span>
              </div>
              <div className="auth-footer">
                <Link href="/login">← Back to Login</Link>
              </div>
            </>
          ) : (
            <>
              {error && (
                <div className="flash-message flash-error">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input type="email" className="form-input" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoFocus />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  <i className="fa-solid fa-paper-plane"></i> Send Reset Link
                </button>
              </form>
              <div className="auth-footer">
                Remember your password? <Link href="/login">Login here</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
