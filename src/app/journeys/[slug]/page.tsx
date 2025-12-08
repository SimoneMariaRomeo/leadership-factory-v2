// This page shows the journey intro plus a clickable list of steps with simple access rules.
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loadJourneyWithStepsBySlug, journeySlugOrId } from "../../../lib/journeys";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";

export const dynamic = "force-dynamic";

type JourneyPageProps = {
  params: { slug: string };
};

type StatusTone = { label: string; bg: string; color: string };

// This builds the pill style for each step status.
function statusTone(status: string): StatusTone {
  if (status === "completed") {
    return { label: "Completed", bg: "rgba(34,197,94,0.12)", color: "#0f5132" };
  }
  if (status === "unlocked") {
    return { label: "Start", bg: "rgba(199,157,45,0.16)", color: "#8a6a10" };
  }
  return { label: "Locked", bg: "rgba(148,163,184,0.2)", color: "#475569" };
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const cookieHeader = headers().get("cookie");
  const currentUser = await getCurrentUser(requestFromCookieHeader(cookieHeader));
  const journeyResult = await loadJourneyWithStepsBySlug(params.slug, currentUser?.id || null);

  if (journeyResult.status === "forbidden") {
    redirect(currentUser ? "/my-profile" : "/");
  }

  if (journeyResult.status === "not_found") {
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

  const journey = journeyResult.journey;
  const journeySlug = journeySlugOrId(journey);
  const objectives = Array.isArray(journey.objectives) ? (journey.objectives as string[]) : [];

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="page-header">
          <p className="hero-kicker">{journey.isStandard ? "Standard journey" : "Your personal journey"}</p>
          <h1 className="hero-title" style={{ marginBottom: "6px" }}>
            {journey.title}
          </h1>
          <div className="status-badge">{journey.status}</div>
          {journey.intro ? <p className="hero-lead">{journey.intro}</p> : null}
          {objectives.length > 0 ? (
            <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: "var(--text-soft)", lineHeight: 1.6 }}>
              {objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {!journey.isStandard && journey.userGoalSummary ? (
            <div className="journey-detail-box" style={{ marginTop: "12px" }}>
              <p className="journey-detail-label">Goal that inspired this journey</p>
              <p className="journey-detail-text">{journey.userGoalSummary}</p>
            </div>
          ) : null}
        </div>

        <div className="journey-detail" style={{ gap: "14px" }}>
          <h3 className="journey-title" style={{ fontSize: "20px" }}>
            Steps
          </h3>
          {journey.steps.length === 0 ? (
            <p className="hero-lead" style={{ marginBottom: 0 }}>
              Steps will appear here soon.
            </p>
          ) : (
            <div className="journey-grid" style={{ gridTemplateColumns: "1fr" }}>
              {journey.steps.map((step) => {
                const tone = statusTone(step.status);
                const stepCard = (
                  <div
                    className="journey-card journey-card-wide"
                    style={{
                      opacity: step.status === "locked" ? 0.75 : 1,
                      cursor: step.status === "locked" ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="journey-card-top">
                      <h4 className="journey-title" style={{ fontSize: "18px" }}>
                        {step.sessionOutline.title}
                      </h4>
                      <span
                        className="status-badge"
                        style={{ background: tone.bg, color: tone.color, textTransform: "none", letterSpacing: 0 }}
                      >
                        {tone.label}
                      </span>
                    </div>
                    <p className="journey-intro" style={{ marginBottom: 0 }}>
                      {step.status === "locked"
                        ? "This step will unlock after you finish the previous one."
                        : "Open this step to start the coaching chat."}
                    </p>
                  </div>
                );

                return step.status === "locked" ? (
                  <div key={step.id}>{stepCard}</div>
                ) : (
                  <Link key={step.id} href={`/journeys/${journeySlug}/steps/${step.id}`} className="journey-card-link-wrapper" aria-label={step.sessionOutline.title}>
                    {stepCard}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="journey-detail-actions" style={{ justifyContent: "flex-start" }}>
          <Link href="/journeys" className="secondary-button">
            Back to all journeys
          </Link>
          <Link href="/my-profile" className="primary-button">
            Go to profile
          </Link>
        </div>
      </div>
    </div>
  );
}
