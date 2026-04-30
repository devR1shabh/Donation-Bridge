import { useEffect, useState } from "react";
import api, { getApiError } from "../api/axios";
import DonationCard from "../components/DonationCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import StatusMessage from "../components/StatusMessage";

export default function ClaimedDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      setError("");

      try {
        const { data } = await api.get("/donation/claimed");
        setDonations(data.donations || []);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();
  }, []);

  if (loading) {
    return <Loading text="Loading claimed donations..." />;
  }

  return (
    <section>
      <h1>Claimed Donations</h1>
      <StatusMessage type="error">{error}</StatusMessage>

      {donations.length === 0 ? (
        <EmptyState
          title="No claimed donations"
          message="Claim available donations to track them here."
        />
      ) : (
        <div className="donation-list">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </section>
  );
}
