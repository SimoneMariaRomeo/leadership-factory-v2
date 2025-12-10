// This test file checks the admin session outline behaviours with plain Node logs.
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

const TEST_DB_NAME = process.env.ADMIN_SESSIONS_TEST_DB || "admin_sessions_tests";
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
  AdminValidationError,
  createSessionOutline,
  deleteSessionOutline,
  listSessionOutlines,
  updateSessionOutline,
} = require("../src/server/admin/sessions.ts");

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

// This stops the run when a must-have fails.
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
    prisma.user.deleteMany({ where: { email: { startsWith: "admin-session-test-" } } }),
  ]);
}

// This seeds a journey with a short title.
async function seedJourney(label, isStandard = false) {
  return prisma.learningJourney.create({
    data: {
      title: `Journey ${label}`,
      intro: `${label} intro`,
      slug: `journey-${label}-${Date.now()}`,
      isStandard,
      status: "draft",
      objectives: [],
    },
  });
}

// This seeds a simple outline.
async function seedOutline(journeyId, slug, live = false, order = 1) {
  return prisma.learningSessionOutline.create({
    data: {
      journeyId,
      slug,
      order,
      live,
      title: `Outline ${slug}`,
      objective: "Help the user",
      content: "Talk kindly.",
      botTools: "Use JSON when asked.",
      firstUserMessage: "Hi there",
    },
  });
}

async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest("Prepare database", "Migrations should run for admin sessions tests.");
  runCommand("npx prisma migrate dev --schema prisma/schema.prisma", "prisma migrate dev completed");
  await clearData();

  await testListAndFilterOutlines();
  await testCreateLargeOutline();
  await testEditOutlineFields();
  await testDeleteOutlineRules();

  console.log("\nAdmin sessions checks completed.");

  await prisma.$disconnect();
  await pool.end();
}

// This checks list filters for journey and live flag.
async function testListAndFilterOutlines() {
  logTest("admin-sessions lists outlines by journey and live status", "Filters should respect journey and live only options.");
  await clearData();

  const journeyA = await seedJourney("A");
  const journeyB = await seedJourney("B");

  await seedOutline(journeyA.id, "alpha-live", true, 1);
  await seedOutline(journeyA.id, "alpha-hidden", false, 2);
  await seedOutline(journeyB.id, "beta-live", true, 1);

  const onlyA = await listSessionOutlines({ journeyId: journeyA.id, live: "all" });
  assert(onlyA.length === 2, "Journey A should return two outlines.");
  assert(onlyA.every((item) => item.journeyId === journeyA.id), "All outlines should belong to journey A.");

  const liveOnly = await listSessionOutlines({ journeyId: journeyA.id, live: "live" });
  assert(liveOnly.length === 1 && liveOnly[0].live === true, "Live filter should return only live outlines.");

  logPass("Filters returned the right outlines.");
}

// This checks creating a big outline and slug uniqueness.
async function testCreateLargeOutline() {
  logTest("admin-sessions creates outline with large content and botTools", "Content and tools should persist and slug stays unique.");
  await clearData();
  const journey = await seedJourney("create");

  const longContent = `Line one\nLine two\n${"More text ".repeat(20)}`;
  const longTools = `Tool line 1\nTool line 2\n${"Call JSON ".repeat(10)}`;

  const outline = await createSessionOutline({
    journeyId: journey.id,
    title: "Deep Outline",
    slug: "deep-outline",
    content: longContent,
    botTools: longTools,
    firstUserMessage: "Start now",
    live: false,
    objective: "Do the work",
  });

  const stored = await prisma.learningSessionOutline.findUnique({ where: { id: outline.id } });
  assert(stored?.content === longContent, "Content should match input.");
  assert(stored?.botTools === longTools, "Bot tools should match input.");

  let duplicateFailed = false;
  try {
    await createSessionOutline({
      journeyId: journey.id,
      title: "Copy",
      slug: "deep-outline",
      content: "x",
      botTools: "y",
      firstUserMessage: "z",
    });
  } catch (error) {
    duplicateFailed = error instanceof AdminValidationError;
  }
  assert(duplicateFailed, "Duplicate slug should be blocked.");

  logPass("Created outline keeps big fields and blocks duplicate slug.");
}

// This checks editing fields including slug.
async function testEditOutlineFields() {
  logTest("admin-sessions edits fields including slug", "All fields should update and duplicate slug is blocked.");
  await clearData();
  const journey = await seedJourney("edit");
  const outline = await seedOutline(journey.id, "editable", false, 1);
  await seedOutline(journey.id, "other", false, 2);

  const updated = await updateSessionOutline(outline.id, {
    title: "Updated Title",
    slug: "edited-slug",
    live: true,
    objective: "New objective",
    content: "New content block",
    botTools: "New tools block",
    firstUserMessage: "Hello again",
  });

  assert(updated.title === "Updated Title", "Title should update.");
  assert(updated.slug === "edited-slug", "Slug should update.");
  assert(updated.live === true, "Live flag should update.");
  assert(updated.objective === "New objective", "Objective should update.");
  assert(updated.content === "New content block", "Content should update.");
  assert(updated.botTools === "New tools block", "Bot tools should update.");
  assert(updated.firstUserMessage === "Hello again", "First user message should update.");

  let duplicateSlugBlocked = false;
  try {
    await updateSessionOutline(outline.id, { slug: "other" });
  } catch (error) {
    duplicateSlugBlocked = error instanceof AdminValidationError;
  }
  assert(duplicateSlugBlocked, "Updating to a duplicate slug should fail.");

  logPass("Edits saved and slug uniqueness enforced.");
}

// This checks delete behaviour with and without steps.
async function testDeleteOutlineRules() {
  logTest("admin-sessions delete outline with and without steps", "Steps should be removed when outline is deleted.");
  await clearData();
  const journey = await seedJourney("delete");

  // Case A: no steps
  const outlineSolo = await seedOutline(journey.id, "solo", false, 1);
  await deleteSessionOutline(outlineSolo.id);
  const soloGone = await prisma.learningSessionOutline.findUnique({ where: { id: outlineSolo.id } });
  assert(!soloGone, "Outline without steps should be removed.");

  // Case B: with steps
  const outlineWithSteps = await seedOutline(journey.id, "with-steps", false, 2);
  await prisma.learningJourneyStep.create({
    data: {
      journeyId: journey.id,
      sessionOutlineId: outlineWithSteps.id,
      order: 1,
      status: "locked",
    },
  });

  await deleteSessionOutline(outlineWithSteps.id);
  const outlineGone = await prisma.learningSessionOutline.findUnique({ where: { id: outlineWithSteps.id } });
  const stepsGone = await prisma.learningJourneyStep.count({ where: { sessionOutlineId: outlineWithSteps.id } });
  assert(!outlineGone, "Outline with steps should be removed.");
  assert(stepsGone === 0, "Related steps should be deleted too.");

  logPass("Delete rules cleaned up outlines and steps.");
}

main().catch((error) => {
  console.error("\nAdmin sessions tests failed:", error);
  if (prisma) prisma.$disconnect();
  if (pool) pool.end();
  process.exit(1);
});
