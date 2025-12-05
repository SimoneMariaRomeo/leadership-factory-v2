// This page introduces the learning guide and links to the placeholder chat route.
import Link from "next/link";

export default function LearningGuideIntroPage() {
  // This keeps the exact text from the guide intro notes.
  return (
    <main className="page-shell">
      <div className="glass-card">
        <div className="gold-icon">LF</div>
        <h1 className="hero-title">I'm your learning guide, here to guide your journey of discovery and growth.</h1>
        <p className="hero-lead">
          I'll ask you a few easy questions about what you'd like to work on, such as your goals, confidence, communication,
          relationships, or everyday challenges.
        </p>
        <p className="hero-lead">Your answers will help me create a personalized learning path.</p>
        <p className="italic-note">When you're ready, let's begin.</p>
        <div className="flex-row">
          <Link className="primary-button" href="/journeys/goal-clarification/steps/TEST">
            I'M READY
          </Link>
        </div>
      </div>
    </main>
  );
}
