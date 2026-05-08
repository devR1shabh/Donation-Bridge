import { useEffect, useState } from "react";
import api, { getApiError } from "../api/axios";
import DonationCard from "../components/DonationCard";
import DonationToolbar from "../components/DonationToolbar";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import StatusMessage from "../components/StatusMessage";
import { filterAndSortDonations } from "../utils/donations";

export default function ClaimedDonations() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

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

  const visibleDonations = filterAndSortDonations(donations, query, status, sort);

  if (loading) {
    return <Loading text="Loading claimed donations..." />;
  }

  return (
    <section className="list-page">
      <PageHeader
        eyebrow="Pickup tracking"
        title="Claimed Donations"
        description="Review the donations your NGO has claimed and keep collection details visible."
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
          title="No matching claimed donations"
          message="Claim available donations or adjust your filters to see results."
        />
      ) : (
        <div className="donation-list">
          {visibleDonations.map((donation) => (
            <DonationCard key={donation._id} donation={donation} />
          ))}
        </div>
      )}
    </section>
  );
}
