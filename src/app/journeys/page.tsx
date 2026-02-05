// This page lists the active standard journeys for signed-in users to browse.
import { headers } from "next/headers";
import { prisma } from "../../server/prismaClient";
import LoginPrompt from "../components/LoginPrompt";
import JourneyGridReveal from "./JourneyGridReveal";
import { getCurrentUser, requestFromCookieHeader } from "../../server/auth/session";

export const dynamic = "force-dynamic";

export default async function JourneysPage() {
  const cookieHeader = headers().get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Please log in to view learning journeys"
            message="Sign in so we can show the journeys available to you."
            buttonLabel="Login to continue"
            afterLoginPath="/journeys"
          />
        </div>
      </div>
    );
  }

  const [standardJourneys, personalizedJourneys] = await Promise.all([
    prisma.learningJourney.findMany({
      where: { isStandard: true, status: "active", personalizedForUserId: null },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { id: true, title: true, intro: true, slug: true, status: true },
    }),
    prisma.learningJourney.findMany({
      where: {
        isStandard: false,
        personalizedForUserId: user.id,
        status: { in: ["active", "completed"] },
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      select: { id: true, title: true, intro: true, slug: true, status: true },
    }),
  ]);

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="journeys-hero">
          <div className="journeys-veil" aria-hidden="true" />
          <h1 className="journeys-hero-title">Learning Journeys</h1>
          <p className="journeys-hero-lead">Pick a journey to explore its outline and unlock your next steps.</p>
        </div>

        {standardJourneys.length === 0 ? (
          <div className="journey-empty">
            <h3 className="hero-title" style={{ marginBottom: "6px" }}>
              No standard journeys are available yet.
            </h3>
            <p className="hero-lead">An admin will add them soon.</p>
          </div>
        ) : (
          <JourneyGridReveal journeys={standardJourneys} />
        )}

        {personalizedJourneys.length > 0 ? (
          <div style={{ marginTop: "24px" }}>
            <h2 className="journey-title" style={{ marginBottom: "12px" }}>
              Your Personalized Journeys
            </h2>
            <JourneyGridReveal journeys={personalizedJourneys} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
