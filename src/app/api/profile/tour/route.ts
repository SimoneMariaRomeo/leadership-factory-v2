// This endpoint marks the profile tour as completed for the signed-in user.
import { NextResponse } from "next/server";
import { prisma } from "../../../../server/prismaClient";
import { requireUser, UnauthorizedError } from "../../../../server/auth/session";

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    await prisma.user.update({
      where: { id: user.id },
      data: { profileTour: false },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Mark profile tour complete failed:", err);
    return NextResponse.json({ error: "Could not update tour." }, { status: 500 });
  }
}
