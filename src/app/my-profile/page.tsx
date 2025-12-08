// This page shows the signed-in user's goal, recommended journey, and all of their journeys.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../components/LoginPrompt";
import ProfileTour from "./ProfileTour";
import EditableGoalCard from "./EditableGoalCard";
import { prisma } from "../../server/prismaClient";
import { getCurrentUser, requestFromCookieHeader } from "../../server/auth/session";

export const dynamic = "force-dynamic";

// This builds a tiny avatar with either the uploaded picture or the first letter.
function UserAvatar({ name, email, picture }: { name: string | null; email: string | null; picture: string | null }) {
  const initial = (name || email || "U").trim().charAt(0).toUpperCase();
  return (
    <div className="avatar">
      {picture ? <img src={picture} alt="User avatar" /> : <span>{initial}</span>}
    </div>
  );
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
            message="Sign in to view your learning goal, journeys, and conversations."
            buttonLabel="Login to continue"
            afterLoginPath="/my-profile"
          />
        </div>
      </div>
    );
  }

  const [personalizedJourneys, standardJourneys, recentChats] = await Promise.all([
    prisma.learningJourney.findMany({
      where: {
        isStandard: false,
        personalizedForUserId: user.id,
        status: "active",
      },
      orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        intro: true,
        status: true,
        slug: true,
        userGoalSummary: true,
        isStandard: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.learningJourney.findMany({
      where: { isStandard: true, status: "active" },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: { id: true, title: true, slug: true, intro: true, status: true, isStandard: true },
    }),
    prisma.learningSessionChat.findMany({
      where: { userId: user.id },
      orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
      take: 5,
      select: { id: true, sessionTitle: true, startedAt: true },
    }),
  ]);

  const activeJourneys = [...personalizedJourneys, ...standardJourneys];
  const recommendedJourney = personalizedJourneys[0] || null;

  const formatDate = (date: Date | null | undefined) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <ProfileTour />

        <section className="profile-header">
          <div className="profile-row">
            <UserAvatar name={user.name} email={user.email} picture={(user as any).picture || null} />
            <div>
              <p className="hero-kicker">Welcome back</p>
              <h1 className="hero-title" style={{ margin: 0 }}>
                {user.name || user.email || "Your profile"}
              </h1>
            </div>
          </div>
          <EditableGoalCard initialGoal={user.learningGoal} confirmedAt={user.learningGoalConfirmedAt} />
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <p className="hero-kicker">Learning journeys</p>
              <h2 className="hero-title" style={{ marginBottom: "6px" }}>
                Simple, active list
              </h2>
            </div>
            <Link href="/journeys" className="secondary-button">
              Browse templates
            </Link>
          </div>

          {recommendedJourney ? (
            <div className="journey-card minimal">
              <div className="journey-card-top">
                <span className="journey-tag">Recommended</span>
                <span className="status-badge">{recommendedJourney.status}</span>
              </div>
              <h3 className="journey-title">{recommendedJourney.title}</h3>
              <p className="journey-intro">
                {recommendedJourney.intro ||
                  recommendedJourney.userGoalSummary ||
                  "Your tailored journey is active. Open it to continue."}
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
              <p className="hero-lead" style={{ marginBottom: 0 }}>
                No active personalized journey yet. It will appear here once ready.
              </p>
            </div>
          )}

          {activeJourneys.length === 0 ? (
            <div className="journey-empty">
              <p className="hero-lead" style={{ marginBottom: 0 }}>
                No active journeys to show. Start from the beginning to create one.
              </p>
              <Link href="/welcome" className="primary-button" style={{ marginTop: "10px" }}>
                Start from the beginning
              </Link>
            </div>
          ) : (
            <div className="journey-grid">
              {activeJourneys.map((journey) => {
                const isTemplate = journey.isStandard ?? (journey as any).isStandard === true;
                return (
                  <div key={journey.id} className="journey-card">
                    <div className="journey-card-top">
                      <span className="journey-tag">{isTemplate ? "Template" : "Personalized"}</span>
                      <span className="status-badge">{journey.status}</span>
                    </div>
                    <h3 className="journey-title">{journey.title}</h3>
                    <p className="journey-intro">
                      {journey.intro ||
                        (journey as any).userGoalSummary ||
                        "Open to see more once details are added in the next step."}
                    </p>
                    <Link href={`/journeys/${journey.slug || journey.id}`} className="secondary-button journey-link">
                      Open journey
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <p className="hero-kicker">Recent conversations</p>
              <h2 className="hero-title" style={{ marginBottom: "6px" }}>
                Last chats
              </h2>
            </div>
          </div>
          {recentChats.length === 0 ? (
            <div className="journey-empty">
              <p className="hero-lead" style={{ marginBottom: 0 }}>
                No conversations yet. Start a session to see it here.
              </p>
            </div>
          ) : (
            <ul className="chat-list">
              {recentChats.map((chat) => (
                <li key={chat.id} className="chat-list-item">
                  <div>
                    <p className="chat-title">{chat.sessionTitle || "Conversation"}</p>
                    <p className="tiny-note">{formatDate(chat.startedAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
