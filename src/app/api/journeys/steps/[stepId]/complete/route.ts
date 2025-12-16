// This endpoint marks a step as completed, unlocks the next one, and returns the journey link.
import { NextResponse } from "next/server";
import { completeStepAndUnlockNext, journeySlugOrId } from "../../../../../../lib/journeys";
import { requireUser, UnauthorizedError } from "../../../../../../server/auth/session";

type RouteParams = { params: { stepId: string } };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const currentUser = await requireUser(req);
    const result = await completeStepAndUnlockNext(params.stepId, currentUser.id);

    if (result.status === "not_found") {
      return NextResponse.json({ error: "Step not found." }, { status: 404 });
    }
    if (result.status === "forbidden") {
      return NextResponse.json({ error: "Not allowed to complete this step." }, { status: 403 });
    }
    if (result.status === "locked") {
      return NextResponse.json({ error: "Step is locked." }, { status: 409 });
    }

    const nextUrl = `/journeys/${journeySlugOrId(result.journey)}`;
    return NextResponse.json({
      nextUrl,
      completedStepId: result.completedStep.id,
      unlockedStepId: result.unlockedStep?.id || null,
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Mark step completed failed:", err);
    return NextResponse.json({ error: "Could not complete this step." }, { status: 500 });
  }
}
