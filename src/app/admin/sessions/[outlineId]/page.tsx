// This page shows one session outline detail for admins.
import { headers } from "next/headers";
import Link from "next/link";
import LoginPrompt from "../../../components/LoginPrompt";
import { getCurrentUser, requestFromCookieHeader } from "../../../../server/auth/session";
import { getSessionOutline } from "../../../../server/admin/sessions";
import SessionDetailClient from "../SessionDetailClient";

export const dynamic = "force-dynamic";

// This loads the outline and renders the admin detail page.
export default async function AdminSessionDetailPage({ params }: { params: { outlineId: string } }) {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Admin login"
            message="Sign in first, then you can open the sessions admin tool."
            buttonLabel="Login to admin"
            afterLoginPath={`/admin/sessions/${params.outlineId}`}
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

  let outline = null;
  try {
    outline = await getSessionOutline(params.outlineId);
  } catch (error) {
    console.error("Loading outline detail failed:", error);
  }

  if (!outline) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="glass-card">
            <h2 className="hero-title">Outline not found.</h2>
            <Link className="secondary-button" href="/admin/sessions" style={{ marginTop: "12px" }}>
              Back to sessions
            </Link>
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
              Session outline
            </h1>
            <p className="hero-lead">{outline.title}</p>
          </div>
          <div className="admin-quick-links">
            <Link className="secondary-button" href="/admin">
              Admin home
            </Link>
            <Link className="secondary-button" href="/admin/journeys">
              Journeys
            </Link>
            <Link className="secondary-button" href="/admin/sessions">
              All sessions
            </Link>
            <form action="/api/auth/logout" method="post" style={{ margin: 0 }}>
              <button type="submit" className="secondary-button danger">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <SessionDetailClient initialOutline={outline} />
      </div>
    </div>
  );
}
