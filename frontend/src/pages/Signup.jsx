import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Eye, EyeOff, LockKeyhole, Mail, Sprout, UserRound } from "lucide-react";
import { getApiError } from "../api/axios";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "restaurant",
};

const MotionAside = motion.aside;
const MotionSection = motion.section;

export default function Signup() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, signup } = useAuth();
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

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please complete every required field.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await signup(form);
      showToast("Account created. You can log in now.", "success");
      navigate("/login");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-layout">
      <MotionAside
        className="auth-art signup-art"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="auth-brand">
          <Sprout size={24} />
          <span>DonationBridge</span>
        </div>
        <h1>Join the food recovery network.</h1>
        <p>
          Create the right workspace for your organization and start moving
          surplus food through a simple, trusted workflow.
        </p>
        <div className="auth-art-card">
          <Building2 size={20} />
          <div>
            <strong>Choose your operating role</strong>
            <span>Restaurants post donations. NGOs claim and track pickups.</span>
          </div>
        </div>
      </MotionAside>

      <MotionSection
        className="auth-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="eyebrow">Create workspace</span>
        <h1>Start with DonationBridge</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Organization or user name
            <span className="input-shell">
              <UserRound size={18} />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Green Table Kitchen"
                autoComplete="name"
                required
              />
            </span>
          </label>
          <label>
            Email address
            <span className="input-shell">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="team@example.com"
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
                minLength="6"
                placeholder="At least 6 characters"
                autoComplete="new-password"
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
          <label>
            Role
            <span className="input-shell">
              <Building2 size={18} />
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="restaurant">Restaurant</option>
                <option value="ngo">NGO</option>
              </select>
            </span>
          </label>
          <StatusMessage type="error">{error}</StatusMessage>
          <button className="button primary full" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="muted center-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </MotionSection>
    </section>
  );
}
