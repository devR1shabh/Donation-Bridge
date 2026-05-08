import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Clock3,
  HandHeart,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Real-time donation tracking",
    text: "Restaurants and NGOs can follow each donation from posting through pickup and collection.",
  },
  {
    icon: HandHeart,
    title: "NGO claim workflow",
    text: "Available donations are easy to discover, claim, and manage without changing the backend flow.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    text: "Restaurant and NGO screens stay focused through the existing JWT and RBAC protection.",
  },
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    text: "The redesigned auth experience still uses the original login, signup, and token lifecycle.",
  },
  {
    icon: PackageCheck,
    title: "Donation lifecycle management",
    text: "Create, claim, and mark donations collected through polished operational interfaces.",
  },
  {
    icon: BarChart3,
    title: "Dashboard analytics",
    text: "Role-aware dashboard cards summarize live donation status from existing API responses.",
  },
];

const steps = [
  ["Restaurant posts donation", "Food details, quantity, pickup window, and location are submitted."],
  ["NGO claims donation", "A verified NGO claims an available listing before the pickup window closes."],
  ["Pickup is coordinated", "Teams use the donation details to plan collection from the restaurant."],
  ["Donation is marked collected", "Restaurants close the loop once the claimed food has been picked up."],
];

const MotionDiv = motion.div;
const MotionSpan = motion.span;
const MotionHeading = motion.h1;
const MotionParagraph = motion.p;
const MotionArticle = motion.article;

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <MotionSpan
            className="hero-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={16} />
            Food rescue coordination for modern communities
          </MotionSpan>
          <MotionHeading
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
          >
            Reduce food waste by moving surplus meals to NGOs faster.
          </MotionHeading>
          <MotionParagraph
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            DonationBridge connects restaurants and NGOs through a focused,
            role-aware platform for posting donations, claiming available food,
            and completing pickups with confidence.
          </MotionParagraph>
          <MotionDiv
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <Link className="button primary" to="/signup">
              Get Started
              <ArrowRight size={18} />
            </Link>
            <a className="button ghost" href="#features">
              Explore Platform
            </a>
          </MotionDiv>
        </div>

        <MotionDiv
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.16 }}
        >
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
            alt="Volunteers preparing food donations"
          />
          <div className="dashboard-preview">
            <div className="preview-topline">
              <span>Live donation board</span>
              <BadgeCheck size={18} />
            </div>
            <div className="preview-row">
              <span className="preview-dot green" />
              <div>
                <strong>Fresh meals posted</strong>
                <small>Restaurant workflow</small>
              </div>
              <span className="preview-badge">Available</span>
            </div>
            <div className="preview-row">
              <span className="preview-dot orange" />
              <div>
                <strong>NGO pickup scheduled</strong>
                <small>Claim workflow</small>
              </div>
              <span className="preview-badge warm">Claimed</span>
            </div>
          </div>
        </MotionDiv>
      </section>

      <section className="trust-strip" aria-label="Platform highlights">
        <div>
          <strong>JWT protected</strong>
          <span>Secure session flow</span>
        </div>
        <div>
          <strong>Role-aware</strong>
          <span>Restaurant and NGO dashboards</span>
        </div>
        <div>
          <strong>Lifecycle ready</strong>
          <span>Available, claimed, collected</span>
        </div>
        <div>
          <strong>Responsive</strong>
          <span>Built for phone, tablet, desktop</span>
        </div>
      </section>

      <section className="section-block split-block" id="about">
        <div>
          <span className="eyebrow">Why DonationBridge</span>
          <h2>A practical operating layer for local food recovery.</h2>
          <p>
            The platform keeps restaurants focused on posting surplus food and
            NGOs focused on claiming what they can collect. Clear status,
            pickup context, and dashboard summaries make the workflow feel like
            a real product, not a spreadsheet.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80"
          alt="Community food support"
        />
      </section>

      <section className="section-block" id="features">
        <div className="section-heading">
          <span className="eyebrow">Platform features</span>
          <h2>Everything needed to coordinate surplus food responsibly.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <MotionArticle
                className="feature-card"
                key={feature.title}
                whileHover={{ y: -4 }}
              >
                <span className="icon-chip">
                  <Icon size={21} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </MotionArticle>
            );
          })}
        </div>
      </section>

      <section className="section-block workflow-section" id="workflow">
        <div className="section-heading">
          <span className="eyebrow">How it works</span>
          <h2>One clear lifecycle from surplus to collection.</h2>
        </div>
        <div className="workflow-grid">
          {steps.map(([title, text], index) => (
            <article className="workflow-card" key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block persona-section">
        <div className="persona-card restaurant">
          <MapPin size={24} />
          <h3>For restaurants</h3>
          <p>
            Post surplus food with pickup time and location, monitor claim
            status, and close the loop when the donation is collected.
          </p>
        </div>
        <div className="persona-card ngo">
          <UsersRound size={24} />
          <h3>For NGOs</h3>
          <p>
            Browse available donations, claim suitable listings, and track your
            organization’s claimed pickups from a dedicated dashboard.
          </p>
        </div>
      </section>

      <section className="section-block testimonial-section">
        <div className="testimonial-copy">
          <span className="eyebrow">Product feel</span>
          <h2>Built to make the first impression match the mission.</h2>
          <p>
            Modern navigation, polished empty states, responsive cards, and
            clear operational dashboards help DonationBridge feel ready for
            demos, recruiters, and real users.
          </p>
        </div>
        <div className="quote-card">
          <CheckCircle2 size={26} />
          <p>
            “DonationBridge turns a simple CRUD flow into a focused food rescue
            product with clear roles, useful status, and a trustworthy visual
            system.”
          </p>
          <strong>Portfolio review note</strong>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start coordinating food donations with a better product experience.</h2>
        <p>
          Create a restaurant or NGO account and move directly into the workflow
          your role needs.
        </p>
        <Link className="button primary" to="/signup">
          Create an account
          <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="footer">
        <span>DonationBridge</span>
        <a href="#features">Features</a>
        <a href="#workflow">Workflow</a>
        <Link to="/login">Login</Link>
      </footer>
    </div>
  );
}
