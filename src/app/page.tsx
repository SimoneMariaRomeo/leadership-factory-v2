// This page shows the public landing hero with the main Start button.
import Link from "next/link";

export default function HomePage() {
  // This keeps the landing simple and points people to the welcome screen.
  return (
    <main className="page-shell">
      <div className="glass-card">
        <div className="hero-kicker">Leadership Factory</div>
        <h1 className="hero-title">Grow with a calm, premium learning guide.</h1>
        <p className="hero-lead">
          Start a gentle, structured path from first hello to a clear learning goal and a personalized journey.
        </p>
        <p className="hero-lead">
          Enjoy the gold glass style, thoughtful steps, and a voice that keeps you focused on your growth.
        </p>
        <div className="flex-row">
          <Link className="primary-button" href="/welcome">
            Start
          </Link>
          <Link className="secondary-button" href="/welcome">
            See how it works
          </Link>
        </div>
      </div>
    </main>
  );
}
