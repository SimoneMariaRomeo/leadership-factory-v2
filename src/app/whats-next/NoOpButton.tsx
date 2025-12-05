"use client";

// This small button just logs a placeholder message for now.
export default function NoOpButton() {
  // This stops any real action and keeps the step friendly.
  const handleClick = () => {
    console.log("Next steps coming in Step 3.");
  };

  return (
    <button className="primary-button" type="button" onClick={handleClick}>
      YES, I'M IN!
    </button>
  );
}
