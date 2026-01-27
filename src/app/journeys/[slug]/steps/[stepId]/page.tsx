// This page loads a journey step, checks access, and shows the chat for that step.
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NeedAnalysisChat from "./NeedAnalysisChat";
import LoginPrompt from "../../../../components/LoginPrompt";
import { prisma } from "../../../../../server/prismaClient";
import { loadStepWithAccess, getOrCreateStepChat, journeySlugOrId } from "../../../../../lib/journeys";
import { getCurrentUser, requestFromCookieHeader } from "../../../../../server/auth/session";

type StepPageProps = {
  params: { slug: string; stepId: string };
};

// This keeps the step page dynamic so it always loads fresh data.
export const dynamic = "force-dynamic";

export default async function JourneyStepPage({ params }: StepPageProps) {
  const headerStore = headers();
  const cookieHeader = headerStore.get("cookie");
  const currentUser = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  // Steps are only available after login so chats stay private.
  if (!currentUser) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Please log in to view this step"
            message="Sign in so we can open this session for you."
            buttonLabel="Login to continue"
            afterLoginPath={`/journeys/${params.slug}/steps/${params.stepId}`}
          />
        </div>
      </div>
    );
  }

  const journey = await prisma.learningJourney.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] },
    select: { id: true, slug: true, isStandard: true, personalizedForUserId: true },
  });

  if (!journey) {
    redirect("/journeys");
  }

  // First try by ID, then fall back to slug within this journey.
  let foundStep = await prisma.learningJourneyStep.findUnique({
    where: { id: params.stepId },
    include: { journey: true, sessionOutline: true, chats: true },
  });

  if (!foundStep || foundStep.journeyId !== journey.id) {
    foundStep = await prisma.learningJourneyStep.findFirst({
      where: {
        journeyId: journey.id,
        sessionOutline: { slug: params.stepId },
      },
      include: { journey: true, sessionOutline: true, chats: true },
    });
  }

  if (!foundStep) {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="glass-card">
          <h1 className="hero-title">This step does not exist.</h1>
          <p className="hero-lead">Please return to your journey list and pick a valid step.</p>
        </div>
      </main>
    );
  }

  const access = await loadStepWithAccess(foundStep.id, currentUser?.id || null);

  if (access.status === "forbidden") {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="glass-card">
          <h1 className="hero-title">You do not have access</h1>
          <p className="hero-lead">
            This session belongs to a different account. Please sign in with the email that received the invite.
          </p>
          <div className="journey-detail-actions" style={{ justifyContent: "flex-start", marginTop: "12px" }}>
            <a href="/my-profile" className="primary-button">
              Go to profile
            </a>
            <a href="/journeys" className="secondary-button">
              Back to all journeys
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (access.status === "not_found") {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="glass-card">
          <h1 className="hero-title">This step does not exist.</h1>
          <p className="hero-lead">Please return to your journey list and pick a valid step.</p>
        </div>
      </main>
    );
  }

  const step = access.step;
  const journeySlug = journeySlugOrId(step.journey);
  if (params.slug !== step.journey.slug && params.slug !== step.journey.id) {
    redirect("/journeys");
  }

  if (step.status === "locked") {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="glass-card">
          <h1 className="hero-title">This step is locked.</h1>
          <p className="hero-lead">Finish the previous step to unlock this one.</p>
        </div>
      </main>
    );
  }

  const journeySteps = await prisma.learningJourneyStep.findMany({
    where: { journeyId: step.journeyId },
    orderBy: { order: "asc" },
    select: { id: true },
  });
  const stepIndex = journeySteps.findIndex((entry) => entry.id === step.id);
  const previousStep = stepIndex > 0 ? journeySteps[stepIndex - 1] : null;
  const nextStep = stepIndex >= 0 && stepIndex < journeySteps.length - 1 ? journeySteps[stepIndex + 1] : null;
  const journeyHome = `/journeys/${journeySlug}`;
  const previousHref = previousStep ? `/journeys/${journeySlug}/steps/${previousStep.id}` : journeyHome;
  const nextHref = nextStep ? `/journeys/${journeySlug}/steps/${nextStep.id}` : journeyHome;

  const chatLink = await getOrCreateStepChat(step.id, currentUser?.id || null);
  const chatId = chatLink.status === "ok" ? chatLink.chat.id : null;
  const chatMessages =
    chatId && chatLink.status === "ok"
      ? await prisma.message.findMany({
          where: { chatId },
          orderBy: { createdAt: "asc" },
          select: { id: true, role: true, content: true, command: true },
        })
      : [];

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner" style={{ gap: "16px" }}>
        <NeedAnalysisChat
          sessionOutlineId={step.sessionOutline.id}
          journeyStepId={step.id}
          journeySlug={journeySlug}
          firstUserMessage={step.sessionOutline.firstUserMessage}
          initialChatId={chatId}
          initialMessages={chatMessages.map((message) => ({
            id: message.id,
            role: message.role as "user" | "assistant",
            content: message.command ? null : message.content,
            command: message.command,
          }))}
          userName={currentUser?.name || null}
          userEmail={currentUser?.email || null}
          userPicture={(currentUser as any)?.picture || null}
          prevHref={previousHref}
          nextHref={nextHref}
        />
      </div>
    </main>
  );
}
