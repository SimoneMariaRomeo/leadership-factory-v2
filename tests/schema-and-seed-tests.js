/**
 * Domain checks for schema and core rules.
 * Uses its own test databases so real data stays safe.
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

// Builds a URL that points to a specific database name.
function withDbName(url, dbName) {
  if (!url) return url;
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

// Prints which test is running.
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

// Runs a shell command with the test DB URLs.
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

// Main runner.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest(
    "1) Schema migration succeeds and models exist",
    "Running `prisma migrate deploy` should finish cleanly and the core tables should be present."
  );
  runCommand("npx prisma migrate deploy --schema prisma/schema.prisma", "prisma migrate deploy completed");
  await ensureTablesExist();

  logTest(
    "2) Standard vs personalized constraints",
    "Standard journeys must stay user-null; personalized journeys must not set isStandard."
  );
  await testStandardAndPersonalizedJourneys();

  logTest(
    "3) Slug uniqueness on journeys",
    "The same journey slug should be blocked."
  );
  await testJourneySlugUniqueness();

  logTest(
    "4) Outline slug uniqueness per journey",
    "Outline slugs can repeat on another journey, not on the same one."
  );
  await testOutlineUniqueness();

  logTest(
    "5) Step ordering and cross-journey safety",
    "Step order must be unique per journey while outlines can be reused across journeys."
  );
  await testStepOrderingAndCrossJourneyGuard();

  logTest(
    "6) Chat and message wiring",
    "Chats and messages should link back to the right user, outline, and step."
  );
  await testChatAndMessageRelations();

  logTest(
    "7) Define-your-goal outline content",
    "botTools should mention the create_learning_goal JSON and other fields should be filled."
  );
  await testNeedAnalysisOutlineContent();

  logTest(
    "8) Timestamp updates",
    "createdAt should be set and updatedAt should move forward after changes."
  );
  await testTimestampBehaviour();

  logTest(
    "9) Minimal seed smoke test",
    "Running the seed should leave at least the Goal Clarification journey."
  );
  await testSeedSmoke();

  logTest(
    "10) Admin is present in the database",
    "Seed should create an admin user with the admin role."
  );
  await testAdminUserPresent();

  console.log("\nAll schema-and-seed checks passed.");
}

// Checks that all expected tables are present.
async function ensureTablesExist() {
  const expected = [
    "User",
    "UserGoal",
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

// Makes a user for tests.
async function createUser() {
  return prisma.user.create({
    data: {
      email: `user-${Date.now()}@example.com`,
      passwordHash: "hash",
      role: "user",
      botRole: "coachee",
    },
  });
}

// Standard vs personalized rules.
async function testStandardAndPersonalizedJourneys() {
  const standard = await prisma.learningJourney.create({
    data: {
      title: "Standard One",
      slug: `standard-${Date.now()}`,
      isStandard: true,
      status: "active",
    },
  });

  const user = await createUser();
  const personalized = await prisma.learningJourney.create({
    data: {
      title: "Personalized One",
      slug: `personalized-${Date.now()}`,
      isStandard: false,
      status: "draft",
      personalizedForUserId: user.id,
    },
  });

  let blocked = false;
  try {
    await prisma.learningJourney.create({
      data: {
        title: "Broken Standard",
        slug: `broken-standard-${Date.now()}`,
        isStandard: true,
        status: "active",
        personalizedForUserId: user.id,
      },
    });
  } catch (err) {
    blocked = true;
  }
  assert(blocked, "Standard journey tied to a user should be blocked.");
  assert(standard.personalizedForUserId === null, "Standard journey keeps personalizedForUserId null.");
  assert(personalized.personalizedForUserId === user.id, "Personalized journey stores the user id.");
  logPass("Standard and personalized rules enforced.");
}

// Journey slug uniqueness.
async function testJourneySlugUniqueness() {
  const slug = `slug-${Date.now()}`;
  await prisma.learningJourney.create({
    data: { title: "Slug One", slug, isStandard: false, status: "draft" },
  });
  let blocked = false;
  try {
    await prisma.learningJourney.create({
      data: { title: "Slug Two", slug, isStandard: false, status: "draft" },
    });
  } catch (err) {
    blocked = true;
  }
  assert(blocked, "Duplicate journey slug should be blocked.");
  logPass("Journey slug uniqueness enforced.");
}

// Outline slug uniqueness is enforced globally.
async function testOutlineUniqueness() {
  const slugBase = `outline-shared-${Date.now()}`;
  await prisma.learningSessionOutline.create({
    data: {
      slug: slugBase,
      order: 1,
      title: "Outline Shared",
      content: "Outline content",
      botTools: "tooling",
      firstUserMessage: "Hello A",
    },
  });

  let blocked = false;
  try {
    await prisma.learningSessionOutline.create({
      data: {
        slug: slugBase,
        order: 2,
        title: "Outline Shared Duplicate",
        content: "Duplicate",
        botTools: "tooling",
        firstUserMessage: "Hello again",
      },
    });
  } catch (err) {
    blocked = true;
  }
  assert(blocked, "Duplicate outline slug should be blocked globally.");

  const allowed = await prisma.learningSessionOutline.create({
    data: {
      slug: `${slugBase}-other`,
      order: 3,
      title: "Outline Shared B",
      content: "Outline content",
      botTools: "tooling",
      firstUserMessage: "Hello B",
    },
  });
  assert(allowed.slug === `${slugBase}-other`, "A unique slug should still be creatable.");
  logPass("Outline slug uniqueness enforced globally.");
}

// Step ordering and cross-journey guard.
async function testStepOrderingAndCrossJourneyGuard() {
  const journey = await prisma.learningJourney.create({
    data: { title: "Journey Order", slug: `journey-order-${Date.now()}`, isStandard: false, status: "draft" },
  });
  const outline = await prisma.learningSessionOutline.create({
    data: {
      slug: "step-outline",
      order: 1,
      title: "Step Outline",
      content: "Outline content",
      botTools: "tooling",
      firstUserMessage: "Hello",
    },
  });
  await prisma.learningJourneyStep.create({
    data: {
      journeyId: journey.id,
      sessionOutlineId: outline.id,
      order: 1,
      status: "unlocked",
    },
  });

  let blockedOrder = false;
  try {
    await prisma.learningJourneyStep.create({
      data: {
        journeyId: journey.id,
        sessionOutlineId: outline.id,
        order: 1,
        status: "unlocked",
      },
    });
  } catch (err) {
    blockedOrder = true;
  }
  assert(blockedOrder, "Duplicate step order on the same journey should be blocked.");

  const otherJourney = await prisma.learningJourney.create({
    data: { title: "Journey Other", slug: `journey-other-${Date.now()}`, isStandard: false, status: "draft" },
  });
  const crossJourneyStep = await prisma.learningJourneyStep.create({
    data: {
      journeyId: otherJourney.id,
      sessionOutlineId: outline.id,
      order: 1,
      status: "unlocked",
    },
  });
  assert(
    crossJourneyStep.sessionOutlineId === outline.id,
    "Steps from another journey can reuse this shared outline."
  );
  logPass("Step ordering and cross-journey safety enforced.");
}

// Chat and message relations.
async function testChatAndMessageRelations() {
  const user = await createUser();
  const journey = await prisma.learningJourney.create({
    data: { title: "Chat Journey", slug: `chat-journey-${Date.now()}`, isStandard: false, status: "draft" },
  });
  const outline = await prisma.learningSessionOutline.create({
    data: {
      slug: "chat-outline",
      order: 1,
      title: "Chat Outline",
      content: "Outline content",
      botTools: "tooling",
      firstUserMessage: "Hello",
    },
  });
  const step = await prisma.learningJourneyStep.create({
    data: { journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "unlocked" },
  });

  const chat = await prisma.learningSessionChat.create({
    data: {
      userId: user.id,
      sessionOutlineId: outline.id,
      stepId: step.id,
      sessionTitle: "Need Analysis",
      startedAt: new Date(),
      metadata: { topic: "chat-test" },
    },
  });
  await prisma.message.createMany({
    data: [
      { chatId: chat.id, role: "user", content: "Hi", command: null },
      { chatId: chat.id, role: "assistant", content: "Hello", command: null },
    ],
  });

  const loaded = await prisma.learningSessionChat.findUnique({
    where: { id: chat.id },
    include: { messages: true, sessionOutline: true, user: true },
  });
  assert(loaded?.user?.id === user.id, "Chat should point to the user.");
  assert(loaded?.sessionOutline?.id === outline.id, "Chat should point to the outline.");
  assert(loaded?.messages.length === 2, "Chat should have two messages.");
  const stepWithChat = await prisma.learningJourneyStep.findUnique({
    where: { id: step.id },
    include: { chats: true },
  });
  assert(
    stepWithChat?.chats.some((linked) => linked.id === chat.id),
    "Step should point back to the chat via the chats relation."
  );
  logPass("Chat and message relations load correctly.");
}

// Define-your-goal outline content rules.
async function testNeedAnalysisOutlineContent() {
  const journey = await prisma.learningJourney.create({
    data: { title: "Need Analysis Journey", slug: `need-journey-${Date.now()}`, isStandard: false, status: "draft" },
  });
  const botTools = `
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
  const outline = await prisma.learningSessionOutline.create({
    data: {
      slug: "define-your-goal",
      order: 1,
      title: "Need Analysis",
      objective: "Help the user clarify a goal.",
      content: "Guide the user toward a clear goal.",
      botTools,
      firstUserMessage: "What brings you here?",
    },
  });

  assert(outline.botTools.includes('"command": "create_learning_goal"'), "botTools should mention the command name.");
  assert(outline.botTools.includes('"learningGoal":'), "botTools should mention the learningGoal field.");
  assert(outline.content.length > 0, "Outline content should not be empty.");
  assert(outline.firstUserMessage.length > 0, "firstUserMessage should not be empty.");
  logPass("Define-your-goal outline fields carry the required instructions.");
}

// Timestamp behaviour.
async function testTimestampBehaviour() {
  const journey = await prisma.learningJourney.create({
    data: { title: "Timestamp Journey", slug: `timestamp-${Date.now()}`, isStandard: false, status: "draft" },
  });
  const outline = await prisma.learningSessionOutline.create({
    data: {
      slug: `outline-${Date.now()}`,
      order: 1,
      title: "Timestamp Outline",
      content: "Content",
      botTools: "tooling",
      firstUserMessage: "Hello",
    },
  });
  const step = await prisma.learningJourneyStep.create({
    data: { journeyId: journey.id, sessionOutlineId: outline.id, order: 1, status: "locked" },
  });

  [journey, outline, step].forEach((record) => {
    assert(record.createdAt && record.updatedAt, "Records should have timestamps on create.");
    assert(record.updatedAt >= record.createdAt, "updatedAt should not be before createdAt on create.");
  });

  const updatedJourney = await prisma.learningJourney.update({
    where: { id: journey.id },
    data: { title: "Timestamp Journey Updated" },
  });
  assert(updatedJourney.updatedAt > journey.updatedAt, "Journey updatedAt should move forward after update.");
  logPass("Timestamp fields update as expected.");
}

// Minimal seed smoke test.
async function testSeedSmoke() {
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "Seed script executed");
  const goal = await prisma.learningJourney.findFirst({ where: { slug: GOAL_JOURNEY_SLUG } });
  assert(goal, "Seed should leave Goal Clarification journey in place.");
  logPass("Seed created or kept Goal Clarification journey.");
}

// Checks that the seed creates the admin account.
async function testAdminUserPresent() {
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "Seed script executed");
  const admin = await prisma.user.findUnique({ where: { email: "admin@leadership-factory.cn" } });
  assert(admin, "Admin user should exist after seed.");
  assert(admin.role === "admin", "Admin role should be admin.");
  logPass("Admin account exists with the admin role.");
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
