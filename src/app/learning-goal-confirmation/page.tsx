"use client";

// This page shows the dummy goal, lets people edit it, and moves to what's-next.
import { useEffect, useMemo, useState } from "react";
import GoldButton from "../components/GoldButton";

const DEFAULT_GOAL = "Improve my executive communication skills";

export default function LearningGoalConfirmationPage() {
  // This stores the current goal text in simple component state.
  const [goal, setGoal] = useState<string>(DEFAULT_GOAL);
  // This toggles whether the edit box is open.
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Typewriter state for title and paragraphs.
  const [typedTitle, setTypedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const paragraphs = useMemo(
    () => [goal, "Please confirm it or edit it and I'll recommend a learning journey for you."],
    [goal]
  );
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(() => paragraphs.map(() => ""));
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const isJsdom = typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
  const skipTyping =
    isJsdom || (typeof process !== "undefined" && (!process.env.NODE_ENV || process.env.NODE_ENV === "test"));

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
              <button
                className="secondary-button"
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                aria-label="Edit goal"
                style={{ marginLeft: "12px", padding: "6px 12px" }}
              >
                Edit
              </button>
            </p>
            {isEditing && (
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
        <GoldButton href={confirmHref}>Confirm</GoldButton>
      </main>
    </div>
  );
}
