// This route lets the signed-in user update their learning goal from the profile page.
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../../server/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const learningGoal = typeof body.learningGoal === "string" ? body.learningGoal.trim() : "";

    if (!learningGoal) {
      return NextResponse.json({ error: "Please write your learning goal before saving." }, { status: 400 });
    }

    const user = await requireUser(req);
    const now = new Date();

    const updated = await prisma.$transaction(async (tx) => {
      const savedUser = await tx.user.update({
        where: { id: user.id },
        data: { learningGoal, learningGoalConfirmedAt: now },
        select: { id: true, email: true, name: true, learningGoal: true, learningGoalConfirmedAt: true },
      });

      const latestPersonalizedJourney = await tx.learningJourney.findFirst({
        where: { personalizedForUserId: user.id, isStandard: false, status: { not: "archived" } },
        orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
        select: { id: true },
      });

      if (latestPersonalizedJourney) {
        await tx.learningJourney.update({
          where: { id: latestPersonalizedJourney.id },
          data: { userGoalSummary: learningGoal },
        });
      }

      return savedUser;
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Profile goal update failed:", err);
    return NextResponse.json({ error: "Could not save your goal." }, { status: 500 });
  }
}
