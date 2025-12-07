// This script checks auth, DB writes, and emails for the goal commit endpoint.
const path = require("path");
const { execSync } = require("child_process");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// This registers Babel so TS files load cleanly in Node.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

const TEST_DB_NAME = process.env.GOAL_COMMIT_TEST_DB || "goal_commit_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;

const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, TEST_SHADOW_DB_NAME);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, "postgres");

process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;
process.env.NODE_ENV = "test";

const { AUTH_COOKIE_NAME, signUserToken } = require("../src/server/auth/session.ts");
const { POST } = require("../src/app/api/whats-next/route.ts");
const { setTestEmailSender } = require("../src/server/notifications/email.ts");

let pool;
let adapter;
let prisma;
let sentEmails = [];

// This builds a URL with the given database name.
function withDbName(url, dbName) {
  if (!url) return url;
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

// This prints the current test title.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
}

// This marks a passing check.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// This stops the run if something is off.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
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

// This makes a fresh test user with no goal yet.
async function createTestUser(emailOverride) {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return prisma.user.create({
    data: {
      email: emailOverride || `goal-test-${unique}@example.com`,
      passwordHash: "hash",
      role: "user",
      botRole: "coachee",
      learningGoal: null,
    },
  });
}

// This removes prior test users and personalized journeys.
async function clearTestData() {
  await prisma.learningJourney.deleteMany({ where: { isStandard: false } });
  await prisma.user.deleteMany({ where: { email: { startsWith: "goal-test-" } } });
}

// This builds an authenticated Request object with the session cookie set.
function buildAuthedRequest(body, userId) {
  const token = signUserToken(userId);
  return new Request("http://localhost/api/whats-next", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: `${AUTH_COOKIE_NAME}=${token}`,
    },
    body: JSON.stringify(body),
  });
}

// Main runner for the goal commit checks.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest("Prepare database for goal commit checks", "Migrations and seed should load for the dedicated DB.");
  runCommand("npx prisma migrate dev --schema prisma/schema.prisma", "prisma migrate dev completed");
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "seed script executed");

  setTestEmailSender(async (options) => {
    sentEmails.push(options);
  });

  await testUnauthenticatedCannotCommit();
  await testGoalCommitPersistsGoalAndTimestamp();
  await testGoalCommitCreatesPersonalizedJourney();
  await testRepeatCommitCreatesAdditionalJourneys();
  await testEmailsAreTriggeredWithCorrectPayload();
  await testEndpointIgnoresClientSuppliedUserId();

  console.log("\nGoal commit checks completed.");
}

// Test: unauthenticated user should not change anything.
async function testUnauthenticatedCannotCommit() {
  logTest(
    "Unauthenticated user cannot commit goal",
    "Request without a valid cookie should return 401 and not touch the DB."
  );
  await clearTestData();
  const user = await createTestUser();
  const beforeJourneys = await prisma.learningJourney.count({ where: { isStandard: false } });

  const request = new Request("http://localhost/api/whats-next", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learningGoal: "Test goal" }),
  });
  const response = await POST(request);
  assert(response.status === 401, "Status should be 401 for missing auth.");

  const afterUser = await prisma.user.findUnique({ where: { id: user.id } });
  assert(afterUser?.learningGoal === null, "User learningGoal should stay null.");
  const afterJourneys = await prisma.learningJourney.count({ where: { isStandard: false } });
  assert(afterJourneys === beforeJourneys, "No personalized journey should be created.");
  logPass("Unauthorized request was blocked and data stayed unchanged.");
}

// Test: commit should save goal text and timestamp.
async function testGoalCommitPersistsGoalAndTimestamp() {
  logTest(
    "Goal commit persists user goal and timestamp",
    "Authenticated request should save learningGoal and set learningGoalConfirmedAt."
  );
  await clearTestData();
  const user = await createTestUser();
  const startedAt = Date.now();

  const response = await POST(buildAuthedRequest({ learningGoal: "Improve my executive communication skills" }, user.id));
  const data = await response.json();
  assert(response.status === 200 && data?.success === true, "Response should be 200 with success true.");

  const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
  assert(
    updatedUser?.learningGoal === "Improve my executive communication skills",
    "learningGoal should match the submitted text."
  );
  assert(updatedUser?.learningGoalConfirmedAt, "learningGoalConfirmedAt should be set.");
  assert(
    updatedUser.learningGoalConfirmedAt.getTime() >= startedAt,
    "learningGoalConfirmedAt should be a recent timestamp."
  );
  logPass("User goal and confirmation time were saved.");
}

// Test: commit should create one personalized journey shell.
async function testGoalCommitCreatesPersonalizedJourney() {
  logTest(
    "Goal commit creates a personalized journey",
    "A new journey should be created for the user with awaiting_review status and no steps."
  );
  await clearTestData();
  const user = await createTestUser();

  const response = await POST(buildAuthedRequest({ learningGoal: "Grow as a clearer presenter" }, user.id));
  const data = await response.json();
  assert(response.status === 200 && data?.journeyId, "Response should include the new journey id.");

  const journeys = await prisma.learningJourney.findMany({
    where: { personalizedForUserId: user.id, isStandard: false },
  });
  assert(journeys.length === 1, "Exactly one personalized journey should exist.");
  const journey = journeys[0];
  assert(journey.userGoalSummary === "Grow as a clearer presenter", "userGoalSummary should mirror the goal.");
  assert(journey.status === "awaiting_review", "Journey status should be awaiting_review.");
  assert(journey.personalizedForUserId === user.id, "Journey should belong to the authenticated user.");
  const steps = await prisma.learningJourneyStep.findMany({ where: { journeyId: journey.id } });
  assert(steps.length === 0, "No steps should be created for the new journey yet.");
  logPass("Personalized journey shell was created correctly.");
}

