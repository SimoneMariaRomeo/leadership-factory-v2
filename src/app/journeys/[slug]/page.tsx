// This placeholder shows simple info for any journey until the detailed view arrives in the next step.
import Link from "next/link";
import { prisma } from "../../../server/prismaClient";

export const dynamic = "force-dynamic";

type JourneyPageProps = {
  params: { slug: string };
};

export default async function JourneyPlaceholderPage({ params }: JourneyPageProps) {
  const journey = await prisma.learningJourney.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] },
    select: {
      id: true,
      title: true,
      intro: true,
      status: true,
      isStandard: true,
      userGoalSummary: true,
      personalizedForUserId: true,
    },
  });

  if (!journey) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="journey-empty">
            <h1 className="hero-title" style={{ marginBottom: "8px" }}>
              Journey not found
            </h1>
            <p className="hero-lead">Please return to your list and pick a valid journey.</p>
            <Link href="/journeys" className="primary-button" style={{ marginTop: "12px" }}>
              Go to journeys
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const typeLabel = journey.isStandard ? "Standard template" : "Personalized journey";

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="journey-detail">
          <p className="hero-kicker">{typeLabel}</p>
          <h1 className="hero-title" style={{ marginBottom: "6px" }}>
            {journey.title}
          </h1>
          <div className="status-badge">{journey.status}</div>
          <p className="hero-lead" style={{ marginTop: "10px" }}>
            {journey.intro || "Full journey view (steps + sessions) will be implemented in the next step."}
          </p>
          {!journey.isStandard && journey.userGoalSummary ? (
            <div className="journey-detail-box">
              <p className="journey-detail-label">Goal that inspired this journey</p>
              <p className="journey-detail-text">{journey.userGoalSummary}</p>
            </div>
          ) : null}
          <div className="journey-detail-actions">
            <Link href="/my-profile" className="secondary-button">
              Back to profile
            </Link>
            <Link href="/journeys" className="primary-button">
              View all standard journeys
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
