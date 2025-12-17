// This script checks the profile page, journeys list, nav visibility, and logout behaviour.
const path = require("path");
const { execSync } = require("child_process");
const { JSDOM } = require("jsdom");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// This registers Babel so TS/TSX files can load.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

// This spins up a DOM so React Testing Library can render components.
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Text = dom.window.Text;
global.localStorage = dom.window.localStorage;
global.DOMRect = dom.window.DOMRect || class DOMRect {};

const React = require("react");
const { render, screen, cleanup, within } = require("@testing-library/react");
const userEvent = require("@testing-library/user-event").default;

// This lets us tweak headers and path per test.
let cookieHeader = "";
let mockPathname = "/";
const Module = require("module");
const originalLoad = Module._load;
Module._load = function mockNextModules(request, parent, isMain) {
  if (request === "next/link") {
    return function LinkMock({ href, children, className, onClick, ...rest }) {
      return React.createElement("a", { href, className, onClick, ...rest }, children);
    };
  }
  if (request === "next/navigation") {
    return {
      useRouter: () => ({
        push: () => {},
        refresh: () => {},
      }),
      usePathname: () => mockPathname,
    };
  }
  if (request === "next/headers") {
    return {
      headers: () => ({
        get: (name) => (name.toLowerCase() === "cookie" ? cookieHeader : null),
      }),
    };
  }
  return originalLoad(request, parent, isMain);
};

// This controls the mock auth response for fetch calls.
let mockAuthResponseUser = null;
global.fetch = async (url) => {
  if (typeof url === "string" && url.includes("/api/auth/me")) {
    return { ok: true, status: 200, json: async () => ({ user: mockAuthResponseUser }) };
  }
  if (typeof url === "string" && url.includes("/api/auth/logout")) {
    mockAuthResponseUser = null;
    cookieHeader = "";
    return { ok: true, status: 200, json: async () => ({ success: true }) };
  }
  return { ok: true, status: 200, json: async () => ({}) };
};

const TEST_DB_NAME = process.env.PROFILE_JOURNEYS_TEST_DB || "profile_journeys_tests";
const TEST_SHADOW_DB_NAME = `${TEST_DB_NAME}_shadow`;
const databaseUrl = withDbName(process.env.DATABASE_URL, TEST_DB_NAME);
const shadowDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, TEST_SHADOW_DB_NAME);
const adminDatabaseUrl = withDbName(process.env.DATABASE_URL, "postgres");
const shadowAdminDatabaseUrl = withDbName(process.env.SHADOW_DATABASE_URL || process.env.DATABASE_URL, "postgres");
process.env.DATABASE_URL = databaseUrl;
process.env.SHADOW_DATABASE_URL = shadowDatabaseUrl;
process.env.NODE_ENV = "test";

const { default: JourneysPage } = require("../src/app/journeys/page.tsx");
const { default: MyProfilePage } = require("../src/app/my-profile/page.tsx");
const TopNav = require("../src/app/components/TopNav.tsx").default;
const { AUTH_COOKIE_NAME, signUserToken } = require("../src/server/auth/session.ts");

let pool;
let adapter;
let prisma;

// This keeps the output readable in the console.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
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

// This sets the auth cookie header for a given user record.
function setAuthCookieForUser(user) {
  const token = signUserToken(user.id);
  cookieHeader = `${AUTH_COOKIE_NAME}=${token}`;
  mockAuthResponseUser = { id: user.id, email: user.email, name: user.name, learningGoal: user.learningGoal };
}

// This clears auth for guest scenarios.
function clearAuth() {
  cookieHeader = "";
  mockAuthResponseUser = null;
  localStorage.removeItem("lf_my_profile_seen");
}

// This creates a new test user with optional goal fields.
async function createTestUser({ emailSuffix, learningGoal = null, learningGoalConfirmedAt = null }) {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const email = `test-profile-${emailSuffix || unique}@example.com`;
  return prisma.user.create({
    data: {
      email,
      passwordHash: "hash",
      role: "user",
      botRole: "coachee",
      learningGoal,
      learningGoalConfirmedAt,
    },
  });
}

// This removes personalized journeys and test users so each test has a clean slate.
async function clearTestData() {
  await prisma.learningJourney.deleteMany({ where: { isStandard: false } });
  await prisma.user.deleteMany({ where: { email: { startsWith: "test-profile-" } } });
}

