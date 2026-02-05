// This file runs the automatic follow-up job for inactive steps.
import { prisma } from "../prismaClient";
import { callChatModel } from "../llm/client";
import type { LlmMessage } from "../llm/client";
import { FOLLOW_UP_PROMPT, FINAL_REFLECTION_PROMPT } from "./follow-up-prompts";
import { completeStepAndUnlockNext } from "../../lib/journeys";
import { sendFollowUpStepEmails } from "../notifications/email";

const INACTIVITY_HOURS = 22;
const INACTIVITY_MS = INACTIVITY_HOURS * 60 * 60 * 1000;
const MAX_NORMAL_FOLLOW_UPS = 10;
const MAX_TOTAL_FOLLOW_UPS = 11;

type FollowUpOutlineDraft = {
  title: string;
  objective: string | null;
  content: string;
  firstUserMessage: string;
};

type FollowUpRunResult = {
  completedSteps: number;
  createdSteps: number;
  completedJourneys: number;
  errors: string[];
};

type FollowUpContext = {
  journeyId: string;
  journeyTitle: string;
  journeyGoal: string | null;
  userGoals: string[];
  stepInstructions: { title: string; objective: string | null; content: string }[];
  latestConversation: { role: string; content: string }[];
  followUpIndex: number;
  isFinal: boolean;
};

// This runs the full automatic follow-up flow once.
export async function runAutomaticFollowUps(): Promise<FollowUpRunResult> {
  const result: FollowUpRunResult = {
    completedSteps: 0,
    createdSteps: 0,
    completedJourneys: 0,
    errors: [],
  };

  const now = new Date();

  const completionResult = await autoCompleteInactiveSteps(now);
  result.completedSteps += completionResult.completedSteps;
  result.errors.push(...completionResult.errors);

  const followUpResult = await createMissingFollowUps();
  result.createdSteps += followUpResult.createdSteps;
  result.completedJourneys += followUpResult.completedJourneys;
  result.errors.push(...followUpResult.errors);

  return result;
}

// This marks steps completed when a user has been inactive for 22 hours.
async function autoCompleteInactiveSteps(now: Date) {
  const cutoff = new Date(now.getTime() - INACTIVITY_MS);
  const outcome = { completedSteps: 0, errors: [] as string[] };

  const steps = await prisma.learningJourneyStep.findMany({
    where: {
      status: { not: "completed" },
      journey: { isStandard: false, status: "active", personalizedForUserId: { not: null } },
      chats: { some: {} },
    },
    include: { journey: true },
  });

  for (const step of steps) {
    if (step.status === "locked") continue;
    if (!step.journey.personalizedForUserId) continue;

    try {
      const latestChat = await prisma.learningSessionChat.findFirst({
        where: { stepId: step.id },
        orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
        select: { id: true, lastMessageAt: true },
      });

      if (!latestChat || !latestChat.lastMessageAt) continue;
      if (latestChat.lastMessageAt > cutoff) continue;

      const hasUserMessage = await prisma.message.findFirst({
        where: { chatId: latestChat.id, role: "user" },
        select: { id: true },
      });

      if (!hasUserMessage) continue;

      const completedAt = new Date(latestChat.lastMessageAt.getTime() + INACTIVITY_MS);
      await completeStepAndUnlockNext(step.id, step.journey.personalizedForUserId, {
        completedAt,
        unlockedAt: completedAt,
        allowJourneyCompletion: false,
      });

      outcome.completedSteps += 1;
    } catch (error: any) {
      outcome.errors.push(`Auto-complete failed for step ${step.id}: ${error?.message || error}`);
    }
  }

  return outcome;
}

