"use client";

// This page shows the saved goal (or a fallback), lets people edit it, and moves to what's-next.
import { useEffect, useMemo, useState } from "react";
import GoldButton from "../components/GoldButton";
import { getPendingGoal } from "../../lib/pending-goal-store";

const FALLBACK_GOAL_TEXT = "No learning goal is available. Please start from the beginning.";

export default function LearningGoalConfirmationPage() {
  // This stores the current goal text or a fallback message.
  const [goal, setGoal] = useState<string>("");
  // This flag notes when a real goal is available.
  const [hasStoredGoal, setHasStoredGoal] = useState<boolean>(false);
  // This toggles whether the edit box is open.
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Typewriter state for title and paragraphs.
  const [typedTitle, setTypedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const displayGoal = hasStoredGoal ? goal : FALLBACK_GOAL_TEXT;
  const paragraphs = useMemo(
    () => [displayGoal, "Please confirm it or edit it and I'll recommend a learning journey for you."],
    [displayGoal]
  );
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(() => paragraphs.map(() => ""));
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const isJsdom = typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
  const skipTyping =
    isJsdom || (typeof process !== "undefined" && (!process.env.NODE_ENV || process.env.NODE_ENV === "test"));
  const paragraphsDone = useMemo(
    () => typedParagraphs.length === paragraphs.length && typedParagraphs.every((text, idx) => text.length === paragraphs[idx].length),
    [typedParagraphs, paragraphs]
  );

  // This reads the goal from session storage on the client.
  useEffect(() => {
    const storedGoal = getPendingGoal();
    if (storedGoal) {
      setGoal(storedGoal);
      setHasStoredGoal(true);
    } else {
      setGoal("");
      setHasStoredGoal(false);
    }
  }, []);

  // This keeps edit mode closed when no goal is present.
  useEffect(() => {
    if (!hasStoredGoal) {
      setIsEditing(false);
    }
  }, [hasStoredGoal]);

  useEffect(() => {
    setTypedTitle("");
    setTitleIndex(0);
    setTypedParagraphs(paragraphs.map(() => ""));
    setParagraphIndex(0);
  }, [paragraphs]);

  // In tests we skip typing so assertions can read the full text immediately.
  useEffect(() => {
    if (!skipTyping) return;
    setTypedTitle("Let me see if I understood:");
    setTitleIndex("Let me see if I understood:".length);
    setTypedParagraphs(paragraphs.map((p) => p));
    setParagraphIndex(paragraphs.length);
  }, [skipTyping, paragraphs]);

  const titleDone = useMemo(() => titleIndex >= "Let me see if I understood:".length, [titleIndex]);

  // Type the title first.
  useEffect(() => {
    const fullTitle = "Let me see if I understood:";
    if (skipTyping) return;
    if (titleIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setTypedTitle(fullTitle.slice(0, titleIndex + 1));
        setTitleIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleIndex, skipTyping]);

  // Then type each paragraph one by one.
  useEffect(() => {
    if (skipTyping) return;
    if (!titleDone || paragraphIndex >= paragraphs.length) return;
    const currentText = paragraphs[paragraphIndex];
    const currentTyped = typedParagraphs[paragraphIndex] || "";

    if (currentTyped.length < currentText.length) {
      const timer = setTimeout(() => {
        setTypedParagraphs((prev) => {
          const copy = [...prev];
          copy[paragraphIndex] = currentText.slice(0, currentTyped.length + 1);
          return copy;
        });
      }, 14);
      return () => clearTimeout(timer);
    }

    const nextTimer = setTimeout(() => setParagraphIndex((prev) => prev + 1), 120);
    return () => clearTimeout(nextTimer);
  }, [titleDone, paragraphIndex, paragraphs, typedParagraphs, skipTyping]);

  const confirmHref = `/whats-next?goal=${encodeURIComponent(goal)}`;

  return (
    <div className="luxury-gradient">
      <main className="intro-card">
        <div className="intro-row">
          <div className="intro-logo">
            <img className="intro-logo-img" src="/coai-logo.png" alt="Coach logo" />
          </div>
          <div className="intro-text-col">
            <h1 className="intro-title">{typedTitle}</h1>
            <p className="intro-paragraph">
              {typedParagraphs[0]}
              {hasStoredGoal && (skipTyping || paragraphsDone) && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  aria-label="Edit goal"
                  style={{ marginLeft: "12px", padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M13.5 3.5L16.5 6.5L6.5 16.5H3.5V13.5L13.5 3.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M11.5 5.5L14.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Edit
                </button>
              )}
            </p>
            {hasStoredGoal && isEditing && (
              <div style={{ margin: "8px 0 6px" }}>
                <input
                  className="goal-input"
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  aria-label="Learning goal text"
                  style={{ width: "100%", maxWidth: "520px" }}
                />
              </div>
            )}
            <p className="intro-paragraph intro-paragraph-italic">{typedParagraphs[1]}</p>
          </div>
        </div>
        {hasStoredGoal ? (
          <GoldButton href={confirmHref}>Confirm</GoldButton>
        ) : (
          <GoldButton href="/learning-guide-intro" asSecondary>
            Start again
          </GoldButton>
        )}
      </main>
    </div>
  );
}
