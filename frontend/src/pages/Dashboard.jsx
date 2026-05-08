import { createElement, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, HandHeart, PackagePlus, Utensils } from "lucide-react";
import api, { getApiError } from "../api/axios";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { useAuth } from "../context/AuthContext";
import { formatDate, summarizeDonations } from "../utils/donations";

export default function Dashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [claimedDonations, setClaimedDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setError("");

      try {
        if (user.role === "restaurant") {
          const { data } = await api.get("/donation/my-donations");
          setDonations(data.donations || []);
          return;
        }

        const [availableResponse, claimedResponse] = await Promise.all([
          api.get("/donation/available"),
          api.get("/donation/claimed"),
        ]);
        setAvailableDonations(availableResponse.data.donations || []);
        setClaimedDonations(claimedResponse.data.donations || []);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user.role]);

  const restaurantSummary = useMemo(() => summarizeDonations(donations), [donations]);
  const ngoSummary = useMemo(
    () => ({
      available: availableDonations.length,
      claimed: claimedDonations.length,
      collected: claimedDonations.filter((donation) => donation.status === "collected").length,
      active: claimedDonations.filter((donation) => donation.status === "claimed").length,
    }),
    [availableDonations, claimedDonations],
  );

  if (loading) {
    return <Loading text="Preparing your dashboard..." />;
  }

  if (user.role === "restaurant") {
    return (
      <section className="dashboard-page">
        <PageHeader
          eyebrow="Restaurant workspace"
          title="Donation command center"
          description="Create food donations, monitor claim status, and complete pickups from one polished dashboard."
          actions={
            <Link className="button primary" to="/create-donation">
              <PackagePlus size={18} />
              Post donation
            </Link>
          }
        />
        <StatusMessage type="error">{error}</StatusMessage>
        <div className="metric-grid">
          <Metric icon={Utensils} label="Total donations" value={restaurantSummary.total} />
          <Metric icon={Clock3} label="Active claims" value={restaurantSummary.claimed} />
          <Metric icon={CheckCircle2} label="Collected" value={restaurantSummary.collected} />
        </div>
        <div className="dashboard-grid">
          <section className="dashboard-panel">
            <div className="panel-title">
              <h2>Recent activity</h2>
              <Link to="/my-donations">View all</Link>
            </div>
            {donations.length === 0 ? (
              <EmptyState
                title="No donations posted"
                message="Post your first surplus food donation to make it visible to NGOs."
              />
            ) : (
              <div className="activity-list">
                {donations.slice(0, 5).map((donation) => (
                  <div className="activity-item" key={donation._id}>
                    <span className={`status-dot ${donation.status}`} />
                    <div>
                      <strong>{donation.foodName}</strong>
                      <small>{donation.quantity} • Pickup by {formatDate(donation.pickupBy)}</small>
                    </div>
                    <span className={`badge ${donation.status}`}>{donation.status}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="dashboard-panel accent-panel">
            <h2>Next best action</h2>
            <p>
              Keep pickup windows specific and location details clear so NGOs
              can decide quickly.
            </p>
            <Link className="inline-action" to="/create-donation">
              Create another donation <ArrowRight size={17} />
            </Link>
          </section>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <PageHeader
        eyebrow="NGO workspace"
        title="Find and coordinate available food"
        description="Browse live donations, claim suitable pickups, and track what your NGO has already committed to collect."
        actions={
          <Link className="button primary" to="/available-donations">
            <HandHeart size={18} />
            Browse donations
          </Link>
        }
      />
      <StatusMessage type="error">{error}</StatusMessage>
      <div className="metric-grid">
        <Metric icon={Utensils} label="Available now" value={ngoSummary.available} />
        <Metric icon={Clock3} label="Active pickups" value={ngoSummary.active} />
        <Metric icon={CheckCircle2} label="Collected" value={ngoSummary.collected} />
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <div className="panel-title">
            <h2>Claimed donation timeline</h2>
            <Link to="/claimed-donations">View all</Link>
          </div>
          {claimedDonations.length === 0 ? (
            <EmptyState
              title="No claimed donations"
              message="Claim a donation from the available board to begin tracking pickups here."
            />
          ) : (
            <div className="activity-list">
              {claimedDonations.slice(0, 5).map((donation) => (
                <div className="activity-item" key={donation._id}>
                  <span className={`status-dot ${donation.status}`} />
                  <div>
                    <strong>{donation.foodName}</strong>
                    <small>{donation.location} • Pickup by {formatDate(donation.pickupBy)}</small>
                  </div>
                  <span className={`badge ${donation.status}`}>{donation.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="dashboard-panel accent-panel">
          <h2>Workflow focus</h2>
          <p>
            Review pickup time, distance, and quantity before claiming so every
            committed donation can be collected on time.
          </p>
          <Link className="inline-action" to="/available-donations">
            Review available food <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </section>
  );
}

function Metric({ icon: MetricIcon, label, value }) {
  return (
    <article className="metric-card">
      <span className="icon-chip">
        {createElement(MetricIcon, { size: 21 })}
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}
