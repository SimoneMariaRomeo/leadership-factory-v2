// This page shows the public landing hero with the main Start button.
import Link from "next/link";

export default function HomePage() {
  // This keeps the landing focused on a single glowing Start action.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="start-hero">
        <div className="start-ring" aria-hidden="true" />
        <Link
          className="start-logo-btn transition-colors hover:bg-luxury-gold-light hover:shadow-[0_16px_28px_rgba(212,175,55,0.35)] transition-all"
          href="/welcome"
          aria-label="Start"
        >
          <span className="start-text">Start</span>
          <img src="/coai-logo.png" alt="" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
