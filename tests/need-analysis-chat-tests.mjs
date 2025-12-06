// This script checks the need-analysis chat flow and JSON command handling.
import path from "path";
import { createRequire } from "module";
import { execSync } from "child_process";
import { Pool } from "pg";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// This registers Babel so TS/TSX files can be imported in this Node script.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

const TEST_DB_NAME = process.env.NEED_ANALYSIS_CHAT_TEST_DB || "need_analysis_chat_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;
const GOAL_JOURNEY_SLUG = "goal-clarification";
const NEED_OUTLINE_SLUG = "need-analysis";

const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, TEST_SHADOW_DB_NAME);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, "postgres");

process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;
process.env.DEFAULT_API = "fake";

const { handleChat } = require("../src/server/chat/handleChat.ts");
const { POST } = require("../src/app/api/chat/route.ts");

let pool;
let adapter;
let prisma;

// This builds a URL pointing at a specific DB.
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

// This runs all the Step 3 chat checks in order.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest(
    "Prepare database for chat checks",
    "Migrations and seeds should run cleanly on the dedicated test database."
  );
  runCommand("npx prisma migrate dev --schema prisma/schema.prisma", "prisma migrate dev completed");
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "seed script executed");

  const { journey, outline, step } = await testNeedAnalysisRoute();
  await testHandleChatCreatesAndReusesChat(outline.id, step.id);
  await testPromptConstruction(outline.id, step.id);
  await testJsonCommandStorage(outline.id, step.id);
  await testApiPostRoundtrip(outline.id, step.id);

  console.log("\nNeed-analysis chat checks completed.");
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

// Checks that the need-analysis outline and step are wired correctly.
async function testNeedAnalysisRoute() {
  logTest(
    "[Chat] Need-analysis route loads correct outline and step",
    "The goal-clarification journey should include the need-analysis outline and step."
  );

  const journey = await prisma.learningJourney.findFirst({
    where: { slug: GOAL_JOURNEY_SLUG },
  });
  assert(journey, "Goal Clarification journey should exist.");

  const outline = await prisma.learningSessionOutline.findFirst({
    where: { slug: NEED_OUTLINE_SLUG, journeyId: journey.id },
  });
  assert(outline, "Need-analysis outline should exist on the journey.");

  const step = await prisma.learningJourneyStep.findFirst({
    where: { sessionOutlineId: outline.id, journeyId: journey.id },
  });
  assert(step, "Need-analysis step should point to the outline.");
  assert(step.sessionOutlineId === outline.id, "Step should store the outline id.");
  assert(outline.objective && outline.objective.length > 0, "Outline objective should not be empty.");
  assert(outline.content && outline.content.length > 0, "Outline content should not be empty.");
  assert(outline.botTools && outline.botTools.includes('"command": "create_learning_goal"'), "botTools should mention create_learning_goal.");
  assert(outline.firstUserMessage && outline.firstUserMessage.length > 0, "firstUserMessage should be present.");
  logPass("Need-analysis outline and step look correct.");

  return { journey, outline, step };
}

// Ensures handleChat creates one chat and reuses it.
async function testHandleChatCreatesAndReusesChat(sessionOutlineId, journeyStepId) {
  logTest(
    "[Chat] handleChat creates and reuses LearningSessionChat records",
    "First call should create a chat, second call should reuse it and append messages."
  );

  const fakeModel = async () => "Hello, this is a test reply.";
  const first = await handleChat({
    userId: null,
    sessionOutlineId,
    journeyStepId,
    chatId: null,
    messages: [{ role: "user", content: "Hi, I'd like to improve my communication." }],
    callChatModel: fakeModel,
  });

  assert(first.chatId && first.chatId.length > 0, "First call should return a chatId.");
  const chatRow = await prisma.learningSessionChat.findUnique({ where: { id: first.chatId } });
  assert(chatRow?.sessionOutlineId === sessionOutlineId, "Chat should store the outline id.");
  const messagesAfterFirst = await prisma.message.findMany({
    where: { chatId: first.chatId },
    orderBy: { createdAt: "asc" },
  });
  assert(messagesAfterFirst.length === 2, "First call should store one user and one assistant message.");

  const second = await handleChat({
    userId: null,
    sessionOutlineId,
    journeyStepId,
    chatId: first.chatId,
    messages: [
      { role: "user", content: "Hi, I'd like to improve my communication." },
      { role: "assistant", content: "Hello, this is a test reply." },
      { role: "user", content: "And I want to lead meetings better." },
    ],
    callChatModel: fakeModel,
  });

  assert(second.chatId === first.chatId, "Second call should reuse the same chatId.");
  const messagesAfterSecond = await prisma.message.findMany({
    where: { chatId: first.chatId },
    orderBy: { createdAt: "asc" },
  });
  assert(messagesAfterSecond.length === 4, "Second call should append another user and assistant message.");
  logPass("Chat creation and reuse confirmed.");
}