// This creates missing follow-up steps when the last step is completed.
async function createMissingFollowUps() {
  const outcome = { createdSteps: 0, completedJourneys: 0, errors: [] as string[] };

  const journeys = await prisma.learningJourney.findMany({
    where: { isStandard: false, status: "active", personalizedForUserId: { not: null } },
    select: { id: true, slug: true, title: true, personalizedForUserId: true, userGoalSummary: true },
  });

  for (const journey of journeys) {
    const ownerId = journey.personalizedForUserId;
    if (!ownerId) continue;

    try {
      const lastStep = await prisma.learningJourneyStep.findFirst({
        where: { journeyId: journey.id },
        orderBy: [{ order: "desc" }, { createdAt: "desc" }],
        include: { sessionOutline: true },
      });

      if (!lastStep || lastStep.status !== "completed") {
        continue;
      }

      const followUpMeta = await countFollowUpsForJourney(journey.id);
      const lastStepTags = readFollowUpTags(lastStep.sessionOutline?.tags);

      if (lastStepTags.stage === "final" || followUpMeta.count >= MAX_TOTAL_FOLLOW_UPS) {
        await prisma.learningJourney.update({ where: { id: journey.id }, data: { status: "completed" } });
        outcome.completedJourneys += 1;
        continue;
      }

      const isFinal = followUpMeta.count >= MAX_NORMAL_FOLLOW_UPS;
      const followUpIndex = followUpMeta.count + 1;

      const context = await buildFollowUpContext({
        journey: { ...journey, personalizedForUserId: ownerId },
        followUpIndex,
        isFinal,
        lastStepId: lastStep.id,
      });

      const { outline, systemPrompt } = await generateFollowUpOutline(context, isFinal);
      const created = await createFollowUpStep({
        journeyId: journey.id,
        outline,
        followUpIndex,
        isFinal,
      });

      if (!created) {
        continue;
      }

      const user = await prisma.user.findUnique({
        where: { id: ownerId },
        select: { id: true, email: true, name: true },
      });

      if (user) {
        try {
          await sendFollowUpStepEmails({
            user,
            journey: { id: journey.id, slug: journey.slug, title: journey.title },
            step: created.step,
            followUpIndex,
            isFinal,
            systemPrompt,
            outline,
          });
        } catch (emailError) {
          console.error("Follow-up email failed:", emailError);
        }
      }

      outcome.createdSteps += 1;
    } catch (error: any) {
      outcome.errors.push(`Follow-up creation failed for journey ${journey.id}: ${error?.message || error}`);
    }
  }

  return outcome;
}

// This counts existing follow-up steps for one journey.
async function countFollowUpsForJourney(journeyId: string) {
  const steps = await prisma.learningJourneyStep.findMany({
    where: { journeyId },
    include: { sessionOutline: { select: { tags: true } } },
  });

  const followUps = steps.filter((step) => readFollowUpTags(step.sessionOutline?.tags).isAutoFollowUp);
  return { count: followUps.length };
}

// This reads follow-up metadata from outline tags.
function readFollowUpTags(tags: unknown) {
  if (!tags || typeof tags !== "object" || Array.isArray(tags)) {
    return { isAutoFollowUp: false, stage: null as string | null };
  }

  const record = tags as Record<string, unknown>;
  const isAutoFollowUp = record.autoFollowUp === true;
  const stage = typeof record.autoFollowUpStage === "string" ? record.autoFollowUpStage : null;
  return { isAutoFollowUp, stage };
}

// This gathers the context that the model needs for a follow-up step.
async function buildFollowUpContext({
  journey,
  followUpIndex,
  isFinal,
  lastStepId,
}: {
  journey: { id: string; title: string; userGoalSummary: string | null; personalizedForUserId: string };
  followUpIndex: number;
  isFinal: boolean;
  lastStepId: string;
}): Promise<FollowUpContext> {
  const steps = await prisma.learningJourneyStep.findMany({
    where: { journeyId: journey.id },
    include: { sessionOutline: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const stepInstructions = steps.map((step) => ({
    title: step.sessionOutline.title,
    objective: step.sessionOutline.objective,
    content: normalizeText(step.sessionOutline.content, 2000),
  }));

  const goals = await prisma.userGoal.findMany({
    where: { userId: journey.personalizedForUserId, status: "active" },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    select: { statement: true },
  });

  const goalStatements = goals
    .map((goal) => goal.statement.trim())
    .filter((statement) => statement.length > 0);

  const journeyGoal = journey.userGoalSummary?.trim() || null;

  const latestChat = await prisma.learningSessionChat.findFirst({
    where: { stepId: lastStepId },
    orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        select: { role: true, content: true, command: true },
      },
    },
  });

  const latestConversation = (latestChat?.messages || [])
    .filter((message) => !message.command)
    .map((message) => ({
      role: message.role,
      content: normalizeText(message.content || "", 1000),
    }))
    .filter((message) => message.content.length > 0);

  const trimmedConversation =
    latestConversation.length > 20 ? latestConversation.slice(latestConversation.length - 20) : latestConversation;

  return {
    journeyId: journey.id,
    journeyTitle: journey.title,
    journeyGoal,
    userGoals: goalStatements,
    stepInstructions,
    latestConversation: trimmedConversation,
    followUpIndex,
    isFinal,
  };
}

// This asks the model to create a new outline and parses the reply.
async function generateFollowUpOutline(context: FollowUpContext, isFinal: boolean) {
  const systemPrompt = isFinal ? FINAL_REFLECTION_PROMPT : FOLLOW_UP_PROMPT;
  const userPayload = {
    journeyTitle: context.journeyTitle,
    journeyGoal: context.journeyGoal,
    userGoals: context.userGoals,
    followUpIndex: context.followUpIndex,
    isFinal: context.isFinal,
    stepInstructions: context.stepInstructions,
    latestConversation: context.latestConversation,
  };

  const messages: LlmMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: JSON.stringify(userPayload, null, 2) },
  ];

  const reply = await callChatModel({ messages, provider: process.env.DEFAULT_API });
  const outline = parseOutlineJson(reply);
  return { outline, systemPrompt };
}

