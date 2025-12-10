// This route lets admins list and create journeys.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../server/auth/session";
import { AdminValidationError } from "../../../../server/admin/sessions";
import { createJourney, listJourneys } from "../../../../server/admin/journeys";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const isStandard = url.searchParams.get("isStandard") as any;
    const status = url.searchParams.get("status");
    const userEmail = url.searchParams.get("userEmail");

    const journeys = await listJourneys({
      isStandard: isStandard === "standard" || isStandard === "nonstandard" ? isStandard : "all",
      status: status && status !== "all" ? status : null,
      userEmail: userEmail || null,
    });

    return NextResponse.json({ journeys });
  } catch (error) {
    return respondError(error);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const journey = await createJourney({
      title: body.title,
      slug: body.slug,
      intro: body.intro,
      objectivesText: body.objectivesText,
      isStandard: body.isStandard ?? false,
      personalizedUserEmail: body.personalizedUserEmail ?? null,
      userGoalSummary: body.userGoalSummary ?? null,
      status: body.status || "draft",
    });

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
  console.error("Admin journeys route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
