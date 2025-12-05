// This page shows what happens next and reads the goal from the query string.
import NoOpButton from "./NoOpButton";

const DEFAULT_GOAL = "Improve my executive communication skills";

export default function WhatsNextPage({
  searchParams,
}: {
  searchParams: { goal?: string };
}) {
  // This pulls the goal from the URL or falls back to the sample.
  const goal = decodeURIComponent(searchParams?.goal || "").trim() || DEFAULT_GOAL;

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <h1 className="hero-title">You did it!</h1>
        <p className="hero-lead">
          Congratulations on writing down your learning goal. You just unlocked the very first step toward the best version of yourself.
        </p>
        <div className="goal-box">
          <div className="goal-label">YOUR LEARNING GOAL</div>
          <div>{goal}</div>
        </div>
        <p className="hero-lead">
          Our team will now review your goal and prepare a tailor-made learning journey that fits what you shared.
        </p>
        <p className="hero-lead">
          We will reach out very soon. In the meantime, please make sure you are signed in so we can send the details to your inbox.
        </p>
        <div className="flex-row">
          <NoOpButton />
          <a className="secondary-button" href="/">
            Back home
          </a>
        </div>
      </div>
    </main>
  );
}
