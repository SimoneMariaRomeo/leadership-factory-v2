// This route clears the auth cookie so the user is logged out.
import { NextResponse } from "next/server";
import { buildLogoutCookie } from "../../../../server/auth/session";

// This handles the logout request and expires the cookie.
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(buildLogoutCookie());
  return response;
}
