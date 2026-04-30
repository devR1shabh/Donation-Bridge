import { useEffect, useState } from "react";
import api, { getApiError } from "../api/axios";
import DonationCard from "../components/DonationCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import StatusMessage from "../components/StatusMessage";

export default function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState("");

  async function fetchDonations() {
    setError("");

    try {
      const { data } = await api.get("/donation/available");
      setDonations(data.donations || []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDonations();
  }, []);

  async function handleClaim(id) {
    setError("");
    setClaimingId(id);

    try {
      await api.post(`/donation/${id}/claim`);
      setDonations((current) =>
        current.filter((donation) => donation._id !== id),
      );
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setClaimingId("");
    }
  }

  if (loading) {
    return <Loading text="Loading available donations..." />;
  }

  return (
    <section>
      <h1>Available Donations</h1>
      <StatusMessage type="error">{error}</StatusMessage>

      {donations.length === 0 ? (
        <EmptyState
          title="No available donations"
          message="Check again later for newly posted food donations."
        />
      ) : (
        <div className="donation-list">
          {donations.map((donation) => (
            <DonationCard
              key={donation._id}
              donation={donation}
              actionLabel="Claim donation"
              onAction={() => handleClaim(donation._id)}
              busy={claimingId === donation._id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
