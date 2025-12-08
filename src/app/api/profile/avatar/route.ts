// This route lets the user change their avatar to one of the preset images.
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../../server/auth/session";

const ALLOWED = new Set([
  "avatar_bloom.svg",
  "avatar_bridge.svg",
  "avatar_bulb.svg",
  "avatar_compass.svg",
  "avatar_lighthouse.svg",
  "avatar_mountain.svg",
  "avatar_path.svg",
  "avatar_rings.svg",
  "avatar_seed.svg",
  "avatar_spiral.svg",
]);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const picture = typeof body.picture === "string" ? body.picture.trim() : "";
    const clean = picture.replace(/^\/avatars\//, "");

    if (!ALLOWED.has(clean)) {
      return NextResponse.json({ error: "Please pick one of the provided avatars." }, { status: 400 });
    }

    const user = await requireUser(req);
    const saved = await prisma.user.update({
      where: { id: user.id },
      data: { picture: `/avatars/${clean}` },
      select: { id: true, email: true, name: true, picture: true },
    });

    return NextResponse.json({ success: true, user: saved });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Avatar update failed:", err);
    return NextResponse.json({ error: "Could not update avatar." }, { status: 500 });
  }
}
