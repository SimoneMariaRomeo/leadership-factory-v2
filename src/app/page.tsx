// This page shows the public landing hero with the main Start button.
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // This keeps the landing focused on a single glowing Start action.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    setLoading(true);
    router.push("/welcome");
  };

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="start-hero">
        <div className="start-ring" aria-hidden="true" />
        <Link
          className="start-logo-btn transition-colors hover:bg-luxury-gold-light hover:shadow-[0_16px_28px_rgba(212,175,55,0.35)] transition-all"
          href="/welcome"
          aria-label="Start"
          onClick={handleClick}
          data-loading={loading ? "true" : "false"}
          aria-busy={loading}
        >
          <span className="btn-spinner" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="start-text">Start</span>
          <img src="/coai-logo.png" alt="" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
