import { useEffect, useState } from "react";
import api, { getApiError } from "../api/axios";
import DonationCard from "../components/DonationCard";
import DonationToolbar from "../components/DonationToolbar";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { useToast } from "../context/ToastContext";
import { filterAndSortDonations } from "../utils/donations";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [collectingId, setCollectingId] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const { showToast } = useToast();

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
      showToast("Donation marked as collected.", "success");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setCollectingId("");
    }
  }

  const visibleDonations = filterAndSortDonations(donations, query, status, sort);

  if (loading) {
    return <Loading text="Loading your donations..." />;
  }

  return (
    <section className="list-page">
      <PageHeader
        eyebrow="Restaurant inventory"
        title="My Donations"
        description="Track every donation you posted, monitor claim status, and close completed pickups."
      />
      <StatusMessage type="error">{error}</StatusMessage>
      <DonationToolbar
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {visibleDonations.length === 0 ? (
        <EmptyState
          title="No matching donations"
          message="Create your first donation or adjust your current filters."
        />
      ) : (
        <div className="donation-list">
          {visibleDonations.map((donation) => (
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
