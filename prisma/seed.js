// This file fills the database with the starter goal clarification journey and its first step.
require("dotenv").config();
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

// Uses a pg pool with the Prisma adapter.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const GOAL_JOURNEY_ID = "journey-goal-clarification";
const GOAL_JOURNEY_SLUG = "goal-clarification";
const NEED_OUTLINE_ID = "outline-need-analysis";
const NEED_OUTLINE_SLUG = "need-analysis";
const NEED_STEP_ID = "step-goal-clarification-need-analysis";

const needAnalysisContent = [
  "Start a conversation to define the user's learning needs within maximum 5 messages by identifying:",
  "[X situation] --> what the user is going through",
  "[Y pattern] --> the root causes",
  "[Z learning] --> would help them to achieve their [X Goal]",
  "[X Goal] --> their goal",
  "This conversation focuses strictly on human development themes such as mindset, behavior, communication, and self-effectiveness. If it shifts into technical, product, or process-related problem-solving, gently remind the user about the focus.",
  "The total interaction should be around 3-5 messages.",
  "",
  "After and only after you have understood situation, patters, learning and goal, redirect.",
  "",
  "CLARIFICATIONS:",
  "\"learningGoal\" --> phrased like this \"[X situation], driven by [Y pattern], and you believe [Z learning] would help you achieve [N Goal]\"",
  "",
  "NEVER DO:",
  "- Never ask more than 4 questions to the user before redirecting",
  "- Never coach the user to define options or solutions (you focus on analysing the situation and goal)",
].join("\n");

const needAnalysisBotTools = `
REDIRECT PROTOCOL
Write the following JSON command:
{"command":"create_learning_goal","learningGoal":"..."}
No extra punctuation, explanations, or text before/after the JSON.
`.trim();

// Seeds the goal clarification journey, its outline, and its step.
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to run the seed script.");
  }

  console.log("Seeding Goal Clarification journey and need-analysis outline...");

  const goalJourney = await prisma.learningJourney.upsert({
    where: { slug: GOAL_JOURNEY_SLUG },
    update: {
      title: "Goal Clarification",
      intro:
        "A concise path to clarify and commit to the learning goal that matters most right now.",
      objectives: [
        "Help the user articulate a single, concrete learning goal.",
        "Capture motivation and constraints that will inform next steps.",
        "Prepare the goal for review and confirmation.",
      ],
      isStandard: true,
      personalizedForUserId: null,
      status: "active",
      order: 1,
    },
    create: {
      id: GOAL_JOURNEY_ID,
      slug: GOAL_JOURNEY_SLUG,
      title: "Goal Clarification",
      intro:
        "A concise path to clarify and commit to the learning goal that matters most right now.",
      objectives: [
        "Help the user articulate a single, concrete learning goal.",
        "Capture motivation and constraints that will inform next steps.",
        "Prepare the goal for review and confirmation.",
      ],
      isStandard: true,
      personalizedForUserId: null,
      status: "active",
      order: 1,
    },
  });

  const needAnalysisOutline = await prisma.learningSessionOutline.upsert({
    where: {
      journeyId_slug: { journeyId: goalJourney.id, slug: NEED_OUTLINE_SLUG },
    },
    update: {
      title: "Need Analysis",
      objective: "Help the user clarify and articulate a concrete learning goal.",
      content: needAnalysisContent,
      botTools: needAnalysisBotTools,
      firstUserMessage: "Before we begin, tell me briefly what brings you here.",
      order: 1,
      live: true,
      tags: ["need-analysis", "goal-clarification", "standard-journey"],
    },
    create: {
      id: NEED_OUTLINE_ID,
      journeyId: goalJourney.id,
      slug: NEED_OUTLINE_SLUG,
      order: 1,
      live: true,
      title: "Need Analysis",
      objective: "Help the user clarify and articulate a concrete learning goal.",
      content: needAnalysisContent,
      botTools: needAnalysisBotTools,
      firstUserMessage: "Before we begin, tell me briefly what brings you here.",
      tags: ["need-analysis", "goal-clarification", "standard-journey"],
    },
  });

  await prisma.learningJourneyStep.upsert({
    where: { id: NEED_STEP_ID },
    update: {
      journeyId: goalJourney.id,
      sessionOutlineId: needAnalysisOutline.id,
      order: 1,
      status: "unlocked",
      chatId: null,
      ahaText: null,
      unlockedAt: null,
      completedAt: null,
    },
    create: {
      id: NEED_STEP_ID,
      journeyId: goalJourney.id,
      sessionOutlineId: needAnalysisOutline.id,
      order: 1,
      status: "unlocked",
      chatId: null,
      ahaText: null,
      unlockedAt: null,
      completedAt: null,
    },
  });

  console.log("Seed complete: Goal Clarification journey with need-analysis step ready.");
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
