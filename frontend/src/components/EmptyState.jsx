import { Inbox } from "lucide-react";

export default function EmptyState({ title, message }) {
  return (
    <section className="empty-state">
      <span className="empty-illustration">
        <Inbox size={34} />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </section>
  );
}
