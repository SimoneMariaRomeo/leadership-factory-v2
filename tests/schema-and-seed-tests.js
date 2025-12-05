/**
 * Simple checks to confirm the database shape and seed data.
 * Uses its own test databases so it does not touch real data.
 */
const path = require("path");
const { execSync } = require("child_process");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient, Prisma } = require("../generated/prisma");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const TEST_DB_NAME = process.env.SCHEMA_AND_SEED_TEST_DB || "schema_and_seed_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;
const GOAL_JOURNEY_SLUG = "goal-clarification";
const NEED_ANALYSIS_SLUG = "need-analysis";

const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(
  process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL,
  TEST_SHADOW_DB_NAME
);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(
  process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL,
  "postgres"
);

process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;

let pool;
let adapter;
let prisma;

// Points the Postgres URL at a specific database name.
function withDbName(url, dbName) {
  if (!url) return url;
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

// Prints what the test is about.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
}

// Marks a passing step.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// Simple assertion helper.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Runs a shell command with the test schema URLs.
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

// Runs all schema and seed tests in order.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest(
    "1) Schema migration succeeds and models exist",
    "Running `prisma migrate dev` should finish cleanly and the core tables should be present."
  );
  runCommand("npx prisma migrate dev --schema prisma/schema.prisma", "prisma migrate dev completed");
  await ensureTablesExist();

  logTest(
    "2) Seed creates exactly one Goal Clarification journey",
    "Seeding should insert a single standard journey with the expected title, slug, status, and null personalized user."
  );
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "Seed script executed");
  const goalJourney = await fetchGoalJourney();

  logTest(
    "3) Standard journey visibility invariants",
    "A standard journey keeps personalizedForUserId null, and attempts to set it while isStandard=true must be rejected."
  );
  assert(goalJourney.isStandard === true && goalJourney.personalizedForUserId === null, "Seeded standard journey must not be tied to a user.");
  await expectStandardJourneyConstraint();

  logTest(
    "4) Need-analysis outline exists and is linked to Goal Clarification",
    "The seed should create one outline with slug need-analysis attached to the Goal Clarification journey."
  );
  const needAnalysisOutline = await fetchNeedAnalysisOutline(goalJourney.id);

  logTest(
    "5) Need-analysis outline fields match spec",
    "The outline must carry objective, content, botTools with the create_learning_goal JSON instruction, and a first user message."
  );
  validateNeedAnalysisFields(needAnalysisOutline);

  logTest(
    "6) Need-analysis step exists and is correctly wired",
    "There should be one unlocked step wired to the need-analysis outline, with chatId still null."
  );
  const needAnalysisStep = await fetchNeedAnalysisStep(goalJourney.id, needAnalysisOutline.id);

  logTest(
    "7) Journey outlines and steps relations work",
    "Including outlines and steps on the journey should return the need-analysis outline and step, and relations should resolve."
  );
  await validateJourneyRelations(goalJourney.id, needAnalysisOutline.id, needAnalysisStep.id);

  logTest(
    "8) LearningSessionOutline slug uniqueness per journey",
    "Creating another outline with the same slug for the same journey should fail, while reusing the slug on a different journey should succeed."
  );
  await validateOutlineUniqueness(goalJourney.id);

  logTest(
    "9) LearningJourney.slug uniqueness",
    "A duplicate slug goal-clarification must be rejected, while a new slug should be accepted."
  );
  await validateJourneySlugUniqueness();

  logTest(
    "10) Defaults and timestamps",
    "Seeded records and newly created records should have createdAt/updatedAt set, and updatedAt should move forward on updates."
  );
  await validateTimestamps(goalJourney.id, needAnalysisOutline.id, needAnalysisStep.id);

  console.log("\nAll schema-and-seed checks passed.");
}

// Checks that all expected tables are present.
async function ensureTablesExist() {
  const expected = [
    "User",
    "LearningSessionChat",
    "Message",
    "LearningJourney",
    "LearningSessionOutline",
    "LearningJourneyStep",
  ];
  const rows = await prisma.$queryRaw(
    Prisma.sql`SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_name IN (${Prisma.join(
      expected
    )})`
  );
  const found = rows.map((row) => row.table_name);
  assert(found.length === expected.length, `Expected tables ${expected.join(", ")}, found ${found.join(", ")}.`);
  logPass("All expected tables are present after migration.");
}

// Drops and recreates the dedicated test databases so each run starts clean.
async function resetTestDatabases() {
  await recreateDatabase(adminDatabaseUrl, TEST_DB_NAME);
  await recreateDatabase(shadowAdminDatabaseUrl, TEST_SHADOW_DB_NAME);
}

// Drops and recreates a single database using an admin connection.
async function recreateDatabase(adminUrl, dbName) {
  const adminPool = new Pool({ connectionString: adminUrl });
  await adminPool.query(`SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1`, [dbName]);
  await adminPool.query(`DROP DATABASE IF EXISTS "${dbName}"`);
  await adminPool.query(`CREATE DATABASE "${dbName}"`);
  await adminPool.end();
}

