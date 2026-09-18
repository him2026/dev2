"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ForgotPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [step, setStep] = useState<"check" | "reset" | "create">("check");
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Registration fields if user does not exist
  const [regData, setRegData] = useState({
    full_name: "",
    date_of_birth: "2000-01-01",
    last_period_start: new Date().toISOString().split("T")[0],
    avg_cycle_length: "28",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-check if email query parameter was passed from login page
  useEffect(() => {
    if (initialEmail && initialEmail.includes("@")) {
      handleCheckUser(initialEmail);
    }
  }, [initialEmail]);

  const handleCheckUser = async (emailToCheck?: string) => {
    const targetEmail = (emailToCheck || email).trim();
    if (!targetEmail || !targetEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to check account. Please try again.");
        return;
      }

      if (data.exists) {
        setName(data.user?.name || "");
        setEmail(data.user?.email || targetEmail);
        setStep("reset");
        setSuccess(`Account found for ${data.user?.name ? data.user.name + " (" + targetEmail + ")" : targetEmail}! Please set your new password.`);
      } else {
        setEmail(targetEmail);
        setStep("create");
        setRegData((prev) => ({
          ...prev,
          full_name: "",
        }));
        setError("");
        setSuccess(`No existing account found with ${targetEmail}. Fill in the details below to create your account and log in immediately.`);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to update password. Please try again.");
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

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!regData.full_name.trim()) {
      setError("Please enter your full name.");
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: regData.full_name,
          email,
          password,
          date_of_birth: regData.date_of_birth,
          last_period_start: regData.last_period_start,
          avg_cycle_length: regData.avg_cycle_length,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to create account. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Logging you in to your dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1000);
    } catch {
      setError("An unexpected error occurred while creating your account.");
    } finally {
      setLoading(false);
    }
  };

  const resetToCheck = () => {
    setStep("check");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
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
            <h1>
              {step === "check" && "Forgot Password"}
              {step === "reset" && "Set New Password"}
              {step === "create" && "Create Account"}
            </h1>
            <p>
              {step === "check" && "Enter your email to verify your account or get started"}
              {step === "reset" && "Account verified. Choose a new password to log in"}
              {step === "create" && "No account found for this email. Set up your account below"}
            </p>
          </div>

          {/* Success Flash */}
          {success && (
            <div className="flash-message flash-success" style={{ display: "flex", marginBottom: "16px" }}>
              <i className="fa-solid fa-check-circle"></i>
              <span>{success}</span>
            </div>
          )}

          {/* Error Flash */}
          {error && (
            <div className="flash-message flash-error" style={{ display: "flex", marginBottom: "16px" }}>
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Check Email */}
          {step === "check" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckUser();
              }}
            >
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
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "12px" }}
                disabled={loading}
              >
                <i className="fa-solid fa-magnifying-glass"></i>{" "}
                {loading ? "Checking Account..." : "Continue"}
              </button>
              <div className="auth-footer" style={{ marginTop: "20px" }}>
                Remember your password? <Link href="/login">Login here</Link>
              </div>
            </form>
          )}

          {/* STEP 2A: User Exists - Reset Password & Auto Login */}
          {step === "reset" && (
            <form onSubmit={handleResetPassword}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "var(--color-primary-light)",
                  border: "1px solid var(--border-light)",
                  marginBottom: "20px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "11px" }}>
                    Verified Account
                  </span>
                  <strong style={{ color: "var(--color-primary)", fontSize: "14px" }}>
                    {email} {name ? `(${name})` : ""}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={resetToCheck}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Change
                </button>
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
                  placeholder="Minimum 8 characters"
                  required
                  autoFocus
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
                <i className="fa-solid fa-lock-open"></i>{" "}
                {loading ? "Updating & Logging in..." : "Update Password & Log In"}
              </button>

              <div className="auth-footer" style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={resetToCheck}
                  style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer" }}
                >
                  &larr; Check a different email
                </button>
              </div>
            </form>
          )}

          {/* STEP 2B: User Does NOT Exist - Create Account & Auto Login */}
          {step === "create" && (
            <form onSubmit={handleCreateAccount}>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(255, 112, 150, 0.08)",
                  border: "1px solid var(--border-light)",
                  marginBottom: "16px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "11px" }}>
                    Creating Account For
                  </span>
                  <strong style={{ color: "var(--color-primary)" }}>{email}</strong>
                </div>
                <button
                  type="button"
                  onClick={resetToCheck}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Change
                </button>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="full_name">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="full_name"
                  placeholder="Enter your name"
                  required
                  autoFocus
                  value={regData.full_name}
                  onChange={(e) => setRegData({ ...regData, full_name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="new_password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    id="new_password"
                    placeholder="Min 8 chars"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirm_new_password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    id="confirm_new_password"
                    placeholder="Confirm"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row form-row-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="date_of_birth">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    id="date_of_birth"
                    required
                    value={regData.date_of_birth}
                    onChange={(e) => setRegData({ ...regData, date_of_birth: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="last_period_start">
                    Last Period
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    id="last_period_start"
                    required
                    value={regData.last_period_start}
                    onChange={(e) => setRegData({ ...regData, last_period_start: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="avg_cycle_length">
                    Cycle (days)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    id="avg_cycle_length"
                    min="20"
                    max="45"
                    required
                    value={regData.avg_cycle_length}
                    onChange={(e) => setRegData({ ...regData, avg_cycle_length: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "12px" }}
                disabled={loading}
              >
                <i className="fa-solid fa-user-plus"></i>{" "}
                {loading ? "Creating Account & Logging in..." : "Create Account & Log In"}
              </button>

              <div className="auth-footer" style={{ marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={resetToCheck}
                  style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer" }}
                >
                  &larr; Check a different email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
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
      <ForgotPasswordContent />
    </Suspense>
  );
}
