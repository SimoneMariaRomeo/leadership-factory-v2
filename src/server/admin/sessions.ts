// This file holds small helpers for admin session outline actions.
import type { Prisma } from "../../../generated/prisma";
import { prisma } from "../prismaClient";

// This tiny error marks user-facing validation problems.
export class AdminValidationError extends Error {}

export type SessionFilters = {
  search?: string | null;
  journeyId?: string | null;
};

export type SessionInput = {
  title: string;
  slug: string;
  content: string;
  botTools: string;
  firstUserMessage: string;
  objective?: string | null;
  tags?: any;
};

// This lists outlines with simple filters for the admin grid.
export async function listSessionOutlines(filters: SessionFilters) {
  const where: Prisma.LearningSessionOutlineWhereInput = {};

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { slug: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.journeyId) {
    const steps = await prisma.learningJourneyStep.findMany({
      where: { journeyId: filters.journeyId },
      select: { sessionOutlineId: true },
    });
    const ids = Array.from(new Set(steps.map((step) => step.sessionOutlineId)));
    if (ids.length === 0) {
      return [];
    }
    where.id = { in: ids };
  }

  return prisma.learningSessionOutline.findMany({
    where,
    include: { _count: { select: { steps: true } } },
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });
}

// This fetches one outline with its journey and usage count.
export async function getSessionOutline(id: string) {
  const outline = await prisma.learningSessionOutline.findUnique({
    where: { id },
    include: { _count: { select: { steps: true } } },
  });

  if (!outline) {
    throw new AdminValidationError("Outline not found.");
  }

  return outline;
}

// This creates a new outline with a simple order default.
export async function createSessionOutline(input: SessionInput) {
  const required = ["title", "slug", "content", "botTools", "firstUserMessage"] as const;
  for (const key of required) {
    if (!input[key] || `${input[key]}`.trim() === "") {
      throw new AdminValidationError(`${key} is required.`);
    }
  }

  const maxOrder = await prisma.learningSessionOutline.aggregate({
    _max: { order: true },
  });
  const nextOrder = (maxOrder._max.order || 0) + 1;

  try {
    return await prisma.learningSessionOutline.create({
      data: {
        title: input.title.trim(),
        slug: input.slug.trim(),
        order: nextOrder,
        objective: input.objective?.trim() || null,
        content: input.content,
        botTools: input.botTools,
        firstUserMessage: input.firstUserMessage,
        tags: input.tags ?? null,
      },
      include: { _count: { select: { steps: true } } },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new AdminValidationError("Slug must be unique within this journey.");
    }
    throw error;
  }
}

type SessionUpdateInput = {
  title?: string;
  slug?: string;
  objective?: string | null;
  content?: string;
  botTools?: string;
  firstUserMessage?: string;
  tags?: any;
};

// This updates one outline and keeps slug uniqueness friendly.
export async function updateSessionOutline(id: string, data: SessionUpdateInput) {
  const existing = await prisma.learningSessionOutline.findUnique({ where: { id } });
  if (!existing) {
    throw new AdminValidationError("Outline not found.");
  }

  if (data.slug !== undefined && `${data.slug}`.trim() === "") {
    throw new AdminValidationError("Slug cannot be empty.");
  }

  const updateData: Prisma.LearningSessionOutlineUpdateInput = {};
  if (data.title !== undefined) updateData.title = data.title.trim();
  if (data.slug !== undefined) updateData.slug = data.slug.trim();
  if (data.objective !== undefined) updateData.objective = data.objective?.trim() || null;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.botTools !== undefined) updateData.botTools = data.botTools;
  if (data.firstUserMessage !== undefined) updateData.firstUserMessage = data.firstUserMessage;
  if (data.tags !== undefined) updateData.tags = data.tags;

  try {
    return await prisma.learningSessionOutline.update({
      where: { id },
      data: updateData,
      include: { _count: { select: { steps: true } } },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new AdminValidationError("Slug must stay unique within this journey.");
    }
    throw error;
  }
}

// This deletes an outline and clears any related steps first.
export async function deleteSessionOutline(id: string) {
  const existing = await prisma.learningSessionOutline.findUnique({ where: { id } });
  if (!existing) {
    throw new AdminValidationError("Outline not found.");
  }

  const steps = await prisma.learningJourneyStep.findMany({ where: { sessionOutlineId: id } });
  const deletedStepCount = steps.length;

  await prisma.$transaction([
    prisma.learningJourneyStep.deleteMany({ where: { sessionOutlineId: id } }),
    prisma.learningSessionOutline.delete({ where: { id } }),
  ]);

  return { deletedStepCount };
}
