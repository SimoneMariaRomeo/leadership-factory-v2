// This route lets the signed-in user add or update goals from the profile page.
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../../server/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const goalId = typeof body.goalId === "string" ? body.goalId.trim() : "";
    const statement = typeof body.statement === "string" ? body.statement.trim() : "";
    const status =
      body.status === "active" || body.status === "achieved" ? (body.status as "active" | "achieved") : null;
    const user = await requireUser(req);

    if (!goalId) {
      if (!statement) {
        return NextResponse.json({ error: "Please write your goal before saving." }, { status: 400 });
      }
      const created = await prisma.userGoal.create({
        data: {
          userId: user.id,
          statement,
          status: "active",
        },
        select: { id: true, statement: true, status: true, updatedAt: true },
      });
      return NextResponse.json({ success: true, goal: created });
    }

    const existing = await prisma.userGoal.findFirst({
      where: { id: goalId, userId: user.id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Goal not found." }, { status: 404 });
    }

    const data: { statement?: string; status?: "active" | "achieved" } = {};
    if (statement) {
      data.statement = statement;
    }
    if (status) {
      data.status = status;
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Please send a goal update." }, { status: 400 });
    }

    const updated = await prisma.userGoal.update({
      where: { id: goalId },
      data,
      select: { id: true, statement: true, status: true, updatedAt: true },
    });

    return NextResponse.json({ success: true, goal: updated });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile goal update failed:", err);
    return NextResponse.json({ error: "Could not save your goal." }, { status: 500 });
  }
}
