// This helper file keeps journey loading, chat linking, and completion rules in one place with simple access checks.
import { prisma } from "../server/prismaClient";
import type { Prisma } from "../../generated/prisma";

type JourneyWithSteps = Prisma.LearningJourneyGetPayload<{
  include: {
    steps: {
      include: { sessionOutline: true };
      orderBy: Prisma.LearningJourneyStepOrderByWithRelationInput[];
    };
  };
}>;

type JourneyRecord = Prisma.LearningJourneyGetPayload<{}>;

export type StepWithJourney = Prisma.LearningJourneyStepGetPayload<{
  include: { journey: true; sessionOutline: true; chats: true };
}>;

type ChatRecord = Prisma.LearningSessionChatGetPayload<{}>;

type JourneyAccessResult =
  | { status: "ok"; journey: JourneyWithSteps }
  | { status: "not_found" }
  | { status: "forbidden" };

type StepAccessResult =
  | { status: "ok"; step: StepWithJourney }
  | { status: "not_found" }
  | { status: "forbidden" };

type StepChatResult =
  | { status: "ok"; step: StepWithJourney; chat: ChatRecord }
  | { status: "locked"; step: StepWithJourney }
  | { status: "not_found" }
  | { status: "forbidden" };

type StepCompletionResult =
  | { status: "ok"; journey: JourneyRecord; completedStep: StepWithJourney; unlockedStep: StepWithJourney | null }
  | { status: "locked" }
  | { status: "not_found" }
  | { status: "forbidden" };

// This checks if a user can see the journey.
function canAccessJourney(journey: { isStandard: boolean; personalizedForUserId: string | null }, userId: string | null): boolean {
  if (journey.isStandard) return true;
  return Boolean(userId && journey.personalizedForUserId === userId);
}

// This fetches a journey by slug or id with its ordered steps while applying the access rules.
export async function loadJourneyWithStepsBySlug(slug: string, userId: string | null): Promise<JourneyAccessResult> {
  const journey = await prisma.learningJourney.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: {
      steps: {
        include: { sessionOutline: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!journey) {
    return { status: "not_found" };
  }

  if (!canAccessJourney(journey, userId)) {
    return { status: "forbidden" };
  }

  return { status: "ok", journey };
}

// This loads one step with its journey and outline, blocking access when it belongs to someone else.
export async function loadStepWithAccess(stepId: string, userId: string | null): Promise<StepAccessResult> {
  const step = await prisma.learningJourneyStep.findUnique({
    where: { id: stepId },
    include: { journey: true, sessionOutline: true, chats: true },
  });

  if (!step) {
    return { status: "not_found" };
  }

  if (!canAccessJourney(step.journey, userId)) {
    return { status: "forbidden" };
  }

  return { status: "ok", step };
}

// This makes sure there is exactly one chat for the step and user, creating it when missing.
export async function getOrCreateStepChat(stepId: string, userId: string | null): Promise<StepChatResult> {
  const access = await loadStepWithAccess(stepId, userId);
  if (access.status !== "ok") return access;

  const step = access.step;
  if (step.status === "locked") {
    return { status: "locked", step };
  }

  const now = new Date();
  const chat = await prisma.learningSessionChat.findFirst({
    where: { stepId: step.id, userId: userId || null },
    orderBy: [{ startedAt: "desc" }, { lastMessageAt: "desc" }],
  });

  const metadataBase =
    chat?.metadata && typeof chat.metadata === "object" && !Array.isArray(chat.metadata)
      ? (chat.metadata as Record<string, any>)
      : {};
  const mergedMetadata = { ...metadataBase, journeyStepId: step.id };

  const ensuredChat = chat
    ? await prisma.learningSessionChat.update({
        where: { id: chat.id },
        data: {
          user: userId ? { connect: { id: userId } } : undefined,
          sessionOutline: { connect: { id: step.sessionOutlineId } },
          sessionTitle: step.sessionOutline.title,
          step: { connect: { id: step.id } },
          lastMessageAt: now,
          metadata: mergedMetadata,
        },
      })
    : await prisma.learningSessionChat.create({
        data: {
          user: userId ? { connect: { id: userId } } : undefined,
          sessionOutline: { connect: { id: step.sessionOutlineId } },
          sessionTitle: step.sessionOutline.title,
          step: { connect: { id: step.id } },
          startedAt: now,
          lastMessageAt: now,
          metadata: mergedMetadata,
        },
      });

  if (step.status === "locked") {
    await prisma.learningJourneyStep.update({
      where: { id: step.id },
      data: { status: "unlocked", unlockedAt: step.unlockedAt ?? now },
    });
  } else if (!step.unlockedAt) {
    await prisma.learningJourneyStep.update({
      where: { id: step.id },
      data: { unlockedAt: now },
    });
  }

  const refreshedStep = await prisma.learningJourneyStep.findUnique({
    where: { id: step.id },
    include: { journey: true, sessionOutline: true, chats: true },
  });

  if (!refreshedStep) {
    return { status: "not_found" };
  }

  return { status: "ok", step: refreshedStep, chat: ensuredChat };
}

// This marks the step done and unlocks the next step in order when rules allow it.
export async function completeStepAndUnlockNext(stepId: string, userId: string | null): Promise<StepCompletionResult> {
  const access = await loadStepWithAccess(stepId, userId);
  if (access.status !== "ok") return access;

  const step = access.step;
  if (step.status === "locked") {
    return { status: "locked" };
  }

  const now = new Date();
  const journeyId = step.journeyId;

  const { completedStep, unlockedStep, journey } = await prisma.$transaction(async (tx) => {
    const currentStep = await tx.learningJourneyStep.findUnique({
      where: { id: stepId },
      include: { journey: true, sessionOutline: true, chats: true },
    });
    if (!currentStep) {
      throw new Error("Step not found inside transaction.");
    }

    const steps = await tx.learningJourneyStep.findMany({
      where: { journeyId },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    const completedAt = currentStep.completedAt || now;
    const updatedStep = await tx.learningJourneyStep.update({
      where: { id: stepId },
      data: { status: "completed", completedAt },
      include: { journey: true, sessionOutline: true, chats: true },
    });

    const nextStep = steps.find((candidate) => candidate.order > currentStep.order);
    let unlocked: StepWithJourney | null = null;

    if (nextStep && nextStep.status === "locked") {
      unlocked = await tx.learningJourneyStep.update({
        where: { id: nextStep.id },
        data: { status: "unlocked", unlockedAt: nextStep.unlockedAt ?? now },
        include: { journey: true, sessionOutline: true, chats: true },
      });
    } else if (nextStep) {
      unlocked = await tx.learningJourneyStep.findUnique({
        where: { id: nextStep.id },
        include: { journey: true, sessionOutline: true, chats: true },
      });
    }

    const remainingSteps = await tx.learningJourneyStep.count({
      where: { journeyId, status: { not: "completed" } },
    });

    const updatedJourney =
      remainingSteps === 0 &&
      currentStep.journey.status === "active" &&
      !currentStep.journey.isStandard &&
      Boolean(currentStep.journey.personalizedForUserId)
        ? await tx.learningJourney.update({ where: { id: journeyId }, data: { status: "completed" } })
        : currentStep.journey;

    return { completedStep: updatedStep, unlockedStep: unlocked, journey: updatedJourney };
  });

  return { status: "ok", journey, completedStep, unlockedStep };
}

// This keeps link building in one place to avoid scattering slug/id fallback.
export function journeySlugOrId(journey: { slug: string | null; id: string }) {
  return journey.slug || journey.id;
}