// Fetches the seeded Goal Clarification journey and checks its flags.
async function fetchGoalJourney() {
  const journeys = await prisma.learningJourney.findMany({
    where: { slug: GOAL_JOURNEY_SLUG },
  });
  assert(journeys.length === 1, `Expected exactly one Goal Clarification journey, found ${journeys.length}.`);
  const journey = journeys[0];
  assert(journey.title === "Goal Clarification", "Seeded journey should be titled 'Goal Clarification'.");
  assert(journey.isStandard === true, "Seeded journey should be marked as standard.");
  assert(journey.status === "active", "Seeded journey should be active.");
  assert(journey.personalizedForUserId === null, "Standard journey should not be linked to a user.");
  logPass("Goal Clarification journey exists with the expected flags.");
  return journey;
}

// Ensures a standard journey cannot point to a user.
async function expectStandardJourneyConstraint() {
  let errorCaught = false;
  try {
    await prisma.learningJourney.create({
      data: {
        title: "Invalid Standard Journey",
        slug: `goal-clarification-invalid-${Date.now()}`,
        isStandard: true,
        personalizedForUserId: "fake-user-id",
        status: "active",
      },
    });
  } catch (error) {
    errorCaught = true;
    logPass("Standard journey tied to a user was rejected as expected.");
  }
  assert(errorCaught, "Creating a standard journey with personalizedForUserId should fail.");
}

// Fetches the need-analysis outline.
async function fetchNeedAnalysisOutline(journeyId) {
  const outline = await prisma.learningSessionOutline.findUnique({
    where: { journeyId_slug: { journeyId, slug: NEED_ANALYSIS_SLUG } },
    include: { journey: true },
  });
  assert(outline, "Need-analysis outline should exist.");
  assert(outline.journeyId === journeyId, "Need-analysis outline should belong to Goal Clarification.");
  logPass("Need-analysis outline exists and points to the correct journey.");
  return outline;
}

// Checks that the outline fields carry the required text.
function validateNeedAnalysisFields(outline) {
  assert(outline.objective && outline.objective.length > 0, "Outline objective should be set.");
  assert(outline.content && outline.content.length > 0, "Outline content should be set.");
  assert(outline.botTools.includes('"command": "create_learning_goal"'), "botTools must mention the create_learning_goal JSON command.");
  assert(outline.botTools.includes('"learningGoal":'), "botTools must include the learningGoal field description.");
  assert(outline.firstUserMessage && outline.firstUserMessage.length > 0, "firstUserMessage should be set.");
  logPass("Need-analysis outline fields match the expected spec.");
}

// Finds the seed step tied to the need-analysis outline.
async function fetchNeedAnalysisStep(journeyId, sessionOutlineId) {
  const steps = await prisma.learningJourneyStep.findMany({
    where: { journeyId, sessionOutlineId },
  });
  assert(steps.length === 1, `Expected one need-analysis step, found ${steps.length}.`);
  const step = steps[0];
  assert(step.order === 1, "Need-analysis step should be the first item in the journey.");
  assert(step.status === "unlocked", "Need-analysis step should be unlocked in the template.");
  assert(step.chatId === null, "Need-analysis step should not have a chatId yet.");
  logPass("Need-analysis step exists and is wired to the outline.");
  return step;
}

// Confirms journey includes outline and step, and relations resolve.
async function validateJourneyRelations(journeyId, outlineId, stepId) {
  const journeyWithRelations = await prisma.learningJourney.findUnique({
    where: { id: journeyId },
    include: { outlines: true, steps: true },
  });
  const hasOutline = journeyWithRelations.outlines.some((outline) => outline.id === outlineId);
  const hasStep = journeyWithRelations.steps.some((step) => step.id === stepId);
  assert(hasOutline, "Journey should include the need-analysis outline.");
  assert(hasStep, "Journey should include the need-analysis step.");

  const step = await prisma.learningJourneyStep.findUnique({
    where: { id: stepId },
    include: { sessionOutline: true },
  });
  assert(step.sessionOutline?.id === outlineId, "LearningJourneyStep.sessionOutline should resolve correctly.");
  assert(step.sessionOutline.journeyId === journeyId, "Session outline back-reference to journey should resolve.");
  logPass("Journey relations (outlines, steps, and back-references) resolve correctly.");
}

