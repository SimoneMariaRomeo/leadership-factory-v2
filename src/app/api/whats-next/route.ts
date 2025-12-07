// This route saves the confirmed goal, creates a personalized journey, and triggers emails.
import { NextResponse } from "next/server";
import { prisma } from "../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../server/auth/session";
import { sendGoalCommitEmails } from "../../../server/notifications/email";

// This handles POST calls from the /whats-next page to commit the goal.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const learningGoal = typeof body.learningGoal === "string" ? body.learningGoal.trim() : "";

    if (!learningGoal) {
      return NextResponse.json({ error: "Learning goal is required." }, { status: 400 });
    }

    const user = await requireUser(req);
    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { learningGoal, learningGoalConfirmedAt: new Date() },
        select: { id: true, email: true, name: true, learningGoal: true },
      });

      const journey = await tx.learningJourney.create({
        data: {
          title: `Personal journey for: ${learningGoal}`,
          intro: null,
          objectives: [],
          isStandard: false,
          personalizedForUserId: user.id,
          userGoalSummary: learningGoal,
          status: "awaiting_review",
          slug: null,
        },
        select: { id: true, personalizedForUserId: true },
      });

      return { updatedUser, journey };
    });

    try {
      await sendGoalCommitEmails({ user: result.updatedUser, learningGoal, journey: result.journey });
    } catch (emailError) {
      console.error("Sending goal commit emails failed:", emailError);
    }

    return NextResponse.json({ success: true, journeyId: result.journey.id });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Goal commit failed:", err);
    return NextResponse.json({ error: "Goal commit failed." }, { status: 500 });
  }
}
