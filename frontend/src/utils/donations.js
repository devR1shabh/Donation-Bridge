export function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function getDonationImage(donation) {
  const name = donation?.foodName?.toLowerCase() || "";

  if (name.includes("fruit") || name.includes("salad")) {
    return "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("bread") || name.includes("bakery")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
  }

  if (name.includes("rice") || name.includes("meal") || name.includes("plate")) {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80";
  }

  return "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80";
}

export function filterAndSortDonations(donations, query, status, sort) {
  const normalizedQuery = query.trim().toLowerCase();

  return donations
    .filter((donation) => {
      const matchesStatus = status === "all" || donation.status === status;
      const searchable = [
        donation.foodName,
        donation.quantity,
        donation.location,
        donation.postedBy?.name,
        donation.postedBy?.email,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchable.includes(normalizedQuery);
    })
    .sort((first, second) => {
      if (sort === "pickup") {
        return new Date(first.pickupBy) - new Date(second.pickupBy);
      }

      if (sort === "status") {
        return (first.status || "").localeCompare(second.status || "");
      }

      return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
    });
}

export function summarizeDonations(donations) {
  return donations.reduce(
    (summary, donation) => {
      const status = donation.status || "available";
      summary.total += 1;
      summary[status] = (summary[status] || 0) + 1;
      return summary;
    },
    { total: 0, available: 0, claimed: 0, collected: 0 },
  );
}
