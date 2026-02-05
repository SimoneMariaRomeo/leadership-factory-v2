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
  guestId?: string | null;
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
  userGoals,
}: {
  botRole: string;
  objective?: string | null;
  content: string;
  botTools: string;
  userGoals?: string[] | null;
}): LlmMessage {
  const cleanedGoals = (userGoals || []).map((goal) => goal.trim()).filter((goal) => goal.length > 0);
  const goalsText = cleanedGoals.length ? cleanedGoals.map((goal) => `- ${goal}`).join("\n") : "not defined yet";
  const toolsSection =
    botTools && botTools.trim().length > 0
      ? ["", "Tools and JSON commands you can use:", botTools]
      : [];

  const systemText = [
    botRole,
    "",
    "Session objective:",
    objective || "Guide the user toward a clear goal.",
    "",
    "Instructions:",
    content,
    ...toolsSection,
    "",
    "Current user goals:",
    goalsText,
  ].join("\n");

  return { role: "system", content: systemText };
}

// This checks if the assistant reply is a pure JSON command.
function parseAssistantCommand(rawJson: string): any | null {
  try {
    const parsed = JSON.parse(rawJson);
    if (parsed && typeof parsed === "object" && typeof parsed.command === "string") {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to parse assistant command JSON:", err);
  }
  return null;
}

// This finds the end of a JSON object inside a longer string.
function findJsonObjectEndIndex(text: string, startIndex: number): number | null {
  if (text[startIndex] !== "{") {
    return null;
  }

  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const character = text[index];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (character === "\\") {
        isEscaped = true;
        continue;
      }

      if (character === '"') {
        inString = false;
      }

      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === "{") {
      depth += 1;
      continue;
    }

    if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return index + 1;
      }
    }
  }

  return null;
}

