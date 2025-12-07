// This route signs up a new user with email, password, and a fresh JWT cookie.
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { buildAuthCookie, signUserToken } from "../../../../server/auth/session";

const MIN_PASSWORD_LENGTH = 8;

// This helper checks that an email looks valid enough.
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// This handles the signup request and sets the auth cookie.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : null;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "user",
        botRole: "coachee",
      },
      select: { id: true, email: true, name: true },
    });

    const token = signUserToken(user.id);
    const response = NextResponse.json({ user });
    response.cookies.set(buildAuthCookie(token));
    return response;
  } catch (err) {
    console.error("Signup failed:", err);
    return NextResponse.json({ error: "Signup failed." }, { status: 500 });
  }
}
