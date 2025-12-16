// This file manages the anonymous "guest id" cookie so we can keep pre-login chats private.

// This is the cookie name used across the app for anonymous visitors.
export const GUEST_COOKIE_NAME = "lf_guest";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

// This reads one cookie value from a Cookie header string.
function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  for (const part of parts) {
    const [cookieName, ...rest] = part.split("=");
    if (cookieName === name) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

// This returns the guest id from the request cookie header.
export function getGuestIdFromRequest(req: Request): string | null {
  return readCookie(req.headers.get("cookie"), GUEST_COOKIE_NAME);
}

// This creates a new random guest id.
export function createGuestId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : `guest-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

// This builds the cookie settings we use for the guest id.
export function buildGuestCookie(guestId: string) {
  return {
    name: GUEST_COOKIE_NAME,
    value: guestId,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  };
}

// This ensures the request has a guest id and returns it plus an optional cookie to set.
export function ensureGuestId(req: Request): { guestId: string; cookieToSet: ReturnType<typeof buildGuestCookie> | null } {
  const existing = getGuestIdFromRequest(req);
  if (existing) {
    return { guestId: existing, cookieToSet: null };
  }
  const created = createGuestId();
  return { guestId: created, cookieToSet: buildGuestCookie(created) };
}
