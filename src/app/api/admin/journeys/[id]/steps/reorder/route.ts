// This route lets admins reorder steps by sending the full ordered list.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../../../server/auth/session";
import { AdminValidationError } from "../../../../../../../server/admin/sessions";
import { reorderJourneySteps } from "../../../../../../../server/admin/journeys";

type RouteParams = { params: { id: string } };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const orderedStepIds = Array.isArray(body.orderedStepIds) ? body.orderedStepIds : [];
    if (orderedStepIds.length === 0) {
      throw new AdminValidationError("orderedStepIds is required.");
    }

    const steps = await reorderJourneySteps(params.id, orderedStepIds);
    return NextResponse.json({ steps });
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
  console.error("Admin reorder steps route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
