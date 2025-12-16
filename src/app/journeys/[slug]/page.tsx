// This page shows the journey intro plus a clickable list of steps with simple access rules.
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginPrompt from "../../components/LoginPrompt";
import { loadJourneyWithStepsBySlug, journeySlugOrId } from "../../../lib/journeys";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";

export const dynamic = "force-dynamic";

type JourneyPageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
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

// This rebuilds the same URL (including query params) so login can return the user to the right place.
function buildAfterLoginPath(slug: string, searchParams?: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === "string") query.set(key, value);
      if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    }
  }
  const queryString = query.toString();
  return queryString ? `/journeys/${slug}?${queryString}` : `/journeys/${slug}`;
}

export default async function JourneyPage({ params, searchParams }: JourneyPageProps) {
  const cookieHeader = headers().get("cookie");
  const currentUser = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  // Journeys are only available after login so progress and chats stay private.
  if (!currentUser) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Please log in to view this journey"
            message="Sign in so we can show your journey and keep your progress private."
            buttonLabel="Login to continue"
            afterLoginPath={buildAfterLoginPath(params.slug, searchParams)}
          />
        </div>
      </div>
    );
  }

  const journeyResult = await loadJourneyWithStepsBySlug(params.slug, currentUser?.id || null);

  if (journeyResult.status === "forbidden") {
    redirect("/my-profile");
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
        <div className="journey-hero">
          <h1 className="hero-title journey-hero-title" style={{ marginBottom: "8px" }}>
            {journey.title}
          </h1>
          {journey.intro ? <p className="hero-lead journey-intro-text">{journey.intro}</p> : null}
          {objectives.length > 0 ? (
            <>
              <p className="journey-goal-heading">Objectives</p>
              <ul className="journey-objectives">
                {objectives.map((item, index) => (
                  <li key={item}>
                    <div className="journey-goal-card">
                      <span className="journey-goal-index">{index + 1}</span>
                      <p className="journey-goal-text">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {!journey.isStandard && journey.userGoalSummary ? (
            <div className="journey-detail-box" style={{ marginTop: "12px" }}>
              <p className="journey-detail-label">Goal that inspired this journey</p>
              <p className="journey-detail-text">{journey.userGoalSummary}</p>
            </div>
          ) : null}
        </div>

        <div className="journey-detail" style={{ gap: "14px" }}>
          <h3 className="journey-title journey-steps-title" style={{ fontSize: "20px" }}>
            Available Sessions:
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
                    className="journey-card journey-card-wide journey-step-card"
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
                  <Link
                    key={step.id}
                    href={`/journeys/${journeySlug}/steps/${step.sessionOutline.slug}`}
                    className="journey-card-link-wrapper"
                    aria-label={step.sessionOutline.title}
                  >
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
