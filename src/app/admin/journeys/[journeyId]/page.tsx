// This page shows one journey detail for admins.
import { headers } from "next/headers";
import Link from "next/link";
import LoginPrompt from "../../../components/LoginPrompt";
import { getCurrentUser, requestFromCookieHeader } from "../../../../server/auth/session";
import { getJourneyDetail, listAllOutlines } from "../../../../server/admin/journeys";
import JourneyDetailClient, { JourneyDetail } from "../JourneyDetailClient";

export const dynamic = "force-dynamic";

// This loads the journey and renders the admin detail page.
export default async function AdminJourneyDetailPage({ params }: { params: { journeyId: string } }) {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Admin login"
            message="Sign in first, then you can open the journey admin tool."
            buttonLabel="Login to admin"
            afterLoginPath={`/admin/journeys/${params.journeyId}`}
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

  let journeyDetail: JourneyDetail | null = null;
  try {
    journeyDetail = (await getJourneyDetail(params.journeyId)) as JourneyDetail;
  } catch (error) {
    console.error("Loading journey detail failed:", error);
  }

  if (!journeyDetail) {
    return (
      <div className="content-shell admin-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="glass-card">
            <h2 className="hero-title">Journey not found.</h2>
            <Link className="secondary-button" href="/admin/journeys" style={{ marginTop: "12px" }}>
              Back to journeys
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const outlines = await listAllOutlines();

  return (
    <div className="content-shell admin-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="admin-page-head">
          <div>
            <p className="hero-kicker">Admin</p>
            <h1 className="hero-title" style={{ marginBottom: 4 }}>
              Journey detail
            </h1>
            <p className="hero-lead">{journeyDetail.title}</p>
          </div>
          <div className="admin-quick-links">
            <Link className="secondary-button" href="/admin">
              Admin home
            </Link>
            <Link className="secondary-button" href="/admin/journeys">
              All journeys
            </Link>
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
        <JourneyDetailClient initialDetail={journeyDetail} outlines={outlines} />
      </div>
    </div>
  );
}
