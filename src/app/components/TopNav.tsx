"use client";

// This top bar shows the brand, the main links, and login/logout with the existing auth modal.
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import AuthModal from "../whats-next/AuthModal";

type NavUser = {
  id: string;
  email: string | null;
  name: string | null;
};

type TopNavProps = {
  initialUser?: NavUser | null;
};

export default function TopNav({ initialUser = null }: TopNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<NavUser | null>(initialUser);
  const [checking, setChecking] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // This fetches the latest auth state so the nav stays in sync.
  const refreshUser = async () => {
    setChecking(true);
    try {
      const response = await fetch("/api/auth/me", { credentials: "include" });
      const data = await response.json();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (user) return;
    refreshUser();
    // We only want to check once on mount when there is no initial user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This handles logout and refreshes the page so server components re-render.
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  // This runs after login/signup and refreshes data plus the current page.
  const handleAuthSuccess = async () => {
    setShowAuthModal(false);
    await refreshUser();
    router.refresh();
  };

  const userLabel = useMemo(() => user?.name || user?.email || "You", [user]);

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link href={href} className={`top-nav-link${active ? " top-nav-link-active" : ""}`}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <nav className="top-nav">
        <div className="top-nav-inner">
          <div className="top-nav-left">
            <Link href="/" className="top-nav-brand">
              <span className="brand-mark" aria-hidden="true">
                LF
              </span>
              <span>Leadership Factory</span>
            </Link>
            <div className="top-nav-links">
              {navLink("/", "Home")}
              {user ? navLink("/journeys", "Learning Journeys") : null}
              {user ? navLink("/my-profile", "Profile") : null}
            </div>
          </div>
          <div className="top-nav-right">
            {!user ? (
              <button
                type="button"
                className="primary-button nav-button"
                onClick={() => setShowAuthModal(true)}
                disabled={checking}
              >
                Login
              </button>
            ) : (
              <div className="nav-user">
                <div className="nav-user-chip" title={userLabel}>
                  <span className="nav-user-dot" aria-hidden="true" />
                  <span className="nav-user-text">{userLabel}</span>
                </div>
                <button
                  type="button"
                  className="secondary-button nav-button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthenticated={handleAuthSuccess} />
    </>
  );
}
