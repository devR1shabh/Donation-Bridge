import { Filter, Search } from "lucide-react";

export default function DonationToolbar({
  query,
  setQuery,
  status,
  setStatus,
  sort,
  setSort,
}) {
  return (
    <div className="toolbar">
      <label className="search-field">
        <Search size={18} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search food, location, or restaurant"
        />
      </label>
      <label className="select-field">
        <Filter size={16} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="available">Available</option>
          <option value="claimed">Claimed</option>
          <option value="collected">Collected</option>
        </select>
      </label>
      <label className="select-field">
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="newest">Newest first</option>
          <option value="pickup">Pickup soonest</option>
          <option value="status">Status</option>
        </select>
      </label>
    </div>
  );
}
