// This page lists the active standard journeys for anyone to browse.
import { prisma } from "../../server/prismaClient";
import JourneyGridReveal from "./JourneyGridReveal";

export const dynamic = "force-dynamic";

export default async function JourneysPage() {
  const standardJourneys = await prisma.learningJourney.findMany({
    where: { isStandard: true, status: "active", personalizedForUserId: null },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    select: { id: true, title: true, intro: true, slug: true, status: true },
  });

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
      </div>
    </div>
  );
}
