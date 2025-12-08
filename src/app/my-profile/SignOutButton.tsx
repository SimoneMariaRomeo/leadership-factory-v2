"use client";

// This button signs the user out and refreshes the page.
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed:", err);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <button type="button" className="primary-button" onClick={handleSignOut} disabled={signingOut}>
      {signingOut ? "Signing out..." : "Sign out"}
    </button>
  );
}
