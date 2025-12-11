// This file gathers admin helpers for journeys and steps.
import type { Prisma } from "../../../generated/prisma";
import { prisma } from "../prismaClient";
import { AdminValidationError } from "./sessions";

export type JourneyFilters = {
  isStandard?: "all" | "standard" | "nonstandard";
  status?: string | null;
  userEmail?: string | null;
};

export type JourneyInput = {
  title: string;
  slug?: string | null;
  intro?: string | null;
  objectivesText?: string | null;
  isStandard?: boolean;
  personalizedUserEmail?: string | null;
  userGoalSummary?: string | null;
  status?: string | null;
};

// This lists journeys with simple filters for the admin table.
export async function listJourneys(filters: JourneyFilters) {
  const where: Prisma.LearningJourneyWhereInput = {};

  if (filters.isStandard === "standard") {
    where.isStandard = true;
  } else if (filters.isStandard === "nonstandard") {
    where.isStandard = false;
  }

  if (filters.status && filters.status !== "all") {
    where.status = filters.status;
  }

  if (filters.userEmail) {
    where.personalizedForUser = { email: { contains: filters.userEmail, mode: "insensitive" } };
  }

  return prisma.learningJourney.findMany({
    where,
    include: {
      personalizedForUser: { select: { id: true, email: true, name: true } },
    },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

// This fetches a journey with its steps for editing.
export async function getJourneyDetail(id: string) {
  const journey = await prisma.learningJourney.findUnique({
    where: { id },
    include: {
      personalizedForUser: { select: { id: true, email: true, name: true } },
      steps: {
        include: { sessionOutline: true, chat: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  if (!journey) {
    throw new AdminValidationError("Journey not found.");
  }

  return journey;
}

// This fetches all outlines so steps can point to them.
export async function listAllOutlines() {
  return prisma.learningSessionOutline.findMany({
    include: { _count: { select: { steps: true } } },
    orderBy: [{ title: "asc" }],
  });
}

// This adds a new journey with draft defaults.
export async function createJourney(input: JourneyInput) {
  if (!input.title || input.title.trim() === "") {
    throw new AdminValidationError("Title is required.");
  }

  const isStandard = input.isStandard ?? false;
  const objectives = splitObjectives(input.objectivesText);
  const status = input.status || "draft";
  const slug = input.slug?.trim() || null;
  const personalizedUserEmail = input.personalizedUserEmail?.trim() || null;

  const personalizedForUserId = !isStandard && personalizedUserEmail
    ? await findUserIdByEmail(personalizedUserEmail)
    : null;

  try {
    return await prisma.learningJourney.create({
      data: {
        title: input.title.trim(),
        slug,
        intro: input.intro?.trim() || null,
        objectives,
        isStandard,
        personalizedForUser: personalizedForUserId ? { connect: { id: personalizedForUserId } } : undefined,
        userGoalSummary: input.userGoalSummary?.trim() || null,
        status,
      },
      include: {
        personalizedForUser: { select: { id: true, email: true, name: true } },
        steps: {
          include: { sessionOutline: true, chat: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new AdminValidationError("Slug must be unique.");
    }
    throw error;
  }
}

// This updates a journey with the guardrails from the spec.
export async function updateJourney(id: string, input: JourneyInput) {
  const existing = await prisma.learningJourney.findUnique({ where: { id } });
  if (!existing) {
    throw new AdminValidationError("Journey not found.");
  }

  const nextStatus = input.status || existing.status;
  if (!canMoveStatus(existing.status, nextStatus)) {
    throw new AdminValidationError("That status change is not allowed.");
  }

  const targetIsStandard = input.isStandard ?? existing.isStandard;
  const slugChange = input.slug !== undefined ? input.slug?.trim() || null : existing.slug;
  if (existing.status === "active" && slugChange !== existing.slug) {
    throw new AdminValidationError("Slug cannot change while active.");
  }

  const objectives =
    input.objectivesText !== undefined ? splitObjectives(input.objectivesText) : Array.isArray(existing.objectives) ? existing.objectives : [];
  const personalizedEmail = input.personalizedUserEmail?.trim() || null;
  let personalizedForUserId: string | null | undefined = existing.personalizedForUserId;

  if (targetIsStandard && (existing.personalizedForUserId || personalizedEmail)) {
    throw new AdminValidationError("Clear the personalized user before marking as standard.");
  }

  if (targetIsStandard) {
    personalizedForUserId = null;
  } else if (personalizedEmail !== null) {
    personalizedForUserId = personalizedEmail ? await findUserIdByEmail(personalizedEmail) : null;
  }

  const data: Prisma.LearningJourneyUpdateInput = {
    title: input.title !== undefined ? input.title.trim() : existing.title,
    slug: slugChange,
    intro: input.intro !== undefined ? input.intro?.trim() || null : existing.intro,
    objectives,
    isStandard: targetIsStandard,
    userGoalSummary: input.userGoalSummary !== undefined ? input.userGoalSummary?.trim() || null : existing.userGoalSummary,
    status: nextStatus,
  };

  if (personalizedForUserId === null) {
    data.personalizedForUser = { disconnect: true };
  } else if (personalizedForUserId) {
    data.personalizedForUser = { connect: { id: personalizedForUserId } };
  }

  try {
    return await prisma.learningJourney.update({
      where: { id },
      data,
      include: {
        personalizedForUser: { select: { id: true, email: true, name: true } },
        steps: {
          include: { sessionOutline: true, chat: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        },
      },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new AdminValidationError("Slug must be unique.");
    }
    throw error;
  }
}

// This adds a new step at the end of the journey.
export async function addJourneyStep(journeyId: string, sessionOutlineId: string) {
  const journey = await prisma.learningJourney.findUnique({ where: { id: journeyId } });
  if (!journey) {
    throw new AdminValidationError("Journey not found.");
  }

  const outline = await prisma.learningSessionOutline.findUnique({ where: { id: sessionOutlineId } });
  if (!outline) {
    throw new AdminValidationError("Session outline not found.");
  }

  const maxOrder = await prisma.learningJourneyStep.aggregate({
    where: { journeyId },
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order || 0) + 1;

  return prisma.learningJourneyStep.create({
    data: {
      journeyId,
      sessionOutlineId,
      order: nextOrder,
      status: "locked",
    },
    include: { sessionOutline: true, chat: true, journey: true },
  });
}

type StepUpdateInput = {
  sessionOutlineId?: string;
  ahaText?: string | null;
  status?: string;
};

// This edits a single step without touching ids or timestamps.
export async function updateJourneyStep(stepId: string, data: StepUpdateInput) {
  const existing = await prisma.learningJourneyStep.findUnique({ where: { id: stepId } });
  if (!existing) {
    throw new AdminValidationError("Step not found.");
  }

  if (data.status && !["locked", "unlocked", "completed"].includes(data.status)) {
    throw new AdminValidationError("Status is invalid.");
  }

  if (data.sessionOutlineId) {
    const outline = await prisma.learningSessionOutline.findUnique({ where: { id: data.sessionOutlineId } });
    if (!outline) {
      throw new AdminValidationError("Session outline not found.");
    }
  }

  const updateData: Prisma.LearningJourneyStepUpdateInput = {};
  if (data.sessionOutlineId) updateData.sessionOutline = { connect: { id: data.sessionOutlineId } };
  if (data.ahaText !== undefined) updateData.ahaText = data.ahaText?.trim() || null;
  if (data.status) updateData.status = data.status;

  return prisma.learningJourneyStep.update({
    where: { id: stepId },
    data: updateData,
    include: { sessionOutline: true, chat: true, journey: true },
  });
}

// This rewrites the order numbers based on the provided list.
export async function reorderJourneySteps(journeyId: string, orderedStepIds: string[]) {
  const steps = await prisma.learningJourneyStep.findMany({ where: { journeyId } });
  if (steps.length !== orderedStepIds.length) {
    throw new AdminValidationError("Please include all steps when reordering.");
  }

  const stepIds = steps.map((step) => step.id);
  for (const id of orderedStepIds) {
    if (!stepIds.includes(id)) {
      throw new AdminValidationError("One of the steps does not belong to this journey.");
    }
  }

  const reordered = await prisma.$transaction(async (tx) => {
    await Promise.all(
      orderedStepIds.map((id, index) =>
        tx.learningJourneyStep.update({ where: { id }, data: { order: index + 1 + 1000 } })
      )
    );

    await Promise.all(
      orderedStepIds.map((id, index) =>
        tx.learningJourneyStep.update({ where: { id }, data: { order: index + 1 } })
      )
    );

    return tx.learningJourneyStep.findMany({
      where: { journeyId },
      include: { sessionOutline: true, chat: true, journey: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  });

  return reordered;
}

// This deletes a journey plus its steps and outlines so no records are left hanging.
export async function deleteJourney(journeyId: string) {
  const journey = await prisma.learningJourney.findUnique({ where: { id: journeyId } });
  if (!journey) {
    throw new AdminValidationError("Journey not found.");
  }

  await prisma.$transaction([
    prisma.learningJourneyStep.deleteMany({ where: { journeyId } }),
    prisma.learningJourney.delete({ where: { id: journeyId } }),
  ]);

  return { deletedOutlines: 0 };
}

// This splits the textarea into a JSON array.
function splitObjectives(text?: string | null) {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

// This checks if a status change is allowed.
function canMoveStatus(current: string, next: string) {
  if (current === next) return true;
  const allowed: Record<string, string[]> = {
    draft: ["awaiting_review", "active", "archived"],
    awaiting_review: ["draft", "active", "archived"],
    active: ["draft", "completed", "archived"],
    completed: ["active", "archived"],
    archived: ["draft"],
  };

  const moves = allowed[current] || [];
  return moves.includes(next);
}

// This finds the user id by email when a personalized journey is set.
async function findUserIdByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AdminValidationError("User not found for that email.");
  }
  return user.id;
}
