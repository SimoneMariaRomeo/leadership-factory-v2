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
        <p className="tour-kicker">Quick tour</p>
        <h3 className="hero-title" style={{ margin: "0 0 6px" }}>
          Welcome to your profile
        </h3>
        <ul className="tour-list">
          <li>See your current learning goal.</li>
          <li>Follow your recommended journey.</li>
          <li>Browse all your journeys and standard programs.</li>
        </ul>
      </div>
      <button type="button" className="primary-button" onClick={handleGotIt}>
        Got it
      </button>
    </div>
  );
}
