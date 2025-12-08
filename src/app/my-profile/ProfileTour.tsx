"use client";

// This card appears only on the first profile visit and hides after the user clicks Got it.
import { useCallback, useEffect, useMemo, useState } from "react";

type ProfileTourProps = {
  userId: string | null;
  show: boolean;
};

export default function ProfileTour({ userId, show: initialShow }: ProfileTourProps) {
  const [show, setShow] = useState(initialShow);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [liveSteps, setLiveSteps] = useState<{ id: string; title: string; description: string }[]>([]);

  useEffect(() => {
    setShow(initialShow);
    if (initialShow) {
      setStepIndex(0);
    }
  }, [initialShow]);

  const steps = useMemo(
    () => [
      { id: "tour-avatar", title: "Avatar", description: "This is your profile picture. Click it anytime to change it." },
      { id: "tour-goal", title: "Your learning goal", description: "Edit your goal here so we can tailor your journey." },
      {
        id: "tour-personalized",
        title: "Your personalized journey",
        description: "When ready, your tailored journey appears here. Open it to continue.",
      },
      {
        id: "tour-conversations",
        title: "Your previous conversations",
        description: "Revisit past learning sessions from this list.",
      },
      {
        id: "tour-nav-journeys",
        title: "Learning journeys menu",
        description: "Browse all available journeys while your personalized plan is being crafted.",
      },
    ],
    []
  );

  useEffect(() => {
    if (!show) {
      setLiveSteps([]);
      return;
    }
    // Defer to ensure the DOM has rendered before querying.
    const timer = setTimeout(() => {
      setLiveSteps(steps);
      setStepIndex(0);
    }, 50);
    return () => clearTimeout(timer);
  }, [show, steps]);

  const positionTooltip = useCallback(
    (rect: DOMRect | null) => {
      if (!rect) return;
      const tooltipWidth = 280;
      const left = Math.max(16, Math.min(rect.left, window.innerWidth - tooltipWidth - 16));
      const top = Math.max(16, Math.min(rect.bottom + 12, window.innerHeight - 160));
      setTooltipPos({ top, left });
    },
    [setTooltipPos]
  );

  const updateHighlight = useCallback(() => {
    if (!show || liveSteps.length === 0) return;
    const safeIndex = Math.min(stepIndex, liveSteps.length - 1);
    const step = liveSteps[safeIndex];
    if (!step) {
      setHighlightRect(null);
      return;
    }
    const el = document.getElementById(step.id);
    if (!el) {
      // Skip missing targets and finish if none remain.
      if (safeIndex >= liveSteps.length - 1) {
        handleGotIt();
      } else {
        setStepIndex((prev) => prev + 1);
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    setHighlightRect(rect);
    positionTooltip(rect);
  }, [liveSteps, positionTooltip, show, stepIndex]);

  useEffect(() => {
    if (!show) return;
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    window.addEventListener("scroll", updateHighlight, true);
    return () => {
      window.removeEventListener("resize", updateHighlight);
      window.removeEventListener("scroll", updateHighlight, true);
    };
  }, [show, updateHighlight]);

  const handleGotIt = async () => {
    try {
      await fetch("/api/profile/tour", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error("Marking tour complete failed:", err);
    }
    setShow(false);
  };

  const handleNext = () => {
    if (liveSteps.length === 0) {
      handleGotIt();
      return;
    }
    if (stepIndex >= liveSteps.length - 1) {
      handleGotIt();
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    handleGotIt();
  };

  if (!show || !userId || liveSteps.length === 0) {
    return null;
  }

  const safeIndex = Math.min(stepIndex, liveSteps.length - 1);
  const currentStep = liveSteps[safeIndex];

  return (
    <>
      {highlightRect ? (
        <div className="tour-overlay" aria-hidden="true">
          <div className="tour-backdrop" />
          <div
            className="tour-highlight"
            style={{
              top: Math.max(0, highlightRect.top - 10),
              left: Math.max(0, highlightRect.left - 10),
              width: highlightRect.width + 20,
              height: highlightRect.height + 20,
            }}
          />
          <div
            className="tour-tooltip"
            style={{
              top: tooltipPos.top,
              left: tooltipPos.left,
            }}
          >
            <p className="tour-title">{currentStep.title}</p>
            <p className="tour-text">{currentStep.description}</p>
            <div className="tour-tooltip-actions">
              <button type="button" className="secondary-button nav-button" onClick={handleSkip}>
                Skip
              </button>
              <button type="button" className="primary-button nav-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
