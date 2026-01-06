// This page shows a past chat and lets the user continue it.
import Link from "next/link";
import { headers } from "next/headers";
import NeedAnalysisChat from "../../journeys/[slug]/steps/[stepId]/NeedAnalysisChat";
import LoginPrompt from "../../components/LoginPrompt";
import { prisma } from "../../../server/prismaClient";
import { getCurrentUser, requestFromCookieHeader } from "../../../server/auth/session";

export const dynamic = "force-dynamic";

type ChatPageParams = {
  chatId: string;
};

export default async function ChatPage({ params }: { params: ChatPageParams }) {
  const headerStore = headers();
  const cookieHeader = headerStore.get("cookie");
  const user = await getCurrentUser(requestFromCookieHeader(cookieHeader));

  if (!user) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <LoginPrompt
            title="Please log in to view this conversation"
            message="Sign in to resume your chat."
            buttonLabel="Login to continue"
            afterLoginPath={`/chats/${params.chatId}`}
          />
        </div>
      </div>
    );
  }

  const chat = await prisma.learningSessionChat.findUnique({
    where: { id: params.chatId },
    include: {
      messages: { orderBy: { createdAt: "asc" }, select: { id: true, role: true, content: true, command: true } },
    },
  });

  if (!chat || !chat.sessionOutlineId || (user.role !== "admin" && chat.userId !== user.id)) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="journey-empty">
            <p className="hero-lead" style={{ marginBottom: 0 }}>
              This conversation is not available.
            </p>
            <Link href="/my-profile" className="secondary-button" style={{ marginTop: "12px" }}>
              Back to profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initialMessages = chat.messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "assistant",
    content: message.command ? null : message.content,
    command: message.command,
  }));

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <NeedAnalysisChat
        sessionOutlineId={chat.sessionOutlineId || ""}
        journeyStepId={null}
        firstUserMessage={null}
        initialChatId={chat.id}
        initialMessages={initialMessages}
        userName={user.name}
        userEmail={user.email}
        userPicture={(user as any).picture || null}
      />
    </main>
  );
}
