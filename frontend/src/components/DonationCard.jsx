function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function DonationCard({ donation, actionLabel, onAction, busy }) {
  return (
    <article className="donation-card">
      <div className="donation-card-header">
        <div>
          <h3>{donation.foodName}</h3>
          <p className="muted">{donation.quantity}</p>
        </div>
        <span className={`badge ${donation.status}`}>{donation.status}</span>
      </div>

      <dl className="donation-details">
        <div>
          <dt>Pickup by</dt>
          <dd>{formatDate(donation.pickupBy)}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{donation.location}</dd>
        </div>
        {donation.postedBy && (
          <div>
            <dt>Restaurant</dt>
            <dd>
              {donation.postedBy.name}
              {donation.postedBy.email ? ` (${donation.postedBy.email})` : ""}
            </dd>
          </div>
        )}
      </dl>

      {actionLabel && (
        <button type="button" onClick={onAction} disabled={busy}>
          {busy ? "Please wait..." : actionLabel}
        </button>
      )}
    </article>
  );
}
