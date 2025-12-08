// This page shows the signed-in user's goal, recommended journey, and all of their journeys.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../components/LoginPrompt";
import ProfileTour from "./ProfileTour";
import { prisma } from "../../server/prismaClient";
import { getCurrentUser, requestFromCookieHeader } from "../../server/auth/session";

export const dynamic = "force-dynamic";

// This formats a readable date for the goal confirmation line.
function formatDate(date: Date | null | undefined) {
  if (!date) return null;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default async function MyProfilePage() {
  const headerStore = headers();
  const cookieHeader = headerStore.get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Please log in to see your profile"
            message="Sign in to view your learning goal, recommended journey, and progress."
            buttonLabel="Login to continue"
            afterLoginPath="/my-profile"
          />
        </div>
      </div>
    );
  }

  const [personalizedJourneys, standardJourneys] = await Promise.all([
    prisma.learningJourney.findMany({
      where: {
        isStandard: false,
        personalizedForUserId: user.id,
        NOT: { status: "archived" },
      },
      orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        intro: true,
        status: true,
        slug: true,
        userGoalSummary: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.learningJourney.findMany({
      where: { isStandard: true, status: "active" },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { id: true, title: true, slug: true },
      take: 3,
    }),
  ]);

  const recommendedJourney = personalizedJourneys[0] || null;
  const hasGoal = Boolean(user.learningGoal);
  const confirmedAt = formatDate(user.learningGoalConfirmedAt as Date | null | undefined);

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <ProfileTour />

        <section className="profile-hero">
          <div className="profile-hero-text">
            <p className="hero-kicker">Welcome back</p>
            <h1 className="hero-title" style={{ marginBottom: "10px" }}>
              {user.name || user.email || "Your profile"}
            </h1>
            {hasGoal ? (
              <div className="goal-box" style={{ width: "100%", maxWidth: "900px", marginTop: "12px" }}>
                <div className="goal-label">YOUR CURRENT LEARNING GOAL</div>
                <div className="goal-text">{user.learningGoal}</div>
                {confirmedAt ? <p className="tiny-note">Confirmed on {confirmedAt}</p> : null}
              </div>
            ) : (
              <div className="goal-box" style={{ width: "100%", maxWidth: "900px", marginTop: "12px" }}>
                <div className="goal-label">NO GOAL YET</div>
                <div className="goal-text">You haven&apos;t committed a learning goal yet.</div>
                <Link href="/welcome" className="primary-button" style={{ marginTop: "10px" }}>
                  Start from the beginning
                </Link>
              </div>
            )}
          </div>
          <div className="profile-hero-side">
            <p className="hero-lead" style={{ marginTop: 0 }}>
              Keep your goal in sight and let your journeys guide you. We will add more detail once your next steps are ready.
            </p>
            <div className="profile-mini-grid">
              <div className="mini-stat">
                <span className="mini-stat-label">Personalized journeys</span>
                <span className="mini-stat-value">{personalizedJourneys.length}</span>
              </div>
              <div className="mini-stat">
                <span className="mini-stat-label">Standard journeys</span>
                <span className="mini-stat-value">{standardJourneys.length}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <p className="hero-kicker">Recommendation</p>
              <h2 className="hero-title" style={{ marginBottom: "6px" }}>
                Recommended journey
              </h2>
            </div>
          </div>
          {recommendedJourney ? (
            <div className="journey-card journey-card-wide">
              <div className="journey-card-top">
                <span className="journey-tag">Personalized</span>
                <span className="status-badge">{recommendedJourney.status}</span>
              </div>
              <h3 className="journey-title">{recommendedJourney.title}</h3>
              <p className="journey-intro">
                {recommendedJourney.intro ||
                  recommendedJourney.userGoalSummary ||
                  "Your journey outline will fill in as soon as we publish the steps for you."}
              </p>
              <Link
                href={`/journeys/${recommendedJourney.slug || recommendedJourney.id}`}
                className="primary-button journey-link"
              >
                View journey
              </Link>
            </div>
          ) : (
            <div className="journey-empty">
              <h3 className="hero-title" style={{ marginBottom: "6px" }}>
                Your recommended journey will appear here soon.
              </h3>
              <p className="hero-lead">
                {hasGoal
                  ? `We will build a journey around: ${user.learningGoal}`
                  : "Tell us your goal and we will prepare a journey for you."}
              </p>
              {!hasGoal ? (
                <Link href="/welcome" className="primary-button">
                  Set your goal
                </Link>
              ) : null}
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <p className="hero-kicker">Your journeys</p>
              <h2 className="hero-title" style={{ marginBottom: "6px" }}>
                Personalized journeys
              </h2>
            </div>
          </div>
          {personalizedJourneys.length === 0 ? (
            <div className="journey-empty">
              <h3 className="hero-title" style={{ marginBottom: "6px" }}>
                You don&apos;t have any journeys yet.
              </h3>
              <p className="hero-lead">
                {hasGoal
                  ? "We will turn your goal into a journey soon. You will see it here."
                  : "Start from the beginning so we can prepare your first journey."}
              </p>
              {!hasGoal ? (
                <Link href="/welcome" className="primary-button">
                  Start from the beginning
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="journey-grid">
              {personalizedJourneys.map((journey) => (
                <div key={journey.id} className="journey-card">
                  <div className="journey-card-top">
                    <span className="journey-tag">Personalized</span>
                    <span className="status-badge">{journey.status}</span>
                  </div>
                  <h3 className="journey-title">{journey.title}</h3>
                  <p className="journey-intro">
                    {journey.userGoalSummary ||
                      journey.intro ||
                      "This journey will show its steps and sessions once they are ready."}
                  </p>
                  <Link href={`/journeys/${journey.slug || journey.id}`} className="secondary-button journey-link">
                    Open journey
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <p className="hero-kicker">Explore more</p>
              <h2 className="hero-title" style={{ marginBottom: "6px" }}>
                Standard journeys
              </h2>
              <p className="hero-lead">Browse the common templates while we tailor your path.</p>
            </div>
            <Link href="/journeys" className="primary-button">
              Browse journeys
            </Link>
          </div>
          <div className="standard-list">
            {standardJourneys.length === 0 ? (
              <p className="hero-lead">No standard journeys are available yet. An admin will add them soon.</p>
            ) : (
              standardJourneys.map((journey) => (
                <Link key={journey.id} href={`/journeys/${journey.slug || journey.id}`} className="standard-item">
                  <span className="journey-tag">Template</span>
                  <span>{journey.title}</span>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
