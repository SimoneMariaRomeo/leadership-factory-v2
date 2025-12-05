// This page introduces the learning guide and links to the placeholder chat route.
import GoldButton from "../components/GoldButton";

export default function LearningGuideIntroPage() {
  // This keeps the exact text from the guide intro notes.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <div className="gold-icon">
          <img className="icon-main" src="/coai-logo.png" alt="Coach icon" />
          <img className="icon-badge" src="/favicon.png" alt="Accent mark" />
        </div>
        <h1 className="hero-title">I'm your learning guide, here to guide your journey of discovery and growth.</h1>
        <p className="hero-lead typewriter">
          I'll ask you a few easy questions about what you'd like to work on, such as your goals, confidence, communication,
          relationships, or everyday challenges.
        </p>
        <p className="hero-lead">Your answers will help me create a personalized learning path.</p>
        <p className="italic-note">When you're ready, let's begin.</p>
        <div className="flex-row">
          <GoldButton href="/journeys/goal-clarification/steps/TEST">I'M READY</GoldButton>
        </div>
      </div>
    </main>
  );
}
