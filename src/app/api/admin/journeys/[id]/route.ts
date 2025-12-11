// This route lets admins read or update one journey.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../server/auth/session";
import { AdminValidationError } from "../../../../../server/admin/sessions";
import { deleteJourney, getJourneyDetail, updateJourney } from "../../../../../server/admin/journeys";

type RouteParams = { params: { id: string } };

export async function GET(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const journey = await getJourneyDetail(params.id);
    return NextResponse.json({ journey });
  } catch (error) {
    return respondError(error);
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const journey = await updateJourney(params.id, {
      title: body.title,
      slug: body.slug,
      intro: body.intro,
      objectivesText: body.objectivesText,
      isStandard: body.isStandard,
      personalizedUserEmail: body.personalizedUserEmail ?? null,
      userGoalSummary: body.userGoalSummary,
      status: body.status,
    });
    return NextResponse.json({ journey });
  } catch (error) {
    return respondError(error);
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const result = await deleteJourney(params.id);
    return NextResponse.json({ deleted: true, ...result });
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
  console.error("Admin journey route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
