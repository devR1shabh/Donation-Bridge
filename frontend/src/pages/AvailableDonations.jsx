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

export default function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const { showToast } = useToast();

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
      showToast("Donation claimed successfully.", "success");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setClaimingId("");
    }
  }

  const visibleDonations = filterAndSortDonations(donations, query, status, sort);

  if (loading) {
    return <Loading text="Loading available donations..." />;
  }

  return (
    <section className="list-page">
      <PageHeader
        eyebrow="NGO board"
        title="Available Donations"
        description="Search and claim fresh donation listings before their pickup window closes."
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
          message="Try adjusting search or filters, or check again later for new donations."
        />
      ) : (
        <div className="donation-list">
          {visibleDonations.map((donation) => (
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