// Test: repeat commits create multiple journeys and update goal each time.
async function testRepeatCommitCreatesAdditionalJourneys() {
  logTest(
    "Repeat commit creates additional journeys and updates the goal",
    "A second commit should add another journey and refresh the user fields."
  );
  await clearTestData();
  const user = await createTestUser();

  const firstResponse = await POST(buildAuthedRequest({ learningGoal: "First goal text" }, user.id));
  assert(firstResponse.status === 200, "First commit should return 200.");
  const afterFirstUser = await prisma.user.findUnique({ where: { id: user.id } });
  const firstConfirmedAt = afterFirstUser?.learningGoalConfirmedAt?.getTime() || 0;

  const secondResponse = await POST(buildAuthedRequest({ learningGoal: "Second goal text" }, user.id));
  assert(secondResponse.status === 200, "Second commit should return 200.");
  const afterSecondUser = await prisma.user.findUnique({ where: { id: user.id } });
  assert(afterSecondUser?.learningGoal === "Second goal text", "User goal should update to the latest text.");
  assert(
    (afterSecondUser?.learningGoalConfirmedAt?.getTime() || 0) >= firstConfirmedAt,
    "learningGoalConfirmedAt should move forward."
  );

  const journeys = await prisma.learningJourney.findMany({
    where: { personalizedForUserId: user.id, isStandard: false },
    orderBy: { createdAt: "asc" },
  });
  assert(journeys.length === 2, "Two personalized journeys should exist after two commits.");
  assert(journeys[0].userGoalSummary === "First goal text", "First journey should keep the first goal.");
  assert(journeys[1].userGoalSummary === "Second goal text", "Second journey should store the new goal.");
  logPass("Multiple commits created multiple journeys while keeping history.");
}

// Test: emails should be sent to user and admin via the mock sender.
async function testEmailsAreTriggeredWithCorrectPayload() {
  logTest(
    "Emails are triggered with correct payload",
    "Successful commit should send one email to the user and one to the admin."
  );
  await clearTestData();
  sentEmails = [];
  const user = await createTestUser("test@example.com");

  const response = await POST(buildAuthedRequest({ learningGoal: "Email test goal" }, user.id));
  const data = await response.json();
  assert(response.status === 200 && data?.success, "Commit should return success for email test.");

  assert(sentEmails.length === 2, "Two emails should be recorded by the mock sender.");
  const userEmail = sentEmails.find((mail) => mail.to === "test@example.com");
  assert(userEmail, "User email should be sent to the user address.");
  assert(userEmail.html.includes("Email test goal"), "User email body should include the goal text.");
  const adminEmail = sentEmails.find((mail) => mail.to === process.env.NOTIFICATION_EMAIL_TO);
  assert(adminEmail, "Admin email should be sent to NOTIFICATION_EMAIL_TO.");
  assert(adminEmail.html.includes("Email test goal"), "Admin email should include the goal text.");
  assert(adminEmail.html.includes(data.journeyId), "Admin email should mention the journey id.");
  logPass("Email mock captured user and admin notifications with the right details.");
}

// Test: backend should ignore any client-supplied userId and rely on the auth token.
async function testEndpointIgnoresClientSuppliedUserId() {
  logTest(
    "Endpoint ignores client-supplied userId",
    "Journey should belong to the authenticated user even if another id is passed in the body."
  );
  await clearTestData();
  const userA = await createTestUser("user-a@example.com");
  const userB = await createTestUser("user-b@example.com");

  const response = await POST(
    buildAuthedRequest({ learningGoal: "Only for user A", userId: userB.id }, userA.id)
  );
  assert(response.status === 200, "Commit should still return 200 when authed.");
  const journeysForA = await prisma.learningJourney.findMany({
    where: { personalizedForUserId: userA.id, isStandard: false },
  });
  const journeysForB = await prisma.learningJourney.findMany({
    where: { personalizedForUserId: userB.id, isStandard: false },
  });
  assert(journeysForA.length === 1, "Journey should be created for the authenticated user.");
  assert(journeysForB.length === 0, "No journey should be created for the other user.");
  const userARecord = await prisma.user.findUnique({ where: { id: userA.id } });
  const userBRecord = await prisma.user.findUnique({ where: { id: userB.id } });
  assert(userARecord?.learningGoal === "Only for user A", "User A goal should be updated.");
  assert(userBRecord?.learningGoal === null, "User B goal should stay untouched.");
  logPass("Endpoint derived the user solely from the auth cookie.");
}

// Drops and recreates the dedicated test databases so each run starts fresh.
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

main()
  .catch((error) => {
    console.error("\nTest run failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    setTestEmailSender(null);
    if (prisma) {
      await prisma.$disconnect();
    }
    if (pool) {
      await pool.end();
    }
  });
