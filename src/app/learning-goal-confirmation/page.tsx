"use client";

// This page shows the saved goal (or a fallback), lets people edit it, and moves to what's-next.
import { useEffect, useMemo, useRef, useState } from "react";
import GoldButton from "../components/GoldButton";
import { getPendingGoal } from "../../lib/pending-goal-store";

const FALLBACK_GOAL_TEXT = "No learning goal is available. Please start from the beginning.";
const INSTRUCTION_LINE = "Please confirm it or edit it and I'll recommend a learning journey for you.";

export default function LearningGoalConfirmationPage() {
  // This stores the current goal text or a fallback message.
  const [goal, setGoal] = useState<string>("");
  // This flag notes when a real goal is available.
  const [hasStoredGoal, setHasStoredGoal] = useState<boolean>(false);
  // This toggles whether the edit box is open.
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Typewriter state for title and the single instruction line.
  const [typedTitle, setTypedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedInstruction, setTypedInstruction] = useState("");
  const [instructionIndex, setInstructionIndex] = useState(0);
  const isJsdom = typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom");
  const skipTyping =
    isJsdom || (typeof process !== "undefined" && (!process.env.NODE_ENV || process.env.NODE_ENV === "test"));
  const titleDone = useMemo(() => titleIndex >= "Let me see if I understood:".length, [titleIndex]);
  const instructionDone = useMemo(() => instructionIndex >= INSTRUCTION_LINE.length, [instructionIndex]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const resizeGoalTextarea = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 96)}px`;
  };

  // This reads the goal from session storage on the client.
  useEffect(() => {
    const storedGoal = getPendingGoal();
    if (storedGoal) {
      setGoal(storedGoal);
      setHasStoredGoal(true);
      setTimeout(resizeGoalTextarea, 0);
    } else {
      setGoal("");
      setHasStoredGoal(false);
    }
  }, []);

  useEffect(() => {
    resizeGoalTextarea();
  }, [goal]);

  // In tests we skip typing so assertions can read the full text immediately.
  useEffect(() => {
    if (skipTyping) {
      setTypedTitle("Let me see if I understood:");
      setTitleIndex("Let me see if I understood:".length);
      setTypedInstruction(INSTRUCTION_LINE);
      setInstructionIndex(INSTRUCTION_LINE.length);
    }
  }, [skipTyping]);

  // Type the title once on first render.
  useEffect(() => {
    if (skipTyping) return;
    const fullTitle = "Let me see if I understood:";
    if (titleIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setTypedTitle(fullTitle.slice(0, titleIndex + 1));
        setTitleIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleIndex, skipTyping]);

  // Then type the single instruction line.
  useEffect(() => {
    if (skipTyping || !titleDone) return;
    if (instructionIndex < INSTRUCTION_LINE.length) {
      const timer = setTimeout(() => {
        setTypedInstruction(INSTRUCTION_LINE.slice(0, instructionIndex + 1));
        setInstructionIndex((prev) => prev + 1);
      }, 14);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleDone, instructionIndex, skipTyping]);

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
            {!hasStoredGoal && <p className="intro-paragraph">{FALLBACK_GOAL_TEXT}</p>}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <textarea
                ref={inputRef}
                className="goal-input"
                value={goal}
                onChange={(event) => {
                  setGoal(event.target.value);
                  resizeGoalTextarea();
                }}
                aria-label="Learning goal text"
                disabled={!hasStoredGoal}
                rows={3}
                style={{ width: "100%", maxWidth: "720px", resize: "vertical", minHeight: "96px", lineHeight: 1.5, overflow: "auto" }}
              />
              {hasStoredGoal && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => inputRef.current?.focus()}
                  aria-label="Edit goal"
                  style={{
                    padding: "6px 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--gold)",
                  }}
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
            </div>
            <p className="intro-paragraph intro-paragraph-italic">{typedInstruction}</p>
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