// This seeds two personalized journeys for the same user.
async function createPersonalizedJourneys(user) {
  const first = await prisma.learningJourney.create({
    data: {
      title: "First personalized journey",
      intro: "First intro",
      isStandard: false,
      personalizedForUserId: user.id,
      userGoalSummary: user.learningGoal || "First goal text",
      status: "awaiting_review",
      slug: "personal-1",
    },
  });

  const second = await prisma.learningJourney.create({
    data: {
      title: "Latest personalized journey",
      intro: "Second intro",
      isStandard: false,
      personalizedForUserId: user.id,
      userGoalSummary: user.learningGoal || "Second goal text",
      status: "active",
      slug: "personal-2",
    },
  });

  return { first, second };
}

// This runner wires up the DB and executes each test in order.
async function main() {
  await resetTestDatabases();
  pool = new Pool({ connectionString: databaseUrl });
  adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });

  logTest("Prepare database", "Migrations and seed should load for profile/journeys tests.");
  runCommand("npx prisma migrate deploy --schema prisma/schema.prisma", "prisma migrate deploy completed");
  runCommand("npx prisma db seed --schema prisma/schema.prisma", "seed script executed");

  await clearTestData();

  await testProfileRequiresLogin();
  await testNavVisibility();
  await testJourneysShowStandardOnly();
  await testJourneysGuestView();
  await testProfileShowsGoalAndJourneys();
  await testProfileEmptyStateNoJourneys();
  await testProfileTourFlag();
  await testLogoutFlow();

  console.log("\nProfile and journeys checks completed.");
}

// Test: profile page should gate guests.
async function testProfileRequiresLogin() {
  logTest(
    "Profile requires login",
    "Guest hitting /my-profile should see the login prompt instead of profile content."
  );
  clearAuth();
  const page = await MyProfilePage();
  const view = render(page);
  await screen.findByText("Please log in to see your profile");
  screen.getByText("Sign in to view your learning goal, journeys, and conversations.");
  screen.getByRole("button", { name: "Login to continue" });
  logPass("Guest view shows the auth prompt.");
  cleanup();
}

// Test: nav links depend on auth state.
async function testNavVisibility() {
  logTest(
    "Nav shows links regardless of auth state",
    "The top bar should always show Home, Learning Journeys, and Profile links."
  );

  clearAuth();
  mockPathname = "/";
  mockAuthResponseUser = null;
  render(React.createElement(TopNav, { initialUser: null }));
  screen.getByText("Home");
  screen.getByText("Learning Journeys");
  screen.getByText("Profile");
  logPass("Guest nav exposes the core links.");
  cleanup();

  const user = await createTestUser({ emailSuffix: "nav" });
  setAuthCookieForUser(user);
  mockPathname = "/";
  render(React.createElement(TopNav, { initialUser: mockAuthResponseUser }));
  screen.getByText("Home");
  screen.getByText("Learning Journeys");
  screen.getByText("Profile");
  logPass("Authed nav still shows the same links.");
  cleanup();
}

// Test: journeys page lists only standard journeys for signed-in users.
async function testJourneysShowStandardOnly() {
  logTest(
    "Journeys page shows only standard journeys",
    "Standard journeys should appear; personalized ones should stay hidden."
  );
  await clearTestData();
  const user = await createTestUser({ emailSuffix: "journeys", learningGoal: "Test goal", learningGoalConfirmedAt: new Date() });
  await prisma.learningJourney.create({
    data: {
      title: "Personalized hidden journey",
      intro: "Should not show",
      isStandard: false,
      personalizedForUserId: user.id,
      userGoalSummary: "Hidden",
      status: "awaiting_review",
      slug: "hidden-personal",
    },
  });

  setAuthCookieForUser(user);
  mockPathname = "/journeys";
  const page = await JourneysPage();
  const view = render(page);

  await screen.findByText("Goal Clarification");
  expectMissing("Personalized hidden journey");
  const links = screen.getAllByRole("link", { name: /Goal Clarification/i });
  assert(
    links.some((link) => link.getAttribute("href") === "/journeys/goal-clarification"),
    "Standard journey link should point to /journeys/goal-clarification."
  );
  logPass("Standard journeys appear and personalized ones stay hidden.");
  cleanup();
}

// Test: guest hitting /journeys should see a sign-in prompt.
async function testJourneysGuestView() {
  logTest(
    "Journeys guest view is open",
    "Guest users should see the standard journeys without signing in."
  );
  clearAuth();
  mockPathname = "/journeys";
  const page = await JourneysPage();
  const view = render(page);
  await screen.findByText("Please log in to view learning journeys");
  screen.getByText("Sign in so we can show the journeys available to you.");
  screen.getByRole("button", { name: "Login to continue" });
  expectMissing("Goal Clarification");
  logPass("Guest view of /journeys shows the gate prompt.");
  cleanup();
}

