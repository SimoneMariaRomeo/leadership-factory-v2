"use client";

// This card appears only on the first profile visit and hides after the user clicks Got it.
import { useEffect, useState } from "react";

type ProfileTourProps = {
  userId: string | null;
  show: boolean;
  onComplete: () => void;
};

export default function ProfileTour({ userId, show: initialShow, onComplete }: ProfileTourProps) {
  const [show, setShow] = useState(initialShow);

  useEffect(() => {
    setShow(initialShow);
  }, [initialShow]);

  const handleGotIt = async () => {
    try {
      await fetch("/api/profile/tour", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error("Marking tour complete failed:", err);
    }
    setShow(false);
    onComplete();
  };

  if (!show || !userId) {
    return null;
  }

  return (
    <div className="tour-card">
      <div>
        <p className="tour-kicker">First time here?</p>
        <p className="hero-lead" style={{ margin: 0 }}>
          Check your goal, open your journeys, and revisit your recent conversations.
        </p>
      </div>
      <button type="button" className="primary-button" onClick={handleGotIt}>
        Got it
      </button>
    </div>
  );
}