// This parses and validates the model JSON output.
function parseOutlineJson(raw: string): FollowUpOutlineDraft {
  const parsed = tryParseJsonObject(raw);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Model response was not valid JSON.");
  }

  const record = parsed as Record<string, unknown>;
  const title = readRequiredString(record.title, "title");
  const content = readRequiredString(record.content, "content");
  const firstUserMessage = readRequiredString(record.firstUserMessage, "firstUserMessage");
  const objectiveValue = typeof record.objective === "string" ? record.objective.trim() : "";

  return {
    title,
    objective: objectiveValue.length > 0 ? objectiveValue : null,
    content,
    firstUserMessage,
  };
}

// This tries a few simple ways to pull JSON out of the model reply.
function tryParseJsonObject(text: string): unknown | null {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  }

  const codeBlockMatch = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch {
      return null;
    }
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    } catch {
      return null;
    }
  }

  return null;
}

// This reads a required string field safely.
function readRequiredString(value: unknown, label: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Model response missing ${label}.`);
  }
  return value.trim();
}

// This trims long text so prompts stay small.
function normalizeText(value: string, maxLength: number) {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength)}...`;
}

// This creates the outline + step for the follow-up.
async function createFollowUpStep({
  journeyId,
  outline,
  followUpIndex,
  isFinal,
}: {
  journeyId: string;
  outline: FollowUpOutlineDraft;
  followUpIndex: number;
  isFinal: boolean;
}) {
  const slug = buildFollowUpSlug(outline.title, followUpIndex);
  const now = new Date();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const maxOutlineOrder = await tx.learningSessionOutline.aggregate({ _max: { order: true } });
      const nextOutlineOrder = (maxOutlineOrder._max.order || 0) + 1;

      const createdOutline = await tx.learningSessionOutline.create({
        data: {
          title: outline.title.trim(),
          slug,
          order: nextOutlineOrder,
          objective: outline.objective?.trim() || null,
          content: outline.content,
          botTools: "",
          firstUserMessage: outline.firstUserMessage,
          tags: {
            autoFollowUp: true,
            autoFollowUpIndex: followUpIndex,
            autoFollowUpStage: isFinal ? "final" : "normal",
          },
        },
      });

      const maxStepOrder = await tx.learningJourneyStep.aggregate({
        where: { journeyId },
        _max: { order: true },
      });
      const nextStepOrder = (maxStepOrder._max.order || 0) + 1;

      const createdStep = await tx.learningJourneyStep.create({
        data: {
          journeyId,
          sessionOutlineId: createdOutline.id,
          order: nextStepOrder,
          status: "unlocked",
          unlockedAt: now,
        },
        include: { sessionOutline: true, journey: true },
      });

      return { outline: createdOutline, step: createdStep };
    });

    return result;
  } catch (error: any) {
    if (error?.code === "P2002") {
      return null;
    }
    throw error;
  }
}

// This builds a unique slug for a new follow-up outline.
function buildFollowUpSlug(title: string, followUpIndex: number) {
  const base = slugify(title) || "follow-up";
  return `${base}-${followUpIndex}-${createShortId()}`;
}

// This turns a title into a URL-safe slug.
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// This makes a small random id for slug safety.
function createShortId() {
  return Math.random().toString(36).slice(2, 8);
}
