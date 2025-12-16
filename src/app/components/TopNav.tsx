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
  picture?: string | null;
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
  const [pendingPath, setPendingPath] = useState<string | null>(null);
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
    if (pendingPath) {
      router.push(pendingPath);
      setPendingPath(null);
    }
    router.refresh();
  };

  const userLabel = useMemo(() => user?.name || user?.email || "You", [user]);

  const navLink = (href: string, label: string, requiresAuth = false) => {
    const active = pathname === href;
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (requiresAuth && !user) {
        event.preventDefault();
        setPendingPath(href);
        setShowAuthModal(true);
      }
    };
    return (
      <Link
        href={href}
        className={`top-nav-link${active ? " top-nav-link-active" : ""}`}
        onClick={handleClick}
        id={href === "/journeys" ? "tour-nav-journeys" : undefined}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <nav className="top-nav">
        <div className="top-nav-inner">
          <div className="top-nav-links">
            {navLink("/", "Home")}
            {navLink("/journeys", "Learning Journeys", true)}
            {navLink("/my-profile", "Profile", true)}
          </div>
        </div>
      </nav>
      <AuthModal
        open={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingPath(null);
        }}
        onAuthenticated={handleAuthSuccess}
      />
    </>
  );
}
