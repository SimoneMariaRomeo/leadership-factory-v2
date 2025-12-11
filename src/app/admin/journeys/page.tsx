// This page shows the admin tool for journeys and steps.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import JourneysClient from "./JourneysClient";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";
import { listAllOutlines, listJourneys, getJourneyDetail } from "../../../server/admin/journeys";

export const dynamic = "force-dynamic";

export default async function AdminJourneysPage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const journeys = await listJourneys({ isStandard: "all", status: null, userEmail: null });
  const outlines = await listAllOutlines();
  const firstJourney = journeys[0] ? await getJourneyDetail(journeys[0].id) : null;

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
        </div>
        <JourneysClient initialJourneys={journeys} initialDetail={firstJourney} outlines={outlines} />
      </div>
    </div>
  );
}
