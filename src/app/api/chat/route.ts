// This API endpoint forwards chat requests to the shared handler.
import { NextResponse } from "next/server";
import { handleChat } from "../../../server/chat/handleChat";
import { getCurrentUser } from "../../../server/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { chatId = null, sessionOutlineId, journeyStepId = null, messages } = body;

    if (!sessionOutlineId || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Missing sessionOutlineId or messages." }, { status: 400 });
    }

    const currentUser = await getCurrentUser(req);
    const result = await handleChat({
      userId: currentUser?.id || null,
      sessionOutlineId,
      journeyStepId,
      chatId,
      messages,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Chat API failed:", err);
    const message = err instanceof Error ? err.message : "Chat failed.";
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("not allowed")) {
      return NextResponse.json({ error: "Not allowed to chat on this step." }, { status: 403 });
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
