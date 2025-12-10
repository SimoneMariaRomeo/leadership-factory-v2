// This route lets admins read, update, or delete one session outline.
import { NextResponse } from "next/server";
import { requireAdmin, UnauthorizedError } from "../../../../../server/auth/session";
import {
  AdminValidationError,
  deleteSessionOutline,
  getSessionOutline,
  updateSessionOutline,
} from "../../../../../server/admin/sessions";

type RouteParams = { params: { id: string } };

export async function GET(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const outline = await getSessionOutline(params.id);
    return NextResponse.json({ outline });
  } catch (error) {
    return respondError(error);
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const outline = await updateSessionOutline(params.id, {
      title: body.title,
      slug: body.slug,
      live: body.live,
      objective: body.objective,
      content: body.content,
      botTools: body.botTools,
      firstUserMessage: body.firstUserMessage,
      tags: body.tags,
    });
    return NextResponse.json({ outline });
  } catch (error) {
    return respondError(error);
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    await requireAdmin(req);
    const result = await deleteSessionOutline(params.id);
    return NextResponse.json({ deleted: true, deletedStepCount: result.deletedStepCount });
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
  console.error("Admin outline route failed:", error);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
