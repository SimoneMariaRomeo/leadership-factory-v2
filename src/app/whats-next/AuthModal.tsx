"use client";

// This modal lets people log in or sign up right from the CTA.
import { useEffect, useState } from "react";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
};

// This component renders the simple login/signup modal flow.
export default function AuthModal({ open, onClose, onAuthenticated }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // This resets the form whenever the modal closes.
  useEffect(() => {
    if (!open) {
      setMode("login");
      setEmail("");
      setPassword("");
      setName("");
      setLoading(false);
      setError("");
    }
  }, [open]);

  // This posts to the right auth endpoint based on the chosen mode.
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload =
        mode === "signup"
          ? { email, password, name: name.trim() || undefined }
          : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.user) {
        setError(data?.error || "Please check your details and try again.");
        setLoading(false);
        return;
      }

      // Make sure the browser has the fresh session cookie before continuing.
      try {
        await fetch("/api/auth/me", { credentials: "include" });
      } catch {
        // Ignore a failed warmup; the main login already succeeded.
      }

      setLoading(false);
      onAuthenticated();
    } catch (err) {
      console.error("Auth request failed:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
          border: "1px solid rgba(17,24,39,0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h2 style={{ margin: 0, fontFamily: "Playfair Display, serif", fontSize: "24px" }}>
            {mode === "login" ? "Welcome back" : "Join us"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#5f6b7b",
            }}
          >
            x
          </button>
        </div>
        <p style={{ marginTop: 0, marginBottom: "16px", color: "#5f6b7b", lineHeight: 1.5 }}>
          {mode === "login"
            ? "Sign in so we can save your goal and journey to your profile."
            : "Create your account with email and password to save your journey."}
        </p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <button
            type="button"
            onClick={() => setMode("login")}
            className="secondary-button"
            style={{
              flex: 1,
              background: mode === "login" ? "var(--gold)" : "rgba(255,255,255,0.95)",
              color: mode === "login" ? "#fff" : "var(--text-strong)",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="secondary-button"
            style={{
              flex: 1,
              background: mode === "signup" ? "var(--gold)" : "rgba(255,255,255,0.95)",
              color: mode === "signup" ? "#fff" : "var(--text-strong)",
            }}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {mode === "signup" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="auth-name" style={{ fontWeight: 600, color: "var(--text-strong)" }}>
                Name (optional)
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid rgba(212,175,55,0.35)",
                  fontSize: "15px",
                }}
                placeholder="Your name"
              />
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="auth-email" style={{ fontWeight: 600, color: "var(--text-strong)" }}>
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(212,175,55,0.35)",
                fontSize: "15px",
              }}
              placeholder="you@example.com"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="auth-password" style={{ fontWeight: 600, color: "var(--text-strong)" }}>
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(212,175,55,0.35)",
                fontSize: "15px",
              }}
              placeholder="At least 8 characters"
            />
          </div>
          <button
            type="submit"
            className="primary-button"
            data-loading={loading ? "true" : "false"}
            aria-busy={loading}
            style={{ width: "100%", marginTop: "6px" }}
          >
            <span
              className="btn-spinner"
              aria-hidden="true"
              style={{
                display: loading ? "inline-flex" : "none",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                margin: 0,
              }}
            >
              <span />
              <span />
              <span />
            </span>
            <span className="btn-label" style={loading ? { visibility: "hidden" } : undefined}>
              {mode === "login" ? "Login" : "Create account"}
            </span>
          </button>
          {error && (
            <div
              role="alert"
              style={{
                marginTop: "4px",
                color: "#842029",
                background: "rgba(209, 67, 67, 0.12)",
                border: "1px solid rgba(209, 67, 67, 0.35)",
                padding: "10px 12px",
                borderRadius: "10px",
              }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
