import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (user.role === "restaurant") {
    return (
      <section>
        <h1>Restaurant Dashboard</h1>
        <p className="muted">Create donations and manage pickup status.</p>
        <div className="action-grid">
          <Link className="action-card" to="/create-donation">
            <h3>Create donation</h3>
            <p>Add food details, quantity, pickup time, and location.</p>
          </Link>
          <Link className="action-card" to="/my-donations">
            <h3>My donations</h3>
            <p>Track donations and mark claimed items as collected.</p>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1>NGO Dashboard</h1>
      <p className="muted">Find available donations and manage claimed food.</p>
      <div className="action-grid">
        <Link className="action-card" to="/available-donations">
          <h3>Available donations</h3>
          <p>Browse food currently ready to be claimed.</p>
        </Link>
        <Link className="action-card" to="/claimed-donations">
          <h3>Claimed donations</h3>
          <p>View donations your NGO has already claimed.</p>
        </Link>
      </div>
    </section>
  );
}