// Checks slug uniqueness per journey and across journeys.
async function validateOutlineUniqueness(journeyId) {
  let uniqueErrorCaught = false;
  try {
    await prisma.learningSessionOutline.create({
      data: {
        journeyId,
        slug: NEED_ANALYSIS_SLUG,
        order: 2,
        live: false,
        title: "Duplicate Need Analysis",
        objective: "Test duplicate slug handling",
        content: "This should never persist because of the composite unique constraint.",
        botTools: "noop",
        firstUserMessage: "noop",
      },
    });
  } catch (error) {
    uniqueErrorCaught = true;
    logPass("Duplicate need-analysis outline on the same journey was blocked.");
  }
  assert(uniqueErrorCaught, "Composite unique constraint on journeyId + slug should block duplicates.");

  const otherJourney = await prisma.learningJourney.create({
    data: {
      title: "Another Journey",
      slug: `journey-${Date.now()}`,
      isStandard: false,
      status: "draft",
    },
  });
  const outline = await prisma.learningSessionOutline.create({
    data: {
      journeyId: otherJourney.id,
      slug: NEED_ANALYSIS_SLUG,
      order: 1,
      live: false,
      title: "Need Analysis",
      content: "Valid outline on a different journey.",
      botTools: "ok",
      firstUserMessage: "hello",
    },
  });
  assert(outline.journeyId === otherJourney.id, "Outline with duplicate slug on a different journey should succeed.");
  logPass("Reusing the slug on a different journey works as expected.");

  await prisma.learningSessionOutline.delete({ where: { id: outline.id } });
  await prisma.learningJourney.delete({ where: { id: otherJourney.id } });
}

// Checks uniqueness of journey slug.
async function validateJourneySlugUniqueness() {
  let slugErrorCaught = false;
  try {
    await prisma.learningJourney.create({
      data: {
        title: "Duplicate Goal Clarification",
        slug: GOAL_JOURNEY_SLUG,
        isStandard: true,
        status: "active",
      },
    });
  } catch (error) {
    slugErrorCaught = true;
    logPass("Duplicate journey slug was rejected by the unique constraint.");
  }
  assert(slugErrorCaught, "Unique constraint on journey slug should block duplicates.");

  const uniqueSlug = `journey-unique-${Date.now()}`;
  const created = await prisma.learningJourney.create({
    data: {
      title: "Unique Journey",
      slug: uniqueSlug,
      isStandard: false,
      status: "draft",
    },
  });
  assert(created.slug === uniqueSlug, "New journey with a unique slug should be created.");
  logPass("Unique journey slug is accepted.");
  await prisma.learningJourney.delete({ where: { id: created.id } });
}

// Checks default timestamps and that updatedAt moves forward.
async function validateTimestamps(goalJourneyId, outlineId, stepId) {
  const seededJourney = await prisma.learningJourney.findUnique({ where: { id: goalJourneyId } });
  const seededOutline = await prisma.learningSessionOutline.findUnique({ where: { id: outlineId } });
  const seededStep = await prisma.learningJourneyStep.findUnique({ where: { id: stepId } });

  [seededJourney, seededOutline, seededStep].forEach((record, idx) => {
    const label = ["journey", "outline", "step"][idx];
    assert(record.createdAt && record.updatedAt, `Seeded ${label} should have timestamps.`);
    assert(record.updatedAt >= record.createdAt, `Seeded ${label} updatedAt should not precede createdAt.`);
  });

  const timeSlug = `timestamps-${Date.now()}`;
  const tempJourney = await prisma.learningJourney.create({
    data: {
      title: "Timestamp Journey",
      slug: timeSlug,
      isStandard: false,
      status: "draft",
    },
  });
  const tempOutline = await prisma.learningSessionOutline.create({
    data: {
      journeyId: tempJourney.id,
      slug: `outline-${timeSlug}`,
      order: 1,
      live: false,
      title: "Timestamp Outline",
      content: "Checking createdAt defaults.",
      botTools: "test",
      firstUserMessage: "Hi",
    },
  });
  const tempStep = await prisma.learningJourneyStep.create({
    data: {
      journeyId: tempJourney.id,
      sessionOutlineId: tempOutline.id,
      order: 1,
      status: "locked",
    },
  });

  assert(tempJourney.createdAt <= tempJourney.updatedAt, "Journey timestamps should be set on create.");
  assert(tempOutline.createdAt <= tempOutline.updatedAt, "Outline timestamps should be set on create.");
  assert(tempStep.createdAt <= tempStep.updatedAt, "Step timestamps should be set on create.");

  const updatedJourney = await prisma.learningJourney.update({
    where: { id: tempJourney.id },
    data: { title: "Timestamp Journey Updated" },
  });
  const updatedOutline = await prisma.learningSessionOutline.update({
    where: { id: tempOutline.id },
    data: { title: "Timestamp Outline Updated" },
  });
  const updatedStep = await prisma.learningJourneyStep.update({
    where: { id: tempStep.id },
    data: { status: "unlocked" },
  });

  assert(updatedJourney.updatedAt >= tempJourney.updatedAt, "Journey updatedAt should move forward on update.");
  assert(updatedOutline.updatedAt >= tempOutline.updatedAt, "Outline updatedAt should move forward on update.");
  assert(updatedStep.updatedAt >= tempStep.updatedAt, "Step updatedAt should move forward on update.");
  logPass("createdAt defaults and updatedAt auto-updates behave correctly.");

  await prisma.learningJourneyStep.delete({ where: { id: tempStep.id } });
  await prisma.learningSessionOutline.delete({ where: { id: tempOutline.id } });
  await prisma.learningJourney.delete({ where: { id: tempJourney.id } });
}

main()
  .catch((error) => {
    console.error("\nTest run failed:", error);
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

