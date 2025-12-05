// This page gives the warm welcome and sends people to the guide intro.
import Link from "next/link";

export default function WelcomePage() {
  // This mirrors the wording from the welcome notes.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <div className="gold-icon">
          <img src="/coai-logo.png" alt="Coach icon" />
        </div>
        <h1 className="hero-title">Welcome to leadership-factory.cn!</h1>
        <p className="hero-lead">
          It's a space created to help you grow, reflect, and become the best version of yourself.
        </p>
        <p className="hero-lead">Because every journey begins with a single step.</p>
        <p className="italic-note">Let's take your first step together.</p>
        <div className="flex-row">
          <Link className="primary-button" href="/learning-guide-intro">
            CONTINUE
          </Link>
        </div>
      </div>
    </main>
  );
}
