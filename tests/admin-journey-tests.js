// This test file checks the admin journey and step behaviours with plain Node logs.
const path = require("path");
const { execSync } = require("child_process");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// This lets TS/TSX imports work inside the tests.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

const TEST_DB_NAME = process.env.ADMIN_JOURNEYS_TEST_DB || "admin_journey_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;
const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, TEST_SHADOW_DB_NAME);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, "postgres");
process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const { AdminValidationError } = require("../src/server/admin/sessions.ts");
const {
  addJourneyStep,
  createJourney,
  getJourneyDetail,
  listJourneys,
  reorderJourneySteps,
  updateJourney,
  updateJourneyStep,
} = require("../src/server/admin/journeys.ts");

let pool;
let adapter;
let prisma;

// This keeps the output readable.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(` - Expectation: ${expectation}`);
}

// This marks a passing sub-check.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// This halts the run on failure.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// This swaps a DB URL to use the test DB name.
function withDbName(url, dbName) {
  if (!url) return url;
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

// This runs CLI commands against the test DB env.
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

// This rebuilds the test databases from scratch.
async function resetTestDatabases() {
  await recreateDatabase(adminDatabaseUrl, TEST_DB_NAME);
  await recreateDatabase(shadowAdminDatabaseUrl, TEST_SHADOW_DB_NAME);
}

// This recreates one database using an admin connection.
async function recreateDatabase(adminUrl, dbName) {
  const adminPool = new Pool({ connectionString: adminUrl });
  await adminPool.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1`, [dbName]);
  await adminPool.query(`DROP DATABASE IF EXISTS "${dbName}"`);
  await adminPool.query(`CREATE DATABASE "${dbName}"`);
  await adminPool.end();
}

// This clears tables between tests.
async function clearData() {
  await prisma.$transaction([
    prisma.message.deleteMany(),
    prisma.learningSessionChat.deleteMany(),
    prisma.learningJourneyStep.deleteMany(),
    prisma.learningSessionOutline.deleteMany(),
    prisma.learningJourney.deleteMany(),
    prisma.user.deleteMany({ where: { email: { startsWith: "admin-journey-test-" } } }),
  ]);
}

// This seeds a user for personalized journeys.
async function seedUser(label) {
  return prisma.user.create({
    data: {
      email: `admin-journey-test-${label}-${Date.now()}@example.com`,
      passwordHash: "hash",
      role: "user",
      botRole: "coach",
    },
  });
}

// This seeds a session outline.
async function seedOutline(journeyId, slug, order = 1) {
  return prisma.learningSessionOutline.create({
    data: {
      journeyId,
      slug,
      order,
      live: true,
      title: `Outline ${slug}`,
      objective: "Guide the user",
      content: "Content body",
      botTools: "Bot tools here",
      firstUserMessage: "Hello",
    },
  });
}

async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest("Prepare database", "Migrations should run for admin journey tests.");
  runCommand("npx prisma migrate dev --schema prisma/schema.prisma", "prisma migrate dev completed");
  await clearData();

  await testJourneyFilters();
  await testEditJourneyFields();
  await testAssignPersonalizedUser();
  await testStepsAddEditReorder();
  await testNeedAnalysisLink();

  console.log("\nAdmin journey checks completed.");

  await prisma.$disconnect();
  await pool.end();
}

// This checks filters for standard flag, status, and user email.
async function testJourneyFilters() {
  logTest("admin-journey filters journeys by isStandard, status, and user email", "Filters should return matching journeys only.");
  await clearData();

  const user = await seedUser("filter");

  await prisma.learningJourney.create({
    data: {
      title: "Standard Active",
      slug: "std-active",
      isStandard: true,
      status: "active",
      objectives: [],
    },
  });

  await prisma.learningJourney.create({
    data: {
      title: "Personalized Draft",
      slug: "personal-draft",
      isStandard: false,
      personalizedForUserId: user.id,
      status: "draft",
      objectives: [],
    },
  });

  await prisma.learningJourney.create({
    data: {
      title: "Awaiting Review",
      slug: "awaiting",
      isStandard: false,
      status: "awaiting_review",
      objectives: [],
    },
  });

  const standard = await listJourneys({ isStandard: "standard", status: null, userEmail: null });
  assert(standard.length === 1 && standard[0].isStandard, "Standard filter should return only standard journeys.");

  const awaiting = await listJourneys({ isStandard: "all", status: "awaiting_review", userEmail: null });
  assert(awaiting.length === 1 && awaiting[0].status === "awaiting_review", "Status filter should return awaiting_review journeys.");

  const byEmail = await listJourneys({ isStandard: "all", status: null, userEmail: user.email });
  assert(byEmail.length === 1 && byEmail[0].personalizedForUser?.email === user.email, "Email filter should return the personalized journey.");

  logPass("Filters returned the right journeys.");
}

// This checks editing journey fields and slug lock when active.
async function testEditJourneyFields() {
  logTest("admin-journey edits journey fields", "Objectives should map to JSON and slug should lock when active.");
  await clearData();

  const journey = await createJourney({
    title: "Draft Journey",
    slug: "draft-journey",
    intro: "Old intro",
    objectivesText: "Old objective",
    isStandard: false,
    status: "draft",
  });

  const updated = await updateJourney(journey.id, {
    title: "New Title",
    slug: "fresh-slug",
    intro: "New intro copy",
    objectivesText: "First line\nSecond line",
    isStandard: false,
    userGoalSummary: "User goal note",
    status: "awaiting_review",
  });

  assert(updated.title === "New Title", "Title should update.");
  assert(Array.isArray(updated.objectives) && updated.objectives.length === 2, "Objectives should split into array.");
  assert(updated.slug === "fresh-slug", "Slug should update before activation.");

  await updateJourney(journey.id, { status: "active" });

  let slugLocked = false;
  try {
    await updateJourney(journey.id, { slug: "cant-change" });
  } catch (error) {
    slugLocked = error instanceof AdminValidationError;
  }
  assert(slugLocked, "Slug change should be blocked once active.");

  logPass("Journey fields updated and slug lock confirmed.");
}

// This checks assigning and blocking personalized user rules.
async function testAssignPersonalizedUser() {
  logTest("admin-journey assigns personalized user and blocks standard toggle with user", "Personalized journeys should set user and block standard when user is present.");
  await clearData();

  const userOne = await seedUser("one");
  const userTwo = await seedUser("two");

  const journey = await createJourney({
    title: "Personal Journey",
    slug: "personal",
    isStandard: false,
    status: "draft",
  });

  const assigned = await updateJourney(journey.id, {
    personalizedUserEmail: userOne.email,
    isStandard: false,
  });

  const dbJourney = await prisma.learningJourney.findUnique({ where: { id: assigned.id } });
  assert(dbJourney?.personalizedForUserId === userOne.id, "Journey should link to the personalized user.");

  const reassigned = await updateJourney(journey.id, {
    personalizedUserEmail: userTwo.email,
    isStandard: false,
  });
  assert(reassigned.personalizedForUser?.id === userTwo.id, "Journey should allow switching personalized user.");

  let blocked = false;
  try {
    await updateJourney(journey.id, { isStandard: true });
  } catch (error) {
    blocked = error instanceof AdminValidationError;
  }
  assert(blocked, "Making a personalized journey standard without clearing user should fail.");

  logPass("Personalized user logic works as expected.");
}

// This checks adding steps, editing, and reordering.
async function testStepsAddEditReorder() {
  logTest("admin-journey add, edit, and reorder steps", "Steps should add with order, save edits, and reorder properly.");
  await clearData();

  const journey = await createJourney({
    title: "Step Journey",
    slug: "step-journey",
    isStandard: false,
    status: "draft",
  });

  const outlineA = await seedOutline(journey.id, "outline-a", 1);
  const outlineB = await seedOutline(journey.id, "outline-b", 2);

  const stepOne = await addJourneyStep(journey.id, outlineA.id);
  assert(stepOne.order === 1, "First step should have order 1.");

  const savedStep = await updateJourneyStep(stepOne.id, { ahaText: "Great insight", status: "unlocked" });
  assert(savedStep.ahaText === "Great insight" && savedStep.status === "unlocked", "Step fields should update.");

  const stepTwo = await addJourneyStep(journey.id, outlineB.id);
  assert(stepTwo.order === 2, "Second step should have order 2.");

  const reordered = await reorderJourneySteps(journey.id, [stepTwo.id, stepOne.id]);
  assert(reordered[0].id === stepTwo.id && reordered[0].order === 1, "Order should swap after reorder.");

  const refreshed = await getJourneyDetail(journey.id);
  assert(refreshed.steps[0].id === stepTwo.id, "Reloaded journey should show new order.");

  logPass("Steps add, edit, and reorder correctly.");
}

// This checks need-analysis chat link data is present.
async function testNeedAnalysisLink() {
  logTest("admin-journey need-analysis chat link available", "Journey detail should expose chat id for need-analysis step.");
  await clearData();

  const journey = await createJourney({
    title: "Need Analysis",
    slug: "need-journey",
    isStandard: false,
    status: "draft",
  });

  const needOutline = await seedOutline(journey.id, "need-analysis", 1);
  const chat = await prisma.learningSessionChat.create({
    data: {
      sessionOutlineId: needOutline.id,
      sessionTitle: "Need Analysis",
      startedAt: new Date(),
      lastMessageAt: new Date(),
    },
  });

  await prisma.learningJourneyStep.create({
    data: {
      journeyId: journey.id,
      sessionOutlineId: needOutline.id,
      order: 1,
      status: "unlocked",
      chatId: chat.id,
    },
  });

  const detail = await getJourneyDetail(journey.id);
  const needStep = detail.steps.find((step) => step.sessionOutline.slug === "need-analysis");
  assert(needStep && needStep.chatId === chat.id, "Need-analysis step should carry chat id.");

  logPass("Need-analysis chat id is available for the admin link.");
}

main().catch((error) => {
  console.error("\nAdmin journey tests failed:", error);
  if (prisma) prisma.$disconnect();
  if (pool) pool.end();
  process.exit(1);
});
