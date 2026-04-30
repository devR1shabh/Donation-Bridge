import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <NavLink to="/dashboard" className="brand">
        Donation Bridge
      </NavLink>

      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            {user?.role === "restaurant" && (
              <>
                <NavLink to="/create-donation">Create</NavLink>
                <NavLink to="/my-donations">My Donations</NavLink>
              </>
            )}
            {user?.role === "ngo" && (
              <>
                <NavLink to="/available-donations">Available</NavLink>
                <NavLink to="/claimed-donations">Claimed</NavLink>
              </>
            )}
            <button className="link-button" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
