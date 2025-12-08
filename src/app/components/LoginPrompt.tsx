"use client";

// This card invites the visitor to sign in and opens the existing auth modal.
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "../whats-next/AuthModal";

type LoginPromptProps = {
  title?: string;
  message: string;
  buttonLabel?: string;
  afterLoginPath?: string;
};

export default function LoginPrompt({
  title = "Please sign in",
  message,
  buttonLabel = "Login",
  afterLoginPath,
}: LoginPromptProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // This runs after login/signup and refreshes the page with the new session.
  const handleAuthenticated = () => {
    setOpen(false);
    if (afterLoginPath) {
      router.push(afterLoginPath);
    }
    router.refresh();
  };

  return (
    <>
      <div className="glass-card gate-card">
        <div className="gate-copy">
          <h2 className="hero-title" style={{ marginBottom: "8px" }}>
            {title}
          </h2>
          <p className="hero-lead" style={{ marginBottom: "16px" }}>
            {message}
          </p>
        </div>
        <div className="gate-actions">
          <button type="button" className="primary-button" onClick={() => setOpen(true)}>
            {buttonLabel}
          </button>
        </div>
      </div>
      <AuthModal open={open} onClose={() => setOpen(false)} onAuthenticated={handleAuthenticated} />
    </>
  );
}
