"use client";

// This component shows the chat box for define-your-goal or step sessions and reacts to JSON commands.
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { handleAssistantGoalCommand } from "../../../../../lib/assistant-command-handler";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string | null;
  command?: any;
};

type NeedAnalysisChatProps = {
  sessionOutlineId: string;
  journeyStepId?: string | null;
  journeySlug?: string | null;
  firstUserMessage?: string | null;
  initialChatId?: string | null;
  initialMessages?: ChatMessage[];
  userName?: string | null;
  userEmail?: string | null;
  userPicture?: string | null;
  prevHref?: string;
  nextHref?: string;
};

export default function NeedAnalysisChat({
  sessionOutlineId,
  journeyStepId = null,
  firstUserMessage,
  initialChatId = null,
  initialMessages = [],
  userName = null,
  userEmail = null,
  userPicture = null,
  journeySlug = null,
  prevHref,
  nextHref,
}: NeedAnalysisChatProps) {
  // This lets us move the user to the goal confirmation page.
  const router = useRouter();
  // This keeps the chat history on the page.
  const startingMessages = useMemo<ChatMessage[]>(
    () =>
      firstUserMessage
        ? [
            {
              id: "outline-intro",
              role: "assistant",
              content: firstUserMessage,
            },
          ]
        : [],
    [firstUserMessage]
  );
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages.length ? initialMessages : startingMessages);
  // This stores the chat id from the backend once created.
  const [chatId, setChatId] = useState<string | null>(initialChatId || null);
  // This holds the current input value.
  const [inputValue, setInputValue] = useState<string>("");
  // This flag shows when a request is running.
  const [isSending, setIsSending] = useState<boolean>(false);
  // This flag shows when we are marking a step done.
  const [isCompletingStep, setIsCompletingStep] = useState<boolean>(false);
  // This shows any backend errors in plain words.
  const [error, setError] = useState<string | null>(null);
  // This tells the user when a JSON command was detected.
  const [commandNotice, setCommandNotice] = useState<string | null>(null);
  // This stops double redirects when the goal command appears twice.
  const [hasPendingGoalRedirect, setHasPendingGoalRedirect] = useState<boolean>(false);
  // This stops double completion calls.
  const [hasHandledCompletion, setHasHandledCompletion] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // This scrolls to the latest message after each change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const disabled = isSending || isCompletingStep;
  const userInitial = (userName || userEmail || "You").trim().charAt(0).toUpperCase();

  // This handles sending a user message to the API.
  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setError(null);
    setCommandNotice(null);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          sessionOutlineId,
          journeyStepId,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as {
        chatId: string;
        assistantMessage: { content: string | null; command: any | null };
      };

      if (data.chatId) {
        setChatId(data.chatId);
      }

      if (data.assistantMessage?.command) {
        const handledGoal = handleAssistantGoalCommand(data.assistantMessage.command, router, {
          hasRedirected: hasPendingGoalRedirect,
          markRedirected: () => setHasPendingGoalRedirect(true),
        });
        if (handledGoal) {
          setCommandNotice("I saved your goal and will take you to confirm it.");
        } else if (data.assistantMessage.command?.command === "mark_step_completed") {
          await handleMarkStepComplete();
        }
      }

      if (data.assistantMessage?.content) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID ? crypto.randomUUID() : `assistant-${Date.now()}`,
          role: "assistant",
          content: data.assistantMessage.content,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error("Chat send failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // This calls the backend to mark the step as finished and returns to the journey.
  const handleMarkStepComplete = async () => {
    if (!journeyStepId || hasHandledCompletion) return;
    setHasHandledCompletion(true);
    setIsCompletingStep(true);
    setCommandNotice("Marking this step as done...");
    setError(null);

    try {
      const completionResponse = await fetch(`/api/journeys/steps/${journeyStepId}/complete`, { method: "POST" });
      if (!completionResponse.ok) {
        throw new Error(`Completion failed with status ${completionResponse.status}`);
      }
      const payload = (await completionResponse.json()) as { nextUrl?: string };
      const nextUrl = payload.nextUrl || (journeySlug ? `/journeys/${journeySlug}` : "/journeys");
      router.push(nextUrl);
    } catch (err) {
      console.error("Step completion failed", err);
      setError("We could not mark this step as done. Please try again.");
      setHasHandledCompletion(false);
    } finally {
      setIsCompletingStep(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-messages" aria-live="polite">
        {messages
          .filter((message): message is ChatMessage & { content: string } => typeof message.content === "string" && message.content.trim().length > 0)
          .map((message) => (
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
                <div className="chat-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

        {isSending && (
          <div className="chat-row">
            <div className="chat-avatar">
              <img src="/coai-logo.png" alt="Coach avatar" />
            </div>
            <div className="chat-bubble chat-bubble-assistant typing-bubble" aria-label="Assistant is typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {commandNotice && <div className="chat-banner">{commandNotice}</div>}
      {error && (
        <div className="chat-error" role="alert">
          {error}
        </div>
      )}

      <div className="chat-input-row">
        <textarea
          className="chat-input"
          placeholder="Type your response..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          rows={2}
          disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
        />
        <button className="primary-button chat-send" type="button" onClick={handleSend} disabled={disabled}>
          {disabled ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="chat-nav">
        <button
          type="button"
          className="secondary-button"
          onClick={() => router.push(prevHref || `/journeys/${journeySlug || ""}`)}
        >
          Back
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => router.push(nextHref || `/journeys/${journeySlug || ""}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
