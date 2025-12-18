// This page shows a read-only chat transcript with the same look as the live chat.
import Link from "next/link";
import { headers } from "next/headers";
import LoginPrompt from "../../../components/LoginPrompt";
import { prisma } from "../../../../server/prismaClient";
import { getCurrentUser, requestFromCookieHeader } from "../../../../server/auth/session";

export const dynamic = "force-dynamic";

type ChatHistoryPageProps = {
  params: { chatId: string };
};

export default async function ChatHistoryPage({ params }: ChatHistoryPageProps) {
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
            message="Sign in to view this chat history."
            buttonLabel="Login to continue"
            afterLoginPath={`/chats/history/${params.chatId}`}
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

  const canView = Boolean(chat && (user.role === "admin" || (chat.userId && chat.userId === user.id)));

  if (!chat || !canView) {
    return (
      <div className="content-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="content-inner">
          <div className="journey-empty">
            <p className="hero-lead" style={{ marginBottom: 0 }}>
              This conversation is not available.
            </p>
            <Link href={user.role === "admin" ? "/admin/journeys" : "/my-profile"} className="secondary-button" style={{ marginTop: "12px" }}>
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = (user.name || user.email || "You").trim().charAt(0).toUpperCase();
  const userPicture = user.picture || null;
  const visibleMessages = chat.messages
    .filter((message) => !message.command)
    .map((message) => ({
      id: message.id,
      role: message.role === "user" ? "user" : "assistant",
      content: message.content,
    }));

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="content-inner" style={{ gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center" }}>
          <div>
            <h1 className="hero-title" style={{ marginBottom: 4, fontSize: "var(--title-lg)" }}>
              Chat transcript
            </h1>
            <p className="hero-lead" style={{ marginBottom: 0 }}>
              {chat.sessionTitle || "Conversation"}
            </p>
          </div>
          <Link href={user.role === "admin" ? "/admin/journeys" : "/my-profile"} className="secondary-button">
            Back
          </Link>
        </div>

        <div className="chat-panel">
          <div className="chat-messages" aria-live="polite">
            {visibleMessages.length === 0 ? (
              <p className="tiny-note" style={{ margin: "8px 0 0" }}>
                No messages yet.
              </p>
            ) : (
              visibleMessages.map((message) => (
                <div key={message.id} className={`chat-row ${message.role === "user" ? "chat-row-user" : ""}`}>
                  <div className={`chat-avatar ${message.role === "user" ? "chat-avatar-user" : ""}`}>
                    {message.role === "user" ? (
                      userPicture ? (
                        <img src={userPicture} alt="Your avatar" />
                      ) : (
                        <span className="chat-avatar-initial">{userInitial}</span>
                      )
                    ) : (
                      <img src="/coai-logo.png" alt="Coach avatar" />
                    )}
                  </div>
                  <div className={`chat-bubble ${message.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}>
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
