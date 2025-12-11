// This page lets an admin log in and pick between session and journey tools.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../components/LoginPrompt";
import { getCurrentUser, requestFromCookieHeader } from "../../server/auth/session";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Admin login"
            message="Sign in first, then you can open the admin tools."
            buttonLabel="Login to admin"
            afterLoginPath="/admin"
          />
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="glass-card gate-card">
            <div className="gate-copy">
              <h2 className="hero-title" style={{ marginBottom: "8px" }}>
                Admin access only
              </h2>
              <p className="hero-lead" style={{ marginBottom: "16px" }}>
                Your account is not an admin. Please use an admin login.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-shell admin-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="admin-page-head">
          <div>
            <p className="hero-kicker">Admin</p>
            <h1 className="hero-title" style={{ marginBottom: 4 }}>
              Pick a tool
            </h1>
            <p className="hero-lead">Choose sessions or journeys to continue.</p>
          </div>
        </div>

        <div className="admin-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          <div className="admin-filters-card">
            <h3 className="admin-title">Session outlines</h3>
            <p className="hero-lead" style={{ fontSize: "14px", marginBottom: "12px" }}>
              Create, edit, and delete session outlines with filters for live and journey.
            </p>
            <Link href="/admin/sessions" className="primary-button" style={{ display: "inline-block", textAlign: "center" }}>
              Go to sessions
            </Link>
          </div>

          <div className="admin-filters-card">
            <h3 className="admin-title">Journeys & steps</h3>
            <p className="hero-lead" style={{ fontSize: "14px", marginBottom: "12px" }}>
              Edit journey details, assign users, and manage steps with reorder controls.
            </p>
            <Link href="/admin/journeys" className="primary-button" style={{ display: "inline-block", textAlign: "center" }}>
              Go to journeys
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
