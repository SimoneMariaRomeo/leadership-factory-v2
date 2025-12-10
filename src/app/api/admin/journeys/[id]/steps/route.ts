// This route lets admins add a step to a journey.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../../server/auth/session";
import { AdminValidationError } from "../../../../../../server/admin/sessions";
import { addJourneyStep } from "../../../../../../server/admin/journeys";

type RouteParams = { params: { id: string } };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    if (!body.sessionOutlineId) {
      throw new AdminValidationError("Session outline is required.");
    }
    const step = await addJourneyStep(params.id, body.sessionOutlineId);
    return NextResponse.json({ step });
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
  console.error("Admin add step route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
