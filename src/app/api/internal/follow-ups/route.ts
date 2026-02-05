// This route runs the follow-up job for a cron or admin trigger.
import { NextResponse } from "next/server";
import { runAutomaticFollowUps } from "../../../../server/follow-ups/automatic-follow-ups";

export const dynamic = "force-dynamic";

// This checks a shared secret so the route is not public.
function isAuthorized(request: Request) {
  const expected = process.env.INTERNAL_CRON_TOKEN;
  if (!expected) {
    return process.env.NODE_ENV !== "production";
  }

  const headerToken =
    request.headers.get("x-internal-cron-token") ||
    request.headers.get("authorization")?.replace("Bearer ", "");
  const urlToken = new URL(request.url).searchParams.get("token");
  const provided = (headerToken || urlToken || "").trim();

  return provided.length > 0 && provided === expected;
}

// This runs the job and returns a short summary.
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runAutomaticFollowUps();
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Follow-up job failed:", error);
    return NextResponse.json({ ok: false, error: "Job failed." }, { status: 500 });
  }
}

// This allows GET calls from simple schedulers.
export async function GET(request: Request) {
  return POST(request);
}
