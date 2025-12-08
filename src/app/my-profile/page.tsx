// This page shows the signed-in user's goal, recommended journey, and all of their journeys.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../components/LoginPrompt";
import ProfileTour from "./ProfileTour";
import EditableGoalCard from "./EditableGoalCard";
import AvatarPicker from "./AvatarPicker";
import SignOutButton from "./SignOutButton";
import { prisma } from "../../server/prismaClient";
import { getCurrentUser, requestFromCookieHeader } from "../../server/auth/session";

export const dynamic = "force-dynamic";

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

  const recommendedJourney = personalizedJourneys[0] || null;
  const combinedJourneys = [...personalizedJourneys, ...standardJourneys];

  const formatDate = (date: Date | null | undefined) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="profile-outer-card">
          <ProfileTour userId={user.id} show={user.profileTour ?? false} onComplete={() => {}} />

          <section className="profile-section">
            <div className="profile-row">
              <AvatarPicker name={user.name} email={user.email} picture={(user as any).picture || null} />
              <div>
                <h1 className="hero-title welcome-title" style={{ margin: 0 }}>
                  <span className="welcome-underline">Welcome back, </span>
                  <span className="welcome-name">{user.name || user.email || "your profile"}!</span>
                </h1>
              </div>
            </div>
            <EditableGoalCard initialGoal={user.learningGoal} confirmedAt={user.learningGoalConfirmedAt} />
          </section>

          <section className="profile-section">
            <div className="section-card">
              <h2 className="hero-kicker section-title" style={{ marginBottom: "12px" }}>
                Your Personalized Learning Journey
              </h2>
              {recommendedJourney ? (
                <Link
                  href={`/journeys/${recommendedJourney.slug || recommendedJourney.id}`}
                  className="journey-card minimal journey-card-link-wrapper"
                >
                  <h3 className="journey-title">{recommendedJourney.title}</h3>
                  <p className="journey-intro">
                    {recommendedJourney.intro ||
                      recommendedJourney.userGoalSummary ||
                      "Your tailored journey is active. Open it to continue."}
                  </p>
                </Link>
              ) : (
                <div className="journey-empty">
                  <p className="hero-lead" style={{ marginBottom: 0 }}>
                    We are preparing your personalized journey. It will appear here soon.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="profile-section">
            <div className="section-card">
              <h2 className="hero-kicker section-title" style={{ marginBottom: "12px" }}>
                Learning Journeys
              </h2>
              {combinedJourneys.length > 0 ? (
                <div className="journey-grid">
                  {combinedJourneys.map((journey) => (
                    <Link
                      key={journey.id}
                      href={`/journeys/${journey.slug || journey.id}`}
                      className="journey-card journey-card-link-wrapper"
                      aria-label={journey.title}
                    >
                      <h3 className="journey-title">{journey.title}</h3>
                      <p className="journey-intro">
                        {journey.intro ||
                          (journey as any).userGoalSummary ||
                          "Open to see more once details are added in the next step."}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <section className="profile-section">
            <div className="section-card">
              <h2 className="hero-kicker section-title" style={{ marginBottom: "12px" }}>
                Your Previous Conversations
              </h2>
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
                      <Link href={`/chats/${chat.id}`} className="chat-list-link" aria-label={chat.sessionTitle || "Conversation"}>
                        <p className="chat-title">{chat.sessionTitle || "Conversation"}</p>
                        <p className="tiny-note">{formatDate(chat.startedAt)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

        </div>
        <div className="signout-row">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
