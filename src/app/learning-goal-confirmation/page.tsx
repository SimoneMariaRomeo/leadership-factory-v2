"use client";

// This page shows the dummy goal, lets people edit it, and moves to what's-next.
import { useState } from "react";
import GoldButton from "../components/GoldButton";

const DEFAULT_GOAL = "Improve my executive communication skills";

export default function LearningGoalConfirmationPage() {
  // This stores the current goal text in simple component state.
  const [goal, setGoal] = useState<string>(DEFAULT_GOAL);
  // This toggles whether the edit box is open.
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const confirmHref = `/whats-next?goal=${encodeURIComponent(goal)}`;

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="glass-card">
        <div className="gold-icon">
          <img className="icon-main" src="/coai-logo.png" alt="Coach icon" />
          <img className="icon-badge" src="/favicon.png" alt="Accent mark" />
        </div>
        <h1 className="hero-title">Let me see if I understood:</h1>
        <p className="goal-text">
          <span>{goal}</span>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            aria-label="Edit goal"
          >
            ✏️ Edit
          </button>
        </p>
        {isEditing && (
          <div style={{ marginBottom: "12px" }}>
            <input
              className="goal-input"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              aria-label="Learning goal text"
            />
          </div>
        )}
        <p className="italic-note typewriter-line" style={{ ["--tw-delay" as string]: "0.2s" }}>
          Please confirm it or edit it and I'll recommend a learning journey for you.
        </p>
        <div className="flex-row">
          <GoldButton href={confirmHref}>Confirm</GoldButton>
          <a className="secondary-button" href="/">
            Start over
          </a>
        </div>
      </div>
    </main>
  );
}
