// This page lists the active standard journeys for anyone to browse.
import Link from "next/link";
import { prisma } from "../../server/prismaClient";

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
          <div className="journey-grid">
            {standardJourneys.map((journey) => {
              const linkHref = `/journeys/${journey.slug || journey.id}`;
              return (
                <Link
                  key={journey.id}
                  href={linkHref}
                  className="journey-card journey-card-link-wrapper journey-card-fancy"
                  aria-label={journey.title}
                >
                  <h3 className="journey-title">{journey.title}</h3>
                  <p className="journey-intro">
                    {journey.intro || "This journey outline will be expanded with steps in the next step of the build."}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
