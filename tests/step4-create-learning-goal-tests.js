// This script checks that Step 4 stores the pending goal, redirects, and renders the goal card.
const { JSDOM } = require("jsdom");
const React = require("react");
const { cleanup, render } = require("@testing-library/react");

// This registers Babel so TSX files can be loaded in Node.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

// This mocks Next.js link and navigation so components can load without a real Next runtime.
const Module = require("module");
const originalLoad = Module._load;
Module._load = function mockNext(request, parent, isMain) {
  if (request === "next/link") {
    return function LinkMock({ href, children, className, onClick, ...rest }) {
      return React.createElement("a", { href, className, onClick, ...rest }, children);
    };
  }
  if (request === "next/navigation") {
    return {
      useRouter: () => ({
        push: () => {},
      }),
    };
  }
  return originalLoad(request, parent, isMain);
};

// This spins up a small DOM and sessionStorage for the tests.
const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
Object.defineProperty(globalThis, "window", { value: dom.window, configurable: true });
Object.defineProperty(globalThis, "document", { value: dom.window.document, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.Text = dom.window.Text;
global.getComputedStyle = dom.window.getComputedStyle;

// Small helpers to keep the output friendly.
// This prints a short label before each test.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
}

// This marks a tiny win.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// This stops the run when a rule is broken.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const { handleAssistantCommandForTest } = require("../src/lib/assistant-command-handler.ts");
const { setPendingGoal, getPendingGoal, clearPendingGoal } = require("../src/lib/pending-goal-store.ts");
const { default: LearningGoalConfirmationPage } = require("../src/app/learning-goal-confirmation/page.tsx");

// This runs the three Step 4 checks in order.
async function main() {
  logTest(
    "create_learning_goal command stores pending goal and requests redirect",
    "A create_learning_goal command should save the text once and push to /learning-goal-confirmation."
  );
  clearPendingGoal();
  let hasRedirected = false;
  const redirects = [];
  const fakeRouter = {
    push: (href) => {
      redirects.push(href);
    },
  };
  const commandPayload = {
    command: "create_learning_goal",
    learningGoal: "Improve my executive communication skills",
  };

  const firstHandled = handleAssistantCommandForTest(commandPayload, fakeRouter, {
    hasRedirected,
    markRedirected: () => {
      hasRedirected = true;
    },
  });
  assert(firstHandled, "First command should be handled.");
  assert(getPendingGoal() === "Improve my executive communication skills", "Pending goal should match the command text.");
  assert(redirects.length === 1 && redirects[0] === "/learning-goal-confirmation", "Router push should point to confirmation.");

  const secondHandled = handleAssistantCommandForTest(commandPayload, fakeRouter, {
    hasRedirected,
    markRedirected: () => {
      hasRedirected = true;
    },
  });
  assert(!secondHandled, "Second identical command should be ignored after the redirect flag is set.");
  assert(redirects.length === 1, "Router push should happen only once.");
  logPass("Pending goal saved and redirect requested without double firing.");

  logTest(
    "learning-goal-confirmation shows the pending goal when available",
    "The confirmation page should read the stored goal and display it with the heading and helper line."
  );
  clearPendingGoal();
  setPendingGoal("Become a more confident public speaker");
  const goalView = render(React.createElement(LearningGoalConfirmationPage));
  goalView.getByText("Let me see if I understood:");
  goalView.getByText("Please confirm it or edit it and I'll recommend a learning journey for you.");
  goalView.getByText("Become a more confident public speaker");
  logPass("Pending goal appears with the expected heading and helper copy.");
  cleanup();

  logTest(
    "learning-goal-confirmation shows fallback when no pending goal",
    "When no goal is stored, the page should show the fallback text and a Start again link."
  );
  clearPendingGoal();
  const fallbackView = render(React.createElement(LearningGoalConfirmationPage));
  fallbackView.getByText("No learning goal is available. Please start from the beginning.");
  fallbackView.getByText("Please confirm it or edit it and I'll recommend a learning journey for you.");
  const startAgainLink = fallbackView.getByRole("link", { name: "Start again" });
  assert(startAgainLink.getAttribute("href") === "/learning-guide-intro", "Start again should point to /learning-guide-intro.");
  logPass("Fallback message and Start again link show up when the store is empty.");
  cleanup();

  console.log("\nStep 4 create_learning_goal checks completed.");
}

main().catch((error) => {
  console.error("\nTest run failed:", error);
  process.exit(1);
});
