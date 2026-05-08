import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, Mail, Sprout } from "lucide-react";
import { getApiError } from "../api/axios";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const initialForm = {
  email: "",
  password: "",
};

const MotionAside = motion.aside;
const MotionSection = motion.section;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await login(form);
      showToast("Welcome back to DonationBridge.", "success");
      navigate("/dashboard");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <MotionAside
        className="auth-art"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="auth-brand">
          <Sprout size={24} />
          <span>DonationBridge</span>
        </div>
        <h1>Coordinate pickups with confidence.</h1>
        <p>
          Sign in to manage donations, claim available food, and keep the food
          rescue lifecycle moving.
        </p>
        <div className="auth-art-card">
          <LockKeyhole size={20} />
          <div>
            <strong>Secure role-based access</strong>
            <span>JWT auth keeps each dashboard focused on the user’s role.</span>
          </div>
        </div>
      </MotionAside>

      <MotionSection
        className="auth-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="eyebrow">Welcome back</span>
        <h1>Login to your workspace</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email address
            <span className="input-shell">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </span>
          </label>
          <label>
            Password
            <span className="input-shell">
              <LockKeyhole size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
              <button
                className="icon-button"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>
          <StatusMessage type="error">{error}</StatusMessage>
          <button className="button primary full" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="demo-note">
          Use your configured restaurant or NGO account. Demo credentials can be
          entered here when your backend seed data provides them.
        </div>
        <p className="muted center-text">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </MotionSection>
    </section>
  );
}
