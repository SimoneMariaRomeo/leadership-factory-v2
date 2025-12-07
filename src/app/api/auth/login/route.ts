// This route logs a user in, verifies the password, and refreshes the JWT cookie.
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { buildAuthCookie, signUserToken } from "../../../../server/auth/session";

// This handles the login request and refreshes the session cookie.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = signUserToken(user.id);
    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, learningGoal: user.learningGoal },
    });
    response.cookies.set(buildAuthCookie(token));
    return response;
  } catch (err) {
    console.error("Login failed:", err);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
