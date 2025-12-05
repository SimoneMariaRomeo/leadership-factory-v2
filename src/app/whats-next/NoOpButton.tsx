"use client";

import { useState } from "react";

// This small button just logs a placeholder message for now.
export default function NoOpButton() {
  const [loading, setLoading] = useState(false);

  // This stops any real action and keeps the step friendly.
  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    console.log("Next steps coming in Step 3.");
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <button
      className="primary-button"
      type="button"
      onClick={handleClick}
      data-loading={loading ? "true" : "false"}
      aria-busy={loading}
    >
      <span className="btn-spinner" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="btn-label">{loading ? "Loading..." : "YES, I'M IN!"}</span>
    </button>
  );
}
