// This route lets admins list and create session outlines.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../server/auth/session";
import { AdminValidationError, createSessionOutline, listSessionOutlines } from "../../../../server/admin/sessions";

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const url = new URL(req.url);
    const journeyId = url.searchParams.get("journeyId");
    const live = url.searchParams.get("live");
    const search = url.searchParams.get("search");

    const outlines = await listSessionOutlines({
      journeyId: journeyId || undefined,
      live: live === "live" ? "live" : live === "not_live" ? "not_live" : "all",
      search: search || null,
    });

    return NextResponse.json({ outlines });
  } catch (error) {
    return respondError(error);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const outline = await createSessionOutline({
      journeyId: body.journeyId,
      title: body.title,
      slug: body.slug,
      content: body.content,
      botTools: body.botTools,
      firstUserMessage: body.firstUserMessage,
      live: Boolean(body.live),
      objective: body.objective ?? null,
      tags: body.tags ?? null,
    });

    return NextResponse.json({ outline });
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
  console.error("Admin session route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
