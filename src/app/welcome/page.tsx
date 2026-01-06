// This page shows the welcome screen using the shared intro card.
// This page shows the welcome screen using the shared intro card.
"use client";

// This page shows the welcome screen using the shared intro card and a tiny falling logo after a pause.
import IntroCard from "../components/IntroCard";
import { useEffect, useState } from "react";

const welcomeParagraphs = [
  {
    text: "A space created by Simone and Robin to help you grow as a leader and person.",
  },
  { text: "If you believe that improvement is a choice, click below.", italic: true },
];

export default function WelcomePage() {
  const [showFallingStar, setShowFallingStar] = useState(false);

  // After 5 seconds, let a tiny logo fall once so it's easy to test and easy to remove later.
  useEffect(() => {
    const timer = setTimeout(() => setShowFallingStar(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="welcome-with-star">
      <IntroCard
        title="Welcome!"
        paragraphs={welcomeParagraphs}
        button={{ label: "START", href: "/learning-guide-intro" }}
      />
      {showFallingStar ? (
        <img
          src="/coai-logo.png"
          alt="Falling logo"
          className="falling-star"
          width={18}
          height={18}
        />
      ) : null}
    </div>
  );
}
