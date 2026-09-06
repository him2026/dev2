"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    date_of_birth: "",
    avg_cycle_length: "28",
    last_period_start: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-back", once: false });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to register.");
      } else {
        // Automatically login after successful registration, or redirect to login page.
        // For simplicity, redirecting to login.
        router.push("/login?msg=registered");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-art"></div>
      <div className="auth-form-container">
        <div className="auth-card" data-aos="zoom-in-up" data-aos-duration="600">
          <div className="auth-header">
            <Link href="/" className="logo">
              <span className="logo-icon">
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className="logo-text">HIM</span>
            </Link>
            <h1>Create Account</h1>
            <p>Join HIM and start your wellness journey</p>
          </div>

          {error && (
            <div className="flash-message flash-error" style={{ display: "flex", marginBottom: "10px" }}>
              <i className="fa-solid fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="full_name">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="full_name"
                  name="full_name"
                  placeholder="Enter your name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-input"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  name="password"
                  placeholder="Min 8 chars"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
                  name="confirm_password"
                  placeholder="Confirm"
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p className="form-hint" style={{ marginTop: "-6px", marginBottom: "8px", fontSize: "11px" }}>
              Min 8 characters, 1 uppercase, 1 number
            </p>

            <div className="form-row form-row-3">
              <div className="form-group">
                <label className="form-label" htmlFor="date_of_birth">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-input"
                  id="date_of_birth"
                  name="date_of_birth"
                  required
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="last_period_start">
                  Last Period Start
                </label>
                <input
                  type="date"
                  className="form-input"
                  id="last_period_start"
                  name="last_period_start"
                  required
                  value={formData.last_period_start}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="avg_cycle_length">
                  Avg Cycle (days)
                </label>
                <input
                  type="number"
                  className="form-input"
                  id="avg_cycle_length"
                  name="avg_cycle_length"
                  min="20"
                  max="45"
                  required
                  value={formData.avg_cycle_length}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "6px" }} disabled={loading}>
              <i className="fa-solid fa-heart"></i> {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link href="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
