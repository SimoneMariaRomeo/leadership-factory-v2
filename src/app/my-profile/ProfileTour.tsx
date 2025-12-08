"use client";

// This card appears only on the first profile visit and hides after the user clicks Got it.
import { useEffect, useState } from "react";

const STORAGE_KEY = "lf_my_profile_seen";

export default function ProfileTour() {
  const [show, setShow] = useState(false);

  // This checks localStorage on the client to decide if the tour should show.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(STORAGE_KEY);
    setShow(!seen);
  }, []);

  // This hides the tour and records that it was acknowledged.
  const handleGotIt = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setShow(false);
  };

  if (!show) {
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