// Checks that prompt construction includes the outline fields and goal summary.
async function testPromptConstruction(sessionOutlineId, journeyStepId) {
  logTest(
    "[Chat] handleChat builds prompt with outline fields and goal summary",
    "System prompt should carry objective, content, botTools, goal summary, and the first user message."
  );

  let capturedMessages = [];
  const spyModel = async ({ messages }) => {
    capturedMessages = messages;
    return "Spy reply.";
  };

  await handleChat({
    userId: null,
    sessionOutlineId,
    journeyStepId,
    chatId: null,
    messages: [{ role: "user", content: "Checking prompt pieces." }],
    callChatModel: spyModel,
  });

  assert(capturedMessages.length >= 2, "Model should receive at least system and first user messages.");
  const systemMessage = capturedMessages[0];
  const firstUserTurn = capturedMessages[1];
  assert(systemMessage.content.includes("Session objective"), "System prompt should include the objective label.");
  assert(systemMessage.content.toLowerCase().includes("tools and json commands"), "System prompt should list bot tools.");
  assert(systemMessage.content.includes("Current user goal"), "System prompt should mention the current user goal.");
  assert(firstUserTurn.content.length > 0, "First user message should be present.");
  logPass("Prompt carries objective, content, botTools, and goal summary.");
}

// Confirms JSON commands are parsed and stored correctly.
async function testJsonCommandStorage(sessionOutlineId, journeyStepId) {
  logTest(
    "[Chat] create_learning_goal JSON is stored in Message.command and not rendered as text",
    "Assistant JSON replies should be stored raw but returned as a parsed command."
  );

  const jsonReply = JSON.stringify({
    command: "create_learning_goal",
    learningGoal: "Improve my executive communication skills",
  });
  const fakeModel = async () => jsonReply;

  const result = await handleChat({
    userId: null,
    sessionOutlineId,
    journeyStepId,
    chatId: null,
    messages: [{ role: "user", content: "Please suggest a clear goal." }],
    callChatModel: fakeModel,
  });

  const latestAssistant = await prisma.message.findFirst({
    where: { chatId: result.chatId, role: "assistant" },
    orderBy: { createdAt: "desc" },
  });

  assert(latestAssistant?.content.trim() === jsonReply, "Assistant message should store the raw JSON text.");
  assert(latestAssistant?.command && latestAssistant.command.command === "create_learning_goal", "Message.command should store the parsed JSON.");
  assert(latestAssistant?.command.learningGoal === "Improve my executive communication skills", "learningGoal field should be stored.");
  assert(result.assistantMessage.content === null, "Assistant content should be null for pure JSON commands.");
  assert(result.assistantMessage.command?.learningGoal === "Improve my executive communication skills", "Return payload should carry the parsed command.");
  logPass("JSON command parsing and storage look correct.");
}

// Validates the /api/chat POST roundtrip.
async function testApiPostRoundtrip(sessionOutlineId, journeyStepId) {
  logTest(
    "[Chat] /api/chat POST works end-to-end for need-analysis",
    "The API should return a chatId and assistant message with content or command."
  );

  const body = {
    chatId: null,
    sessionOutlineId,
    journeyStepId,
    messages: [{ role: "user", content: "I want to work on my confidence." }],
  };
  const request = new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const response = await POST(request);
  assert(response.status === 200, "POST should return 200.");
  const data = await response.json();
  assert(data.chatId && data.chatId.length > 0, "Response should include a chatId.");
  assert(
    data.assistantMessage && (data.assistantMessage.content || data.assistantMessage.command),
    "assistantMessage should include content or command."
  );

  const chatRow = await prisma.learningSessionChat.findUnique({ where: { id: data.chatId } });
  assert(chatRow?.sessionOutlineId === sessionOutlineId, "Chat row should point to the outline.");
  const storedMessages = await prisma.message.findMany({ where: { chatId: data.chatId } });
  assert(storedMessages.length >= 2, "Chat should have stored the user and assistant messages.");
  logPass("API roundtrip creates chat and messages as expected.");
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
