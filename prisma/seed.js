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
  "Guide the user through a concise goal clarification coaching flow:",
  "1) Welcome the user and ask what they want to achieve or change.",
  "2) Ask 2-3 clarifying questions about context, motivation, and timeframe.",
  "3) Propose a first draft of the learning goal and ask for confirmation.",
  "4) Iterate until the goal is concrete, measurable, and relevant.",
  "5) When validated, emit the create_learning_goal JSON command and stop chatting.",
].join("\n");

const needAnalysisBotTools = `
You have one special JSON command available in this session.

When the user reaches a clear, specific and agreed-upon learning goal, you must send a single assistant message whose content is exactly this JSON object (and nothing else):

{
  "command": "create_learning_goal",
  "learningGoal": "<final goal text>"
}

Rules:
- Only send this JSON when the goal is concrete and validated with the user.
- Do not include any text before or after the JSON.
- Do not send this JSON more than once.
- Until the goal is clear, continue asking clarifying questions.
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
