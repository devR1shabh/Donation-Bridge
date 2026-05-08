import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <Compass size={42} />
      <h1>Page not found</h1>
      <p>
        This route does not exist in DonationBridge, but the platform is right
        where you left it.
      </p>
      <Link className="button primary" to="/">
        Back to home
      </Link>
    </section>
  );
}
