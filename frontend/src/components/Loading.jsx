export default function Loading({ text = "Loading..." }) {
  return (
    <div className="loading-state" role="status">
      <span className="spinner" />
      <p>{text}</p>
      <div className="skeleton-grid">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