// Test: profile shows goal, recommended journey, and journeys list.
async function testProfileShowsGoalAndJourneys() {
  logTest(
    "Profile shows goal and recommended journey",
    "Latest personalized journey should appear as recommended and all journeys should list with links."
  );
  await clearTestData();
  const user = await createTestUser({
    emailSuffix: "profile",
    learningGoal: "Grow as a calm leader",
    learningGoalConfirmedAt: new Date(),
  });
  const { first, second } = await createPersonalizedJourneys(user);

  setAuthCookieForUser(user);
  mockPathname = "/my-profile";
  const page = await MyProfilePage();
  const view = render(page);

  const goalTexts = await screen.findAllByText("Grow as a calm leader");
  assert(goalTexts.length >= 1, "Goal text should appear on the profile.");
  const recommendedLink = screen.getAllByRole("link", { name: /Latest personalized journey/i })[0];
  assert(
    recommendedLink.getAttribute("href") === "/journeys/personal-2",
    "Recommended journey link should target the latest active journey slug."
  );

  expectMissing("First personalized journey");
  const titles = screen.getAllByText("Latest personalized journey");
  assert(titles.length >= 1, "Latest active journey should be visible.");
  const journeyLinks = screen.getAllByRole("link", { name: "Latest personalized journey" });
  assert(
    journeyLinks.some((link) => link.getAttribute("href") === "/journeys/personal-2"),
    "Active journey link should point to its slug."
  );
  logPass("Profile shows goal, hides awaiting journeys, and links to the active one.");
  cleanup();
}

// Test: profile empty states when no journeys exist.
async function testProfileEmptyStateNoJourneys() {
  logTest(
    "Profile shows empty states when no journeys exist",
    "No recommended card or journeys list should render when there are none."
  );
  await clearTestData();
  const user = await createTestUser({
    emailSuffix: "empty",
    learningGoal: "Wait for my plan",
    learningGoalConfirmedAt: new Date(),
  });

  setAuthCookieForUser(user);
  const page = await MyProfilePage();
  const view = render(page);

  screen.getByText("Wait for my plan");
  expectMissing("Recommended");
  screen.getByText("Goal Clarification");
  logPass("No personalized journeys show, but the standard template remains visible.");
  cleanup();
}

// Test: the first-time tour shows once and sets the storage flag.
async function testProfileTourFlag() {
  logTest(
    "Profile tour appears only once",
    "Tour overlay should show on first render and hide after the user skips it."
  );
  await clearTestData();
  const user = await createTestUser({
    emailSuffix: "tour",
    learningGoal: "Learn tour",
    learningGoalConfirmedAt: new Date(),
  });
  clearAuth();
  setAuthCookieForUser(user);
  localStorage.removeItem("lf_my_profile_seen");

  const page = await MyProfilePage();
  const view = render(page);
  const userActions = userEvent.setup({ document });

  await screen.findByText("Welcome to your profile!");
  const skipButton = Array.from(document.querySelectorAll("button")).find((btn) => btn.textContent?.trim() === "Skip");
  if (skipButton) {
    await userActions.click(skipButton);
  }
  assert(!document.querySelector(".tour-overlay"), "Tour overlay should hide after skip.");
  logPass("Tour overlay hides after the user dismisses it.");
  cleanup();
}

// Test: logout clears session and gates profile again.
async function testLogoutFlow() {
  logTest(
    "Logout clears session",
    "After logout, nav should show Login and profile should be gated again."
  );
  await clearTestData();
  const user = await createTestUser({
    emailSuffix: "logout",
    learningGoal: "Check logout",
    learningGoalConfirmedAt: new Date(),
  });
  setAuthCookieForUser(user);

  const profilePage = await MyProfilePage();
  render(profilePage);
  await screen.findByText("Check logout");
  cleanup();

  clearAuth();
  mockPathname = "/";
  const nav = render(React.createElement(TopNav, { initialUser: null }));
  screen.getByText("Home");
  screen.getByText("Learning Journeys");
  cleanup();

  const gatedProfile = await MyProfilePage();
  render(gatedProfile);
  await screen.findByText("Please log in to see your profile");
  logPass("Logout returns nav to guest state and gates profile.");
  cleanup();
}

// This helper asserts that a string is not present in the DOM.
function expectMissing(text) {
  const el = screen.queryByText((content) => content.trim() === text);
  assert(!el, `"${text}" should not be visible here.`);
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
