"use client";

// This component shows the need-analysis chat box and talks to the chat API.
import { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type NeedAnalysisChatProps = {
  sessionOutlineId: string;
  journeyStepId?: string | null;
  outlineTitle?: string;
  firstUserMessage?: string | null;
};

export default function NeedAnalysisChat({
  sessionOutlineId,
  journeyStepId = null,
  outlineTitle,
  firstUserMessage,
}: NeedAnalysisChatProps) {
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
  const [messages, setMessages] = useState<ChatMessage[]>(startingMessages);
  // This stores the chat id from the backend once created.
  const [chatId, setChatId] = useState<string | null>(null);
  // This holds the current input value.
  const [inputValue, setInputValue] = useState<string>("");
  // This flag shows when a request is running.
  const [isSending, setIsSending] = useState<boolean>(false);
  // This shows any backend errors in plain words.
  const [error, setError] = useState<string | null>(null);
  // This tells the user when a JSON command was detected.
  const [commandNotice, setCommandNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // This scrolls to the latest message after each change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const disabled = isSending;

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
        setCommandNotice("Goal command detected. Step 4 will use this.");
        console.log("Assistant command:", data.assistantMessage.command);
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

  return (
    <div className="chat-card">
      <div className="chat-header">
        <div className="intro-logo">
          <img className="intro-logo-img" src="/coai-logo.png" alt="Coach logo" />
        </div>
        <div className="chat-heading">
          <p className="chat-label">Need Analysis</p>
          <h1 className="chat-title">{outlineTitle || "Clarify your goal"}</h1>
          <p className="chat-subtitle">Share what you want to work on and we will shape a clear learning goal.</p>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-messages" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}
            >
              {message.content}
            </div>
          ))}
          {isSending && (
            <div className="chat-bubble chat-bubble-assistant typing-bubble" aria-label="Assistant is typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
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
            placeholder="Share what you would like to improve..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            rows={2}
            disabled={disabled}
          />
          <button className="primary-button chat-send" type="button" onClick={handleSend} disabled={disabled}>
            {disabled ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
