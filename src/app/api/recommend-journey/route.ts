// This endpoint asks the AI to draft a fresh journey title and intro from the user's goal.
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { prisma } from "../../../server/prismaClient";
import { callChatModel, type LlmMessage } from "../../../server/llm/client";

type RecommendJourneyRequest = {
  learningGoal?: unknown;
  avoidJourneys?: unknown;
};

// This small helper reads the prompt text from disk.
async function loadPrompt(): Promise<string> {
  const promptPath = path.join(process.cwd(), "prompts", "recommend_fresh_journey.txt");
  return readFile(promptPath, "utf-8");
}

// This parses a JSON-looking string into a title and intro, or returns nulls on failure.
function parseAiJson(raw: string): { title: string | null; intro: string | null } {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { title: null, intro: null };
    const title = typeof parsed.title === "string" ? parsed.title.trim() : null;
    const intro = typeof parsed.intro === "string" ? parsed.intro.trim() : null;
    return { title: title && title.length ? title : null, intro: intro && intro.length ? intro : null };
  } catch {
    return { title: null, intro: null };
  }
}

// This builds the example list sent to the AI using standard journeys as tone references.
async function loadJourneyExamples() {
  const journeys = await prisma.learningJourney.findMany({
    where: { isStandard: true },
    select: { title: true, intro: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return journeys
    .map((journey) => ({
      title: journey.title?.trim(),
      intro: journey.intro?.trim() || null,
    }))
    .filter((item) => item.title);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RecommendJourneyRequest;
    const learningGoal = typeof body.learningGoal === "string" ? body.learningGoal.trim() : "";
    const avoidJourneys =
      Array.isArray(body.avoidJourneys) && body.avoidJourneys.length
        ? body.avoidJourneys
            .map((item) => {
              if (!item || typeof item !== "object") return null;
              const title = typeof item.title === "string" ? item.title.trim() : "";
              const intro = typeof item.intro === "string" ? item.intro.trim() : "";
              if (!title) return null;
              return { title, intro: intro || null };
            })
            .filter(Boolean) as { title: string; intro: string | null }[]
        : [];

    if (!learningGoal) {
      return NextResponse.json({ error: "Learning goal is required." }, { status: 400 });
    }

    let promptText: string;
    try {
      promptText = await loadPrompt();
    } catch (err) {
      console.error("Failed to load prompt recommend_fresh_journey.txt:", err);
      return NextResponse.json({ error: "Prompt missing." }, { status: 500 });
    }

    const examples = await loadJourneyExamples();
    const userPayload = { learningGoal, examples, avoidJourneys };
    const messages: LlmMessage[] = [
      { role: "system", content: promptText.trim() },
      { role: "user", content: JSON.stringify(userPayload) },
    ];

    let aiTitle: string | null = null;
    let aiIntro: string | null = null;
    try {
      const raw = await callChatModel({ messages, provider: process.env.DEFAULT_API });
      const parsed = parseAiJson(raw);
      aiTitle = parsed.title;
      aiIntro = parsed.intro;
    } catch (err) {
      console.error("AI recommend-journey call failed:", err);
    }

    const fallbackTitle = aiTitle || `New journey: ${learningGoal.slice(0, 80)}`;
    const fallbackIntro =
      aiIntro ||
      `This journey is designed around your goal: ${learningGoal}. It will help you build skills, habits, and confidence step by step.`;

    return NextResponse.json({
      title: fallbackTitle,
      intro: fallbackIntro,
    });
  } catch (err) {
    console.error("Recommend journey failed:", err);
    return NextResponse.json({ error: "Could not recommend a journey." }, { status: 500 });
  }
}
