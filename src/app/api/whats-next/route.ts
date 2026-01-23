// This route saves the confirmed goal, creates a personalized journey, and triggers emails.
import { NextResponse } from "next/server";
import { prisma } from "../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../server/auth/session";
import { sendGoalCommitEmails } from "../../../server/notifications/email";
import { getGuestIdFromRequest } from "../../../server/guest";

// This handles POST calls from the /whats-next page to commit the goal.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const learningGoal = typeof body.learningGoal === "string" ? body.learningGoal.trim() : "";
    const recommendedTitle =
      typeof body.recommendedTitle === "string" && body.recommendedTitle.trim().length > 0
        ? body.recommendedTitle.trim()
        : null;
    const recommendedIntro =
      typeof body.recommendedIntro === "string" && body.recommendedIntro.trim().length > 0
        ? body.recommendedIntro.trim()
        : null;

    if (!learningGoal) {
      return NextResponse.json({ error: "Learning goal is required." }, { status: 400 });
    }

    const user = await requireUser(req);
    const guestId = getGuestIdFromRequest(req);
    const result = await prisma.$transaction(async (tx) => {
      await tx.userGoal.create({
        data: {
          userId: user.id,
          statement: learningGoal,
          status: "active",
        },
      });

      // Link the latest define-your-goal guest chat for this browser, so it appears in "Previous Conversations" after signup.
      const needAnalysisOutline = await tx.learningSessionOutline.findFirst({
        where: { slug: "define-your-goal" },
        select: { id: true },
      });
      let goalChatId: string | null = null;
      if (needAnalysisOutline && guestId) {
        const latestChat = await tx.learningSessionChat.findFirst({
          where: {
            userId: null,
            sessionOutlineId: needAnalysisOutline.id,
            metadata: { path: ["guestId"], equals: guestId },
          },
          orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
          select: { id: true },
        });
        if (latestChat) {
          await tx.learningSessionChat.update({
            where: { id: latestChat.id },
            data: { userId: user.id },
          });
          goalChatId = latestChat.id;
        }
      }

      if (needAnalysisOutline && !goalChatId) {
        const latestUserChat = await tx.learningSessionChat.findFirst({
          where: {
            userId: user.id,
            sessionOutlineId: needAnalysisOutline.id,
          },
          orderBy: [{ lastMessageAt: "desc" }, { startedAt: "desc" }],
          select: { id: true },
        });
        goalChatId = latestUserChat?.id || null;
      }

      const journey = await tx.learningJourney.create({
        data: {
          title: recommendedTitle || `Personal journey for: ${learningGoal}`,
          intro: recommendedIntro,
          objectives: [],
          isStandard: false,
          personalizedForUserId: user.id,
          userGoalSummary: learningGoal,
          goalChatId,
          status: "awaiting_review",
          slug: null,
        },
        select: { id: true, personalizedForUserId: true, goalChatId: true },
      });

      return { journey, goalChatId };
    });

    try {
      await sendGoalCommitEmails({ user, learningGoal, journey: result.journey });
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
