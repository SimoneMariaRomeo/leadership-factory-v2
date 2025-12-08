// This helper keeps the auth cookie and fetches the signed-in user with a simple JWT.
import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";

const SESSION_COOKIE_NAME = "lf_session";
const THIRTY_DAYS = 60 * 60 * 24 * 30;
// This constant keeps the cookie name in one place for routes and tests.
export const AUTH_COOKIE_NAME = SESSION_COOKIE_NAME;

type TokenPayload = {
  userId: string;
};

type SafeUser = {
  id: string;
  email: string | null;
  name: string | null;
  learningGoal: string | null;
  learningGoalConfirmedAt: Date | null;
};

// This tiny error marks when no user is present.
export class UnauthorizedError extends Error {}

// This reads the JWT secret or throws if missing.
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set.");
  }
  return secret;
}

// This pulls the auth token out of the Cookie header.
function readTokenFromRequest(req: Request): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  for (const part of parts) {
    const [name, ...rest] = part.split("=");
    if (name === SESSION_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

// This signs a JWT for the user id.
export function signUserToken(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: THIRTY_DAYS });
}

// This builds the cookie shape for the auth token.
export function buildAuthCookie(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: THIRTY_DAYS,
  };
}

// This fetches the current user or returns null when no valid token is present.
export async function getCurrentUser(req: Request): Promise<SafeUser | null> {
  let payload: TokenPayload;
  const token = readTokenFromRequest(req);
  if (!token) return null;

  try {
    payload = jwt.verify(token, getJwtSecret()) as TokenPayload;
  } catch (err) {
    console.warn("JWT verification failed:", err);
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true, learningGoal: true, learningGoalConfirmedAt: true },
  });

  if (!user) return null;
  return user;
}

// This forces a valid user or throws a 401-style error.
export async function requireUser(req: Request): Promise<SafeUser> {
  const user = await getCurrentUser(req);
  if (!user) {
    throw new UnauthorizedError("Unauthorized");
  }
  return user;
}

// This clears the auth cookie by expiring it.
export function buildLogoutCookie() {
  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  };
}

// This helper builds a Request object from a cookie header so server components can reuse the auth helpers.
export function requestFromCookieHeader(cookieHeader: string | null | undefined) {
  return new Request("http://localhost", {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });
}
