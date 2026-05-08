import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, Sprout, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        <span className="brand-mark">
          <Sprout size={20} />
        </span>
        <span>DonationBridge</span>
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <a href="/#features" onClick={closeMenu}>
          Features
        </a>
        <a href="/#workflow" onClick={closeMenu}>
          How it works
        </a>
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard" onClick={closeMenu}>
              <LayoutDashboard size={17} />
              Dashboard
            </NavLink>
            {user?.role === "restaurant" && (
              <>
                <NavLink to="/create-donation" onClick={closeMenu}>
                  Post Donation
                </NavLink>
                <NavLink to="/my-donations" onClick={closeMenu}>
                  My Donations
                </NavLink>
              </>
            )}
            {user?.role === "ngo" && (
              <>
                <NavLink to="/available-donations" onClick={closeMenu}>
                  Available
                </NavLink>
                <NavLink to="/claimed-donations" onClick={closeMenu}>
                  Claimed
                </NavLink>
              </>
            )}
            <button className="link-button" type="button" onClick={handleLogout}>
              <LogOut size={17} />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu}>
              Login
            </NavLink>
            <NavLink className="nav-cta" to="/signup" onClick={closeMenu}>
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