// This pulls a JSON command out of a reply even if the model also wrote normal text.
function splitAssistantResponse(raw: string): { content: string; command: any | null; commandText: string | null } {
  const trimmed = raw.trim();

  const strictCommand = trimmed.startsWith("{") && trimmed.endsWith("}") ? parseAssistantCommand(trimmed) : null;
  if (strictCommand) {
    return { content: "", command: strictCommand, commandText: trimmed };
  }

  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/gi;
  let match: RegExpExecArray | null = null;
  let lastCodeBlockCommand: { command: any; commandText: string; start: number; end: number } | null = null;

  while ((match = codeBlockRegex.exec(raw)) !== null) {
    const candidateText = (match[1] || "").trim();
    if (!candidateText.startsWith("{") || !candidateText.endsWith("}")) {
      continue;
    }

    const parsed = parseAssistantCommand(candidateText);
    if (!parsed) {
      continue;
    }

    lastCodeBlockCommand = {
      command: parsed,
      commandText: candidateText,
      start: match.index,
      end: codeBlockRegex.lastIndex,
    };
  }

  if (lastCodeBlockCommand) {
    const cleaned = `${raw.slice(0, lastCodeBlockCommand.start)}${raw.slice(lastCodeBlockCommand.end)}`.trim();
    return { content: cleaned, command: lastCodeBlockCommand.command, commandText: lastCodeBlockCommand.commandText };
  }

  const commandStartRegex = /{[\s\r\n]*"command"\s*:/g;
  const candidateStarts: number[] = [];
  let startMatch: RegExpExecArray | null = null;

  while ((startMatch = commandStartRegex.exec(raw)) !== null) {
    candidateStarts.push(startMatch.index);
  }

  for (let index = candidateStarts.length - 1; index >= 0; index -= 1) {
    const startIndex = candidateStarts[index];
    const endIndex = findJsonObjectEndIndex(raw, startIndex);
    if (!endIndex) {
      continue;
    }

    const candidateText = raw.slice(startIndex, endIndex).trim();
    const parsed = parseAssistantCommand(candidateText);
    if (!parsed) {
      continue;
    }

    const cleaned = `${raw.slice(0, startIndex)}${raw.slice(endIndex)}`.trim();
    return { content: cleaned, command: parsed, commandText: candidateText };
  }

  return { content: raw, command: null, commandText: null };
}

// This reads the guestId stored inside chat.metadata when present.
function readGuestIdFromMetadata(metadata: unknown): string | null {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return null;
  }
  const value = (metadata as Record<string, unknown>).guestId;
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export async function handleChat({
  userId,
  guestId = null,
  sessionOutlineId,
  journeyStepId = null,
  chatId = null,
  messages,
  callChatModel: callChatModelOverride,
}: HandleChatArgs): Promise<{ chatId: string; assistantMessage: AssistantMessage }> {
  const callModel = callChatModelOverride || callChatModel;
  const outline = await prisma.learningSessionOutline.findUnique({
    where: { id: sessionOutlineId },
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
    const byId = chatId ? await prisma.learningSessionChat.findUnique({ where: { id: chatId } }) : null;
    const byGuest =
      !byId && !journeyStepId && !userId && guestId
        ? await prisma.learningSessionChat.findFirst({
            where: {
              userId: null,
              sessionOutlineId,
              metadata: { path: ["guestId"], equals: guestId },
            },
            orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
          })
        : null;

    chat = byId || byGuest;

    // This blocks someone from attaching messages to a chat that does not belong to them.
    if (chat) {
      if (userId) {
        if (chat.userId && chat.userId !== userId) {
          throw new Error("Not allowed to use this chat.");
        }
      } else {
        if (!guestId) {
          throw new Error("Not allowed to use this chat.");
        }
        if (chat.userId) {
          throw new Error("Not allowed to use this chat.");
        }
        const chatGuestId = readGuestIdFromMetadata(chat.metadata);
        if (chatGuestId !== guestId) {
          throw new Error("Not allowed to use this chat.");
        }
      }
    }

    const baseMetadata: Record<string, any> =
      chat?.metadata && typeof chat.metadata === "object" && !Array.isArray(chat.metadata)
        ? { ...(chat.metadata as Record<string, any>) }
        : {};
    const nextMetadata: Record<string, any> = { ...baseMetadata };
    if (!userId && guestId) {
      nextMetadata.guestId = guestId;
    }

    chat = chat
      ? await prisma.learningSessionChat.update({
          where: { id: chat.id },
          data: {
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

  const journeyForPrompt = journeyFromStep?.journey || null;
  const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
  const botRole = user?.botRole || "You are an executive coach and consultant with 20+ years supporting performance and motivation. You work on soft skills and mindset. You talk in a friend, casual, informal, very simple English and short sentences. Format your replies with bold, italics and new lines to improve readability.";

  const outlineForPrompt = journeyFromStep?.sessionOutline || outline;
  const isDefineYourGoal = outlineForPrompt?.slug === "define-your-goal";
  const activeGoals =
    userId && !isDefineYourGoal
      ? await prisma.userGoal.findMany({
          where: { userId, status: "active" },
          orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
          select: { statement: true },
        })
      : [];
  const goalStatements = activeGoals.map((goal) => goal.statement).filter((goal) => goal.trim().length > 0);
  const goalsForPrompt =
    !isDefineYourGoal && goalStatements.length > 0
      ? goalStatements
      : !isDefineYourGoal && journeyForPrompt?.userGoalSummary
        ? [journeyForPrompt.userGoalSummary]
        : [];
  const botTools = outlineForPrompt.botTools;

  const modelMessages: LlmMessage[] = [
    buildSystemMessage({
      botRole,
      objective: outlineForPrompt.objective,
      content: outlineForPrompt.content,
      botTools,
      userGoals: goalsForPrompt,
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
  const split = splitAssistantResponse(assistantText);
  const assistantCommand = split.command?.command === "mark_step_completed" ? null : split.command;
  const assistantContent = split.content.trim().length > 0 ? split.content.trim() : null;

  if (assistantCommand) {
    if (assistantContent) {
      await prisma.message.create({
        data: {
          chatId: chat.id,
          role: "assistant",
          content: assistantContent,
        },
      });
    }

    await prisma.message.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: split.commandText || JSON.stringify(assistantCommand),
        command: assistantCommand,
      },
    });
  } else {
    await prisma.message.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: assistantText.trim().length > 0 ? assistantText : " ",
      },
    });
  }

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
