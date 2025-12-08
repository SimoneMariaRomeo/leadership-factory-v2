// This function handles the chat workflow: prompt build, LLM call, and message storage.
import { prisma } from "../prismaClient";
import { callChatModel, LlmMessage } from "../llm/client";
import { getOrCreateStepChat } from "../../lib/journeys";
import type { Prisma } from "../../../generated/prisma";

type ChatRole = "user" | "assistant";

type ChatMessageInput = {
  role: ChatRole;
  content: string;
};

type AssistantMessage = {
  role: "assistant";
  content: string | null;
  command: any | null;
};

type HandleChatArgs = {
  userId: string | null;
  sessionOutlineId: string;
  journeyStepId?: string | null;
  chatId?: string | null;
  messages: ChatMessageInput[];
  callChatModel?: typeof callChatModel;
};

// This builds the system message with outline and user context.
function buildSystemMessage({
  botRole,
  objective,
  content,
  botTools,
  userGoalSummary,
}: {
  botRole: string;
  objective?: string | null;
  content: string;
  botTools: string;
  userGoalSummary?: string | null;
}): LlmMessage {
  const systemText = [
    botRole,
    "",
    "Session objective:",
    objective || "Guide the user toward a clear goal.",
    "",
    "Instructions:",
    content,
    "",
    "Tools and JSON commands you can use:",
    botTools,
    "",
    "Current user goal:",
    userGoalSummary || "not defined yet",
  ].join("\n");

  return { role: "system", content: systemText };
}

// This checks if the assistant reply is a pure JSON command.
function parseAssistantCommand(raw: string): any | null {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
    return null;
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && typeof parsed.command === "string") {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to parse assistant command JSON:", err);
  }
  return null;
}

export async function handleChat({
  userId,
  sessionOutlineId,
  journeyStepId = null,
  chatId = null,
  messages,
  callChatModel: callChatModelOverride,
}: HandleChatArgs): Promise<{ chatId: string; assistantMessage: AssistantMessage }> {
  const callModel = callChatModelOverride || callChatModel;
  const outline = await prisma.learningSessionOutline.findUnique({
    where: { id: sessionOutlineId },
    include: { journey: true },
  });

  if (!outline) {
    throw new Error("LearningSessionOutline not found.");
  }

  let journeyFromStep: Prisma.LearningJourneyStepGetPayload<{ include: { journey: true; sessionOutline: true } }> | null =
    null;
  let chat: Prisma.LearningSessionChatGetPayload<{}> | null = null;

  if (journeyStepId) {
    const chatResult = await getOrCreateStepChat(journeyStepId, userId || null);
    if (chatResult.status === "not_found") {
      throw new Error("LearningJourneyStep not found.");
    }
    if (chatResult.status === "forbidden") {
      throw new Error("You are not allowed to chat on this step.");
    }
    if (chatResult.status === "locked") {
      throw new Error("This step is locked.");
    }
    journeyFromStep = chatResult.step;
    chat = chatResult.chat;

    if (journeyFromStep.sessionOutlineId !== outline.id) {
      throw new Error("Step outline does not match the provided outline id.");
    }
  }

  if (!chat) {
    const now = new Date();
    chat = chatId ? await prisma.learningSessionChat.findUnique({ where: { id: chatId } }) : null;
    const baseMetadata: Record<string, any> =
      chat?.metadata && typeof chat.metadata === "object" && !Array.isArray(chat.metadata)
        ? { ...(chat.metadata as Record<string, any>) }
        : {};
    const nextMetadata: Record<string, any> = { ...baseMetadata };

    chat = chat
      ? await prisma.learningSessionChat.update({
          where: { id: chat.id },
          data: {
            user: userId ? { connect: { id: userId } } : undefined,
            sessionOutline: { connect: { id: sessionOutlineId } },
            lastMessageAt: now,
            metadata: Object.keys(nextMetadata).length ? nextMetadata : chat.metadata ?? undefined,
          },
        })
      : await prisma.learningSessionChat.create({
          data: {
            user: userId ? { connect: { id: userId } } : undefined,
            sessionOutline: { connect: { id: sessionOutlineId } },
            sessionTitle: outline.title,
            startedAt: now,
            lastMessageAt: now,
            metadata: Object.keys(nextMetadata).length ? nextMetadata : undefined,
          },
        });
  }

  const journeyForPrompt = journeyFromStep?.journey || outline.journey;
  const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
  const botRole = user?.botRole || "You are an executive coach and consultant with 20+ years supporting performance and motivation. You work on soft skills and mindset.";

  const outlineForPrompt = journeyFromStep?.sessionOutline || outline;
  const botTools =
    journeyStepId && outlineForPrompt.botTools
      ? `${outlineForPrompt.botTools}\n\nWhen the user has clearly finished this step, send exactly {"command": "mark_step_completed"} as a JSON message with no other text.`
      : outlineForPrompt.botTools;

  const modelMessages: LlmMessage[] = [
    buildSystemMessage({
      botRole,
      objective: outlineForPrompt.objective,
      content: outlineForPrompt.content,
      botTools,
      userGoalSummary: journeyForPrompt?.userGoalSummary || "not defined yet",
    }),
    { role: "user", content: outlineForPrompt.firstUserMessage },
    ...messages.map((message) => ({ role: message.role, content: message.content })),
  ];

  const existingUserCount = await prisma.message.count({ where: { chatId: chat.id, role: "user" } });
  const userMessages = messages.filter((message) => message.role === "user");
  const newUserMessages = userMessages.slice(existingUserCount);

  if (newUserMessages.length > 0) {
    await prisma.message.createMany({
      data: newUserMessages.map((message) => ({
        chatId: chat!.id,
        role: "user",
        content: message.content,
      })),
    });
  }

  const assistantText = await callModel({ messages: modelMessages, provider: process.env.DEFAULT_API });
  const assistantCommand = parseAssistantCommand(assistantText);
  const assistantContent = assistantCommand ? null : assistantText;

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "assistant",
      content: assistantText,
      command: assistantCommand,
    },
  });

  await prisma.learningSessionChat.update({
    where: { id: chat.id },
    data: { lastMessageAt: new Date() },
  });

  return {
    chatId: chat.id,
    assistantMessage: {
      role: "assistant",
      content: assistantContent,
      command: assistantCommand,
    },
  };
}
