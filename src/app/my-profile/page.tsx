// This page shows the signed-in user's goals, recommended journey, and recent conversations.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../components/LoginPrompt";
import ProfileTour from "./ProfileTour";
import GoalsPanel from "./GoalsPanel";
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
              message="Sign in to view your learning goals, journeys, and conversations."
              buttonLabel="Login to continue"
              afterLoginPath="/my-profile"
            />
        </div>
      </div>
    );
  }

  const [personalizedJourneys, recentChats, goals] = await Promise.all([
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
    prisma.learningSessionChat.findMany({
      where: { userId: user.id },
      orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
      take: 5,
      select: { id: true, sessionTitle: true, startedAt: true },
    }),
    prisma.userGoal.findMany({
      where: { userId: user.id },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      select: { id: true, statement: true, status: true, updatedAt: true },
    }),
  ]);

  const recommendedJourney = personalizedJourneys[0] || null;

  const formatDate = (date: Date | null | undefined) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : null;

  return (
    <div className="content-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner">
        <div className="profile-outer-card">
          <div
            id="tour-start-anchor"
            aria-hidden="true"
            style={{ position: "absolute", top: 16, left: 16, width: 1, height: 1, pointerEvents: "none" }}
          />
          <ProfileTour userId={user.id} show={user.profileTour ?? false} />

          <section className="profile-section">
            <div className="profile-row">
              <div id="tour-avatar">
                <AvatarPicker name={user.name} email={user.email} picture={(user as any).picture || null} />
              </div>
              <div>
                <h1 className="hero-title welcome-title" style={{ margin: 0 }}>
                  <span className="welcome-name">
                    Hi {user.name || user.email || "there"}!
                  </span>
                  <br />
                  <span className="welcome-focus">
                    Here’s what you’re working on
                  </span>
                </h1>

              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="section-card" id="tour-personalized">
              <h2 className="hero-kicker section-title" style={{ marginBottom: "12px" }}>
                Your Personalized Learning Journey
              </h2>
              {recommendedJourney ? (
                <Link
                  href={`/journeys/${recommendedJourney.slug || recommendedJourney.id}`}
                  className="journey-card minimal journey-card-link-wrapper personalized-highlight"
                >
                  <h3 className="journey-title">{recommendedJourney.title}</h3>
                  <p className="journey-intro">
                    {recommendedJourney.intro ||
                      recommendedJourney.userGoalSummary ||
                      "Your tailored journey is active. Open it to continue."}
                  </p>
                </Link>
              ) : (
                <>
                  <div className="journey-wait-box" aria-live="polite">
                    <p style={{ margin: "0 0 6px", fontWeight: 700, color: "var(--text-strong)" }}>
                      Shaping your journey
                    </p>
                    <div className="journey-progress" role="progressbar" aria-valuetext="Preparing your journey" />
                    <p className="hero-lead" style={{ marginBottom: 0 }}>
                      We're turning your goal into small, practical steps. Your first step will appear here, usually
                      within 2-3 days.
                    </p>
                  </div>
                  <p className="hero-lead" style={{ margin: "12px 0 0", color: "var(--text-soft)" }}>
                    You don't need to do anything right now. We'll let you know as soon as it's ready.
                  </p>
                </>
              )}
            </div>
          </section>

          <section className="profile-section" id="tour-goal">
            <GoalsPanel
              goals={goals.map((goal) => ({
                id: goal.id,
                statement: goal.statement,
                status: goal.status,
                updatedAt: goal.updatedAt.toISOString(),
              }))}
            />
          </section>

          <section className="profile-section">
            <div className="section-card" id="tour-conversations">
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
