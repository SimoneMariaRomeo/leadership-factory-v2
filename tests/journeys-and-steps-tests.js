// This script checks journeys, steps, chats, and completion rules with plain Node logs.
const path = require("path");
const { execSync } = require("child_process");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// This lets TS/TSX imports work in the test file.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

const TEST_DB_NAME = process.env.JOURNEYS_STEPS_TEST_DB || "journeys_steps_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;
const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, TEST_SHADOW_DB_NAME);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, "postgres");
process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const {
  loadJourneyWithStepsBySlug,
  getOrCreateStepChat,
  completeStepAndUnlockNext,
  journeySlugOrId,
} = require("../src/lib/journeys.ts");
const { signUserToken, AUTH_COOKIE_NAME } = require("../src/server/auth/session.ts");
const { POST: completeStepApi } = require("../src/app/api/journeys/steps/[stepId]/complete/route.ts");

let pool;
let adapter;
let prisma;

// This keeps the output readable in the console.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(` - Expectation: ${expectation}`);
}

// This marks a passing check.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// This halts the run if a must-have fails.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// This swaps a DB URL to use a dedicated name.
function withDbName(url, dbName) {
  if (!url) return url;
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

// This runs a shell command with the test DB env.
function runCommand(command, label) {
  execSync(command, {
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      SHADOW_DATABASE_URL: shadowDatabaseUrl,
      PRISMA_HIDE_UPDATE_MESSAGE: "1",
    },
    stdio: "pipe",
  });
  logPass(label);
}

// This drops and recreates the test DBs so each run starts fresh.
async function resetTestDatabases() {
  await recreateDatabase(adminDatabaseUrl, TEST_DB_NAME);
  await recreateDatabase(shadowAdminDatabaseUrl, TEST_SHADOW_DB_NAME);
}

