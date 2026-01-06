// This route lets admins edit a single step.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../../../server/auth/session";
import { AdminValidationError } from "../../../../../../../server/admin/sessions";
import { deleteJourneyStep, updateJourneyStep } from "../../../../../../../server/admin/journeys";

type RouteParams = { params: { id: string; stepId: string } };

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const step = await updateJourneyStep(params.stepId, {
      sessionOutlineId: body.sessionOutlineId,
      ahaText: body.ahaText,
      status: body.status,
    });
    return NextResponse.json({ step });
  } catch (error) {
    return respondError(error);
  }
}

// This removes a step from a journey.
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const result = await deleteJourneyStep(params.id, params.stepId);
    return NextResponse.json(result);
  } catch (error) {
    return respondError(error);
  }
}

// This keeps error replies simple for the admin UI.
function respondError(error: unknown) {
  if (error instanceof AdminValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.error("Admin step update route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
