// This page gives the warm welcome and sends people to the guide intro.
import GoldButton from "../components/GoldButton";

export default function WelcomePage() {
  // This mirrors the wording from the welcome notes.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <div className="gold-icon">
          <img className="icon-main" src="/coai-logo.png" alt="Coach icon" />
          <img className="icon-badge" src="/favicon.png" alt="Accent mark" />
        </div>
        <h1 className="hero-title">Welcome to leadership-factory.cn!</h1>
        <p className="hero-lead typewriter">
          It's a space created to help you grow, reflect, and become the best version of yourself.
        </p>
        <p className="hero-lead">Because every journey begins with a single step.</p>
        <p className="italic-note">Let's take your first step together.</p>
        <div className="flex-row">
          <GoldButton href="/learning-guide-intro">CONTINUE</GoldButton>
        </div>
      </div>
    </main>
  );
}
