// This page shows the admin tool for journeys and steps.
import { headers } from "next/headers";
import Link from "next/link";
import JourneysClient, { JourneyDetail } from "./JourneysClient";
import LoginPrompt from "../../components/LoginPrompt";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";
import { listAllOutlines, listJourneys, getJourneyDetail } from "../../../server/admin/journeys";

export const dynamic = "force-dynamic";

export default async function AdminJourneysPage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Admin login"
            message="Sign in first, then you can open the journeys admin tool."
            buttonLabel="Login to admin"
            afterLoginPath="/admin/journeys"
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

  const journeys = await listJourneys({ isStandard: "all", status: null, userEmail: null });
  const outlines = await listAllOutlines();
  const firstJourney: JourneyDetail | null = journeys[0]
    ? ((await getJourneyDetail(journeys[0].id)) as unknown as JourneyDetail)
    : null;

  return (
    <div className="content-shell admin-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="admin-page-head">
          <div>
            <p className="hero-kicker">Admin</p>
            <h1 className="hero-title" style={{ marginBottom: 4 }}>
              Journeys &amp; Steps
            </h1>
            <p className="hero-lead">Filter journeys, edit details, manage steps, and reorder them.</p>
          </div>
          <div className="admin-quick-links">
            <Link className="secondary-button" href="/admin/sessions">
              Sessions
            </Link>
            <form action="/api/auth/logout" method="post" style={{ margin: 0 }}>
              <button type="submit" className="secondary-button danger">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <JourneysClient initialJourneys={journeys} initialDetail={firstJourney} outlines={outlines} />
      </div>
    </div>
  );
}
