import { useEffect, useState } from "react";
import api, { getApiError } from "../api/axios";
import DonationCard from "../components/DonationCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import StatusMessage from "../components/StatusMessage";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [collectingId, setCollectingId] = useState("");

  async function fetchDonations() {
    setError("");

    try {
      const { data } = await api.get("/donation/my-donations");
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

  async function handleCollect(id) {
    setError("");
    setCollectingId(id);

    try {
      const { data } = await api.patch(`/donation/${id}/collect`);
      setDonations((current) =>
        current.map((donation) =>
          donation._id === id ? data.donation : donation,
        ),
      );
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setCollectingId("");
    }
  }

  if (loading) {
    return <Loading text="Loading your donations..." />;
  }

  return (
    <section>
      <h1>My Donations</h1>
      <StatusMessage type="error">{error}</StatusMessage>

      {donations.length === 0 ? (
        <EmptyState
          title="No donations yet"
          message="Create your first donation to make it available for NGOs."
        />
      ) : (
        <div className="donation-list">
          {donations.map((donation) => (
            <DonationCard
              key={donation._id}
              donation={donation}
              actionLabel={
                donation.status === "claimed" ? "Mark as collected" : ""
              }
              onAction={() => handleCollect(donation._id)}
              busy={collectingId === donation._id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
