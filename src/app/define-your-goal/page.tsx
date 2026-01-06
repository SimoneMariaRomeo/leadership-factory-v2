// This page runs the public define-your-goal chat before someone logs in.
import { cookies } from "next/headers";
import NeedAnalysisChat from "../journeys/[slug]/steps/[stepId]/NeedAnalysisChat";
import { prisma } from "../../server/prismaClient";
import { GUEST_COOKIE_NAME } from "../../server/guest";

export const dynamic = "force-dynamic";

export default async function NeedAnalysisPage() {
  // This loads the shared define-your-goal outline so we can start the chat.
  const outline = await prisma.learningSessionOutline.findUnique({
    where: { slug: "define-your-goal" },
    select: { id: true, firstUserMessage: true },
  });

  if (!outline) {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="glass-card">
            <h1 className="hero-title">Define-your-goal is not ready yet.</h1>
            <p className="hero-lead">Please try again later.</p>
          </div>
        </div>
      </main>
    );
  }

  // This reuses the same guest chat on refresh so people do not lose their conversation.
  const guestId = cookies().get(GUEST_COOKIE_NAME)?.value || null;
  const existingChat =
    guestId
      ? await prisma.learningSessionChat.findFirst({
          where: {
            userId: null,
            sessionOutlineId: outline.id,
            metadata: { path: ["guestId"], equals: guestId },
          },
          orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
          select: {
            id: true,
            messages: {
              orderBy: { createdAt: "asc" },
              select: { id: true, role: true, content: true, command: true },
            },
          },
        })
      : null;

  const storedMessages = existingChat
    ? existingChat.messages.map((message) => ({
        id: message.id,
        role: message.role as "user" | "assistant",
        content: message.command ? null : message.content,
        command: message.command,
      }))
    : [];

  const initialMessages =
    outline.firstUserMessage && storedMessages.length > 0
      ? [
          { id: "outline-intro", role: "assistant" as const, content: outline.firstUserMessage },
          ...storedMessages,
        ]
      : storedMessages;

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner" style={{ gap: "16px" }}>
        <NeedAnalysisChat
          sessionOutlineId={outline.id}
          journeyStepId={null}
          firstUserMessage={outline.firstUserMessage}
          initialChatId={existingChat?.id || null}
          initialMessages={initialMessages}
        />
      </div>
    </main>
  );
}
