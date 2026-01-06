// This route lets admins duplicate a journey into a fresh draft copy.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../../server/auth/session";
import { AdminValidationError } from "../../../../../../server/admin/sessions";
import { duplicateJourney } from "../../../../../../server/admin/journeys";

type RouteParams = { params: { id: string } };

export async function POST(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const journey = await duplicateJourney(params.id);
    return NextResponse.json({ journey });
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
  console.error("Admin journey duplicate route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

