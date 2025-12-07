// This route returns the currently signed-in user if the JWT cookie is valid.
import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../server/auth/session";

// This handles the GET request and returns the active user or null.
export async function GET(req: Request) {
  try {
    const user = await getCurrentUser(req);
    return NextResponse.json({ user });
  } catch (err) {
    console.error("Auth me failed:", err);
    return NextResponse.json({ user: null });
  }
}
