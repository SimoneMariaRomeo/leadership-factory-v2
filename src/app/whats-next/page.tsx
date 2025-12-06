"use client";

// This page shows what happens next with a typed intro and goal box.
import { useEffect, useMemo, useState } from "react";
import NoOpButton from "./NoOpButton";

const DEFAULT_GOAL = "Improve my executive communication skills";

export default function WhatsNextPage({
  searchParams,
}: {
  searchParams: { goal?: string };
}) {
  const goal = decodeURIComponent(searchParams?.goal || "").trim() || DEFAULT_GOAL;

  const [typedTitle, setTypedTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const paragraphs = useMemo(
    () => [
      "Congratulations on writing down your learning goal. You just unlocked the very first step toward the best version of yourself.",
      "Our team will now review your goal and prepare a tailor-made learning journey that fits what you shared.",
      "We will reach out very soon. In the meantime, please make sure you are signed in so we can send the details to your inbox.",
    ],
    []
  );
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(() => paragraphs.map(() => ""));

  useEffect(() => {
    setTypedTitle("");
    setTitleIndex(0);
    setParagraphIndex(0);
    setTypedParagraphs(paragraphs.map(() => ""));
  }, [goal, paragraphs]);

  const titleDone = titleIndex >= "You did it!".length;

  // Type title
  useEffect(() => {
    const full = "You did it!";
    if (titleIndex < full.length) {
      const timer = setTimeout(() => {
        setTypedTitle(full.slice(0, titleIndex + 1));
        setTitleIndex((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [titleIndex]);

  // Type paragraphs sequentially
  useEffect(() => {
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
  }, [titleDone, paragraphIndex, paragraphs, typedParagraphs]);

  return (
    <div className="luxury-gradient">
      <main className="intro-card">
        <div className="intro-row">
          <div className="intro-logo">
            <img className="intro-logo-img" src="/coai-logo.png" alt="Coach logo" />
          </div>
          <div className="intro-text-col">
            <h1 className="intro-title">{typedTitle}</h1>
            <p className="intro-paragraph">{typedParagraphs[0]}</p>
            <div className="goal-box" style={{ width: "100%", maxWidth: "680px" }}>
              <div className="goal-label">YOUR LEARNING GOAL</div>
              <div>{goal}</div>
            </div>
            <p className="intro-paragraph">{typedParagraphs[1]}</p>
            <p className="intro-paragraph">{typedParagraphs[2]}</p>
          </div>
        </div>
        <NoOpButton />
      </main>
    </div>
  );
}
