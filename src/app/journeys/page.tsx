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
        <div className="page-header">
          <h1 className="hero-title" style={{ marginBottom: "8px" }}>
            Learning Journeys
          </h1>
          <p className="hero-lead">Pick a journey to read its outline and steps.</p>
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
                <Link key={journey.id} href={linkHref} className="journey-card journey-card-link-wrapper" aria-label={journey.title}>
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
