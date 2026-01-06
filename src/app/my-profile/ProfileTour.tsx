"use client";

// This card appears only on the first profile visit and hides after the user clicks Got it.
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type ProfileTourProps = {
  userId: string | null;
  show: boolean;
};

export default function ProfileTour({ userId, show: initialShow }: ProfileTourProps) {
  const [show, setShow] = useState(initialShow);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [liveSteps, setLiveSteps] = useState<{ id: string; title: string; description: ReactNode }[]>([]);

  useEffect(() => {
    setShow(initialShow);
    if (initialShow) {
      setStepIndex(0);
    }
  }, [initialShow]);

  const steps = useMemo(
    () => [
      {
        id: "tour-start-anchor",
        title: "Welcome to your profile!",
        description: "Take a quick tour to discover the main areas of your profile.",
      },
      { id: "tour-avatar", title: "This is your profile avatar", description: "Click it anytime to change it." },
      {
        id: "tour-personalized",
        title: "Your personalized journey",
        description: "When ready, your tailored journey appears here. We'll send you an email when there's an update.",
      },
      {
        id: "tour-goal",
        title: "These are your learning goals",
        description: "Edit goals, add new ones, or mark them achieved to keep your journey on track.",
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
      {
        id: "tour-ready-center",
        title: "You're all set",
        description: (
          <>
            <strong>You don't need to do anything right now.</strong> We'll email you when the first step is ready
            (usually within a few days).
          </>
        ),
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
    (rect: DOMRect | null, stepId?: string) => {
      if (!rect) return;
      const tooltipWidth = 280;
      const tooltipHeight = 180;
      const navGuard = 72; // keeps the tooltip clear of the top nav

      if (stepId === "tour-start-anchor" || stepId === "tour-ready-center") {
        const left = Math.max(16, (window.innerWidth - tooltipWidth) / 2);
        const top = Math.max(navGuard + 8, (window.innerHeight - tooltipHeight) / 2);
        setTooltipPos({ top, left });
        return;
      }

      const preferRight = rect.right + 16;
      const leftCandidate = preferRight + tooltipWidth + 16 <= window.innerWidth ? preferRight : rect.left;
      const left = Math.max(16, Math.min(leftCandidate, window.innerWidth - tooltipWidth - 16));
      const below = rect.bottom + 12;
      const topCandidate = Math.max(navGuard + 8, below);
      const top = Math.min(topCandidate, window.innerHeight - tooltipHeight - 16);
      setTooltipPos({ top, left });
    },
    [setTooltipPos]
  );

  const handleGotIt = useCallback(async () => {
    try {
      await fetch("/api/profile/tour", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error("Marking tour complete failed:", err);
    }
    setShow(false);
  }, []);

  const updateHighlight = useCallback(() => {
    if (!show || liveSteps.length === 0) return;
    const safeIndex = Math.min(stepIndex, liveSteps.length - 1);
    const step = liveSteps[safeIndex];
    if (!step) {
      setHighlightRect(null);
      return;
    }
    const isCenteredStep = step.id === "tour-start-anchor" || step.id === "tour-ready-center";
    if (isCenteredStep) {
      // Special case: centered steps use a synthetic center rect.
      const centerRect = new DOMRect(window.innerWidth / 2 - 1, window.innerHeight / 2 - 1, 2, 2);
      setHighlightRect(centerRect);
      positionTooltip(centerRect, step.id);
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
    const needsScroll = rect.top < 0 || rect.bottom > window.innerHeight;
    if (needsScroll) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const nextRect = el.getBoundingClientRect();
        setHighlightRect(nextRect);
        positionTooltip(nextRect, step.id);
      }, 260);
    } else {
      setHighlightRect(rect);
      positionTooltip(rect, step.id);
    }
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
  const isLastStep = safeIndex >= liveSteps.length - 1;

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
                {isLastStep ? "Done" : "Next"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
