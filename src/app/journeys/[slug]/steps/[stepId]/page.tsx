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
    redirect("/my-profile");
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
        />
      </div>
    </main>
  );
}
