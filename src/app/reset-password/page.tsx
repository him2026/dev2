"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess("Password updated successfully! Logging you in...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-art" data-aos="fade-in" data-aos-duration="1000"></div>
      <div className="auth-form-container">
        <div className="auth-card" data-aos="zoom-in-up" data-aos-duration="600">
          <div className="auth-header">
            <Link href="/" className="logo">
              <span className="logo-icon">
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className="logo-text">HIM</span>
            </Link>
            <h1>Reset Password</h1>
            <p>Choose a new secure password for your account</p>
          </div>

          {success && (
            <div className="flash-message flash-success" style={{ display: "flex", marginBottom: "16px" }}>
              <i className="fa-solid fa-check-circle"></i>
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="flash-message flash-error" style={{ display: "flex", marginBottom: "16px" }}>
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus={!initialEmail}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                required
                autoFocus={!!initialEmail}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "12px" }}
              disabled={loading}
            >
              <i className="fa-solid fa-key"></i>{" "}
              {loading ? "Updating & Logging in..." : "Reset Password & Log In"}
            </button>
          </form>
          <div className="auth-footer" style={{ marginTop: "20px" }}>
            <Link href="/forgot-password">&larr; Back to Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="auth-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="auth-card" style={{ textAlign: "center", padding: "40px" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "32px", color: "var(--color-primary)" }}></i>
            <p style={{ marginTop: "16px" }}>Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
