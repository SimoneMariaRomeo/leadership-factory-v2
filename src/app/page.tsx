// This page shows the public landing hero with the main Start button.
import Link from "next/link";

export default function HomePage() {
  // This keeps the landing focused on the single start action with a gentle type effect.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <div className="hero-kicker">Leadership Factory</div>
        <h1 className="hero-title">Grow with a calm, premium learning guide.</h1>
        <p className="hero-lead typewriter">
          Start a gentle, structured path from first hello to a clear learning goal and a personalized journey.
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
