// This API endpoint forwards chat requests to the shared handler.
import { NextResponse } from "next/server";
import { handleChat } from "../../../server/chat/handleChat";
import { getCurrentUser } from "../../../server/auth/session";
import { prisma } from "../../../server/prismaClient";
import { ensureGuestId, getGuestIdFromRequest } from "../../../server/guest";
import { checkRateLimit } from "../../../server/rateLimit";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chatId = null, sessionOutlineId, journeyStepId = null, messages } = body;

    if (!sessionOutlineId || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Missing sessionOutlineId or messages." }, { status: 400 });
    }

    const currentUser = await getCurrentUser(req);
    let guestId: string | null = null;
    let guestCookieToSet: ReturnType<typeof ensureGuestId>["cookieToSet"] | null = null;

    // Only the public need-analysis chat is allowed before login.
    if (!currentUser) {
      if (journeyStepId) {
        return NextResponse.json({ error: "Please log in to continue." }, { status: 401 });
      }
      const outline = await prisma.learningSessionOutline.findUnique({
        where: { id: String(sessionOutlineId) },
        select: { slug: true },
      });
      if (!outline) {
        return NextResponse.json({ error: "Session not found." }, { status: 404 });
      }
      if (outline.slug !== "need-analysis") {
        return NextResponse.json({ error: "Please log in to continue." }, { status: 401 });
      }
      const ensured = ensureGuestId(req);
      guestId = ensured.guestId;
      guestCookieToSet = ensured.cookieToSet;
    } else {
      guestId = getGuestIdFromRequest(req);
    }

    // This keeps the payload safe and small for the model call.
    const safeMessages = messages
      .filter((msg: any) => msg && typeof msg === "object")
      .map((msg: any) => {
        const role = msg.role === "assistant" ? ("assistant" as const) : ("user" as const);
        const content = typeof msg.content === "string" ? msg.content : "";
        return { role, content };
      })
      .filter((msg: { role: "user" | "assistant"; content: string }) => msg.content.trim().length > 0)
      .slice(-30);

    if (safeMessages.length === 0) {
      return NextResponse.json({ error: "Please write a message first." }, { status: 400 });
    }

    // This slows down spam so one person cannot burn AI credits.
    const ip = String(req.headers.get("x-forwarded-for") || "")
      .split(",")[0]
      .trim();
    const identity = currentUser?.id ? `user:${currentUser.id}` : guestId ? `guest:${guestId}` : ip ? `ip:${ip}` : "unknown";
    const perUserLimit = checkRateLimit(`chat:${identity}`, 20, 60_000);
    if (!perUserLimit.allowed) {
      const limited = NextResponse.json(
        { error: "Too many messages. Please wait a bit and try again." },
        { status: 429, headers: { "Retry-After": String(perUserLimit.retryAfterSeconds) } }
      );
      if (guestCookieToSet) {
        limited.cookies.set(guestCookieToSet);
      }
      return limited;
    }

    if (ip && !identity.startsWith("ip:")) {
      const perIpLimit = checkRateLimit(`chat:ip:${ip}`, 60, 60_000);
      if (!perIpLimit.allowed) {
        const limited = NextResponse.json(
          { error: "Too many requests from this network. Please wait and try again." },
          { status: 429, headers: { "Retry-After": String(perIpLimit.retryAfterSeconds) } }
        );
        if (guestCookieToSet) {
          limited.cookies.set(guestCookieToSet);
        }
        return limited;
      }
    }

    const result = await handleChat({
      userId: currentUser?.id || null,
      guestId,
      sessionOutlineId,
      journeyStepId,
      chatId,
      messages: safeMessages,
    });

    const response = NextResponse.json(result);
    if (guestCookieToSet) {
      response.cookies.set(guestCookieToSet);
    }
    return response;
  } catch (err) {
    console.error("Chat API failed:", err);
    const message = err instanceof Error ? err.message : "Chat failed.";
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("not allowed")) {
      return NextResponse.json({ error: "Not allowed." }, { status: 403 });
    }
    if (lowerMessage.includes("not found")) {
      return NextResponse.json({ error: "Chat target not found." }, { status: 404 });
    }
    if (lowerMessage.includes("locked")) {
      return NextResponse.json({ error: "This step is locked." }, { status: 409 });
    }
    return NextResponse.json({ error: "Chat failed." }, { status: 500 });
  }
}