// This helper recreates one database using an admin connection.
async function recreateDatabase(adminUrl, dbName) {
  const adminPool = new Pool({ connectionString: adminUrl });
  await adminPool.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1`, [dbName]);
  await adminPool.query(`DROP DATABASE IF EXISTS "${dbName}"`);
  await adminPool.query(`CREATE DATABASE "${dbName}"`);
  await adminPool.end();
}

// This clears the tables between tests.
async function clearData() {
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.learningSessionChat.deleteMany(),
    prisma.learningJourneyStep.deleteMany(),
    prisma.learningSessionOutline.deleteMany(),
    prisma.learningJourney.deleteMany(),
    prisma.user.deleteMany({ where: { email: { startsWith: "journey-test-" } } }),
  ]);
}

// This makes a simple user for the test cases.
async function createUser(label) {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return prisma.user.create({
    data: {
      email: `journey-test-${label}-${unique}@example.com`,
      passwordHash: "hash",
      role: "user",
      botRole: "coach",
    },
  });
}

// This seeds a journey with minimal required fields.
async function createJourney({ title, isStandard, personalizedForUserId = null, status = "active", slug }) {
  return prisma.learningJourney.create({
    data: {
      title,
      intro: `${title} intro`,
      isStandard,
      personalizedForUserId,
      status,
      slug,
      objectives: ["Test objective"],
      userGoalSummary: "Goal summary",
    },
  });
}

// This seeds a session outline for steps.
async function createOutline({ journeyId, slug, order, title }) {
  return prisma.learningSessionOutline.create({
    data: {
      slug,
      order,
      title,
      objective: `${title} objective`,
      content: "Coach the user kindly.",
      botTools: "Send JSON when asked.",
      firstUserMessage: "Hello, let's start.",
    },
  });
}

// This seeds a single step.
async function createStep({ journeyId, sessionOutlineId, order, status, unlockedAt = null, completedAt = null }) {
  return prisma.learningJourneyStep.create({
    data: {
      journeyId,
      sessionOutlineId,
      order,
      status,
      unlockedAt,
      completedAt,
    },
  });
}

// This runner wires up the DB and executes each test in order.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest("Prepare database", "Migrations should run for journeys and steps tests.");
  runCommand("npx prisma migrate deploy --schema prisma/schema.prisma", "prisma migrate deploy completed");
  await clearData();

  await testStandardJourneyVisible();
  await testPersonalizedJourneyVisibility();
  await testStepOrderingAndStatuses();
  await testStepChatCreation();
  await testCompletionUnlocksNextStep();
  await testCompletionIsIdempotent();
  await testCompletionBlockedForOtherUser();
  await testCompletionEndpointResponse();

  console.log("\nJourneys and steps checks completed.");
}

// Test: Standard journey should be visible to guests.
async function testStandardJourneyVisible() {
  logTest("Standard journey is publicly visible", "Guests should load standard journeys without auth.");
  await clearData();
  const journey = await createJourney({ title: "Public Journey", isStandard: true, slug: "public-journey" });
  const outline = await createOutline({ journeyId: journey.id, slug: "public-outline", order: 1, title: "Open Step" });
  await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const result = await loadJourneyWithStepsBySlug("public-journey", null);
  assert(result.status === "ok", "Guest should get the journey record.");
  assert(result.journey.steps.length === 1, "Steps should load with the journey.");
  logPass("Guest can see the standard journey and its steps.");
}

// Test: Personalized journey should only be visible to the owner.
async function testPersonalizedJourneyVisibility() {
  logTest(
    "Personalized journey visibility",
    "Owner should see it; other users and guests should be blocked."
  );
  await clearData();
  const owner = await createUser("owner");
  const stranger = await createUser("stranger");
  const journey = await createJourney({
    title: "Personal Journey",
    isStandard: false,
    personalizedForUserId: owner.id,
    slug: "personal-journey",
  });
  const outline = await createOutline({ journeyId: journey.id, slug: "p-outline", order: 1, title: "Private Step" });
  await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const ownerView = await loadJourneyWithStepsBySlug(journey.slug, owner.id);
  assert(ownerView.status === "ok", "Owner should see their journey.");

  const strangerView = await loadJourneyWithStepsBySlug(journey.slug, stranger.id);
  assert(strangerView.status === "forbidden", "Another user should be blocked.");

  const guestView = await loadJourneyWithStepsBySlug(journey.slug, null);
  assert(guestView.status === "forbidden", "Guest should not see someone else's journey.");
  logPass("Personalized journey stays private to its owner.");
}

// Test: Steps should be ordered and keep their status fields.
async function testStepOrderingAndStatuses() {
  logTest("Step ordering and status mapping", "Steps should stay sorted and keep timestamps as set.");
  await clearData();
  const journey = await createJourney({ title: "Ordering Journey", isStandard: true, slug: "ordering" });
  const o1 = await createOutline({ journeyId: journey.id, slug: "a", order: 1, title: "First" });
  const o2 = await createOutline({ journeyId: journey.id, slug: "b", order: 2, title: "Second" });
  const o3 = await createOutline({ journeyId: journey.id, slug: "c", order: 3, title: "Third" });
  const completedAt = new Date();

  await createStep({ journeyId: journey.id, sessionOutlineId: o1.id, order: 1, status: "completed", completedAt });
  await createStep({ journeyId: journey.id, sessionOutlineId: o2.id, order: 2, status: "unlocked", unlockedAt: new Date() });
  await createStep({ journeyId: journey.id, sessionOutlineId: o3.id, order: 3, status: "locked" });

  const result = await loadJourneyWithStepsBySlug(journey.slug, null);
  assert(result.status === "ok", "Journey should load for status test.");
  const steps = result.journey.steps;
  assert(steps.length === 3, "All three steps should be present.");
  assert(steps[0].order === 1 && steps[1].order === 2 && steps[2].order === 3, "Steps should stay ordered by order field.");
  assert(steps[0].status === "completed" && steps[0].completedAt, "Completed step keeps its timestamp.");
  assert(steps[1].status === "unlocked" && !steps[1].completedAt, "Unlocked step should not have completedAt.");
  assert(steps[2].status === "locked", "Locked step should still be locked.");
  logPass("Steps return sorted with the right status fields.");
}

// Test: Opening a step should create or reuse a chat and link it to the step.
async function testStepChatCreation() {
  logTest(
    "Step chat creation and reuse",
    "First call should create chat; second should reuse the same record."
  );
  await clearData();
  const user = await createUser("chat");
  const journey = await createJourney({
    title: "Chat Journey",
    isStandard: false,
    personalizedForUserId: user.id,
    slug: "chat-journey",
  });
  const outline = await createOutline({ journeyId: journey.id, slug: "chat-outline", order: 1, title: "Chat Step" });
  const step = await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const first = await getOrCreateStepChat(step.id, user.id);
  assert(first.status === "ok", "Chat should be created for unlocked step.");
  assert(first.chat.sessionOutlineId === outline.id, "Chat should point to the outline.");
  const stepAfterChat = await prisma.learningJourneyStep.findUnique({
    where: { id: step.id },
    include: { chats: true },
  });
  assert(
    stepAfterChat?.chats.some((linkedChat) => linkedChat.id === first.chat.id),
    "Step should store the chat id through the chats relation."
  );

  const second = await getOrCreateStepChat(step.id, user.id);
  const chatCount = await prisma.learningSessionChat.count({ where: { sessionOutlineId: outline.id } });
  assert(second.status === "ok" && second.chat.id === first.chat.id, "Chat should be reused on second call.");
  assert(chatCount === 1, "Only one chat row should exist for the step.");
  logPass("Step chat is created once and reused next time.");
}

// Test: Completing a step should mark it done and unlock the next one.
async function testCompletionUnlocksNextStep() {
  logTest(
    "Completion unlocks the next step",
    "Completing the first step should unlock the second and keep the third locked."
  );
  await clearData();
  const user = await createUser("complete");
  const journey = await createJourney({
    title: "Completion Journey",
    isStandard: false,
    personalizedForUserId: user.id,
    slug: "completion-journey",
  });
  const o1 = await createOutline({ journeyId: journey.id, slug: "one", order: 1, title: "One" });
  const o2 = await createOutline({ journeyId: journey.id, slug: "two", order: 2, title: "Two" });
  const o3 = await createOutline({ journeyId: journey.id, slug: "three", order: 3, title: "Three" });

  const s1 = await createStep({ journeyId: journey.id, sessionOutlineId: o1.id, order: 1, status: "unlocked" });
  const s2 = await createStep({ journeyId: journey.id, sessionOutlineId: o2.id, order: 2, status: "locked" });
  const s3 = await createStep({ journeyId: journey.id, sessionOutlineId: o3.id, order: 3, status: "locked" });

  const result = await completeStepAndUnlockNext(s1.id, user.id);
  assert(result.status === "ok", "Completion should succeed for unlocked step.");
  const refreshed = await prisma.learningJourneyStep.findMany({
    where: { journeyId: journey.id },
    orderBy: { order: "asc" },
  });
  const stepOne = refreshed[0];
  const stepTwo = refreshed[1];
  const stepThree = refreshed[2];

  assert(stepOne.status === "completed" && stepOne.completedAt, "First step should be marked completed.");
  assert(stepTwo.status === "unlocked" && stepTwo.unlockedAt, "Second step should unlock.");
  assert(stepThree.status === "locked", "Third step stays locked.");
  logPass("Completion marks the step and unlocks the next one.");
}

// Test: Completing an already completed step should be idempotent.
async function testCompletionIsIdempotent() {
  logTest(
    "Completion is idempotent",
    "Running completion twice should keep timestamps and statuses stable."
  );
  await clearData();
  const user = await createUser("idempotent");
  const journey = await createJourney({
    title: "Repeat Journey",
    isStandard: false,
    personalizedForUserId: user.id,
    slug: "repeat-journey",
  });
  const outline = await createOutline({ journeyId: journey.id, slug: "repeat-outline", order: 1, title: "Repeat Step" });
  const step = await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const first = await completeStepAndUnlockNext(step.id, user.id);
  assert(first.status === "ok", "First completion should succeed.");
  const firstCompletedAt = first.completedStep.completedAt;

  await new Promise((resolve) => setTimeout(resolve, 10));
  const second = await completeStepAndUnlockNext(step.id, user.id);
  assert(second.status === "ok", "Second completion should also report ok.");

  const refreshed = await prisma.learningJourneyStep.findUnique({ where: { id: step.id } });
  assert(refreshed.completedAt.getTime() === new Date(firstCompletedAt).getTime(), "completedAt should not change on repeat call.");
  logPass("Completion helper behaves the same on repeat calls.");
}

// Test: User cannot complete another user's personalized step.
async function testCompletionBlockedForOtherUser() {
  logTest(
    "Access control on completion",
    "Another user should get a forbidden result and no data should change."
  );
  await clearData();
  const owner = await createUser("owner-block");
  const other = await createUser("other-block");
  const journey = await createJourney({
    title: "Blocked Journey",
    isStandard: false,
    personalizedForUserId: owner.id,
    slug: "blocked-journey",
  });
  const outline = await createOutline({ journeyId: journey.id, slug: "block-outline", order: 1, title: "Block Step" });
  const step = await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const result = await completeStepAndUnlockNext(step.id, other.id);
  assert(result.status === "forbidden", "Other user should not be able to complete the step.");
  const refreshed = await prisma.learningJourneyStep.findUnique({ where: { id: step.id } });
  assert(refreshed.status === "unlocked" && !refreshed.completedAt, "Step should stay unchanged.");
  logPass("Forbidden completion attempt leaves the step untouched.");
}

// Test: Completion endpoint returns a nextUrl the frontend can use.
async function testCompletionEndpointResponse() {
  logTest(
    "Completion endpoint JSON",
    "API should respond with a nextUrl for redirect after success."
  );
  await clearData();
  const user = await createUser("api");
  const journey = await createJourney({
    title: "API Journey",
    isStandard: false,
    personalizedForUserId: user.id,
    slug: "api-journey",
  });
  const outline = await createOutline({ journeyId: journey.id, slug: "api-outline", order: 1, title: "API Step" });
  const step = await createStep({ journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" });

  const token = signUserToken(user.id);
  const request = new Request(`http://localhost/api/journeys/steps/${step.id}/complete`, {
    method: "POST",
    headers: { cookie: `${AUTH_COOKIE_NAME}=${token}` },
  });

  const response = await completeStepApi(request, { params: { stepId: step.id } });
  const payload = await response.json();
  assert(response.status === 200, "API should return 200 on success.");
  assert(payload.nextUrl === `/journeys/${journeySlugOrId(journey)}`, "API payload should carry the journey link.");
  logPass("Completion endpoint responds with nextUrl for redirect.");
}

main()
  .catch((error) => {
    console.error("\nFAIL:", error);
    process.exit(1);
  })
  .finally(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
    if (pool) {
      await pool.end();
    }
  });
