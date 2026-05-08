import { motion } from "framer-motion";
import { Building2, CalendarClock, MapPin, Package, Utensils } from "lucide-react";
import { formatDate, getDonationImage } from "../utils/donations";

const MotionArticle = motion.article;

export default function DonationCard({ donation, actionLabel, onAction, busy }) {
  return (
    <MotionArticle
      className="donation-card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
    >
      <div className="donation-image">
        <img src={getDonationImage(donation)} alt="" />
        <span className={`badge ${donation.status}`}>{donation.status}</span>
      </div>

      <div className="donation-card-body">
        <div className="donation-card-header">
          <div>
            <span className="mini-label">
              <Utensils size={14} />
              Food donation
            </span>
            <h3>{donation.foodName}</h3>
          </div>
        </div>

        <dl className="donation-details">
          <div>
            <Package size={17} />
            <span>
              <dt>Quantity</dt>
              <dd>{donation.quantity}</dd>
            </span>
          </div>
          <div>
            <CalendarClock size={17} />
            <span>
              <dt>Pickup by</dt>
              <dd>{formatDate(donation.pickupBy)}</dd>
            </span>
          </div>
          <div>
            <MapPin size={17} />
            <span>
              <dt>Location</dt>
              <dd>{donation.location}</dd>
            </span>
          </div>
          {donation.postedBy && (
            <div>
              <Building2 size={17} />
              <span>
                <dt>Restaurant</dt>
                <dd>
                  {donation.postedBy.name}
                  {donation.postedBy.email ? ` (${donation.postedBy.email})` : ""}
                </dd>
              </span>
            </div>
          )}
        </dl>

        {actionLabel && (
          <button
            className="button primary full"
            type="button"
            onClick={onAction}
            disabled={busy}
          >
            {busy ? "Please wait..." : actionLabel}
          </button>
        )}
      </div>
    </MotionArticle>
  );
}
