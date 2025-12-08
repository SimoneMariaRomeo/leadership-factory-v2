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
    return NextResponse.json({ error: "Chat failed." }, { status: 500 });
  }
}
