// This script checks the React funnel pages and their basic navigation and text.
import { createRequire } from "module";
import { JSDOM } from "jsdom";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const require = createRequire(import.meta.url);

// This registers Babel so we can import TSX files inside this Node script.
require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  ignore: [/node_modules/],
});

// This mocks next/link so tests can read hrefs without a Next runtime.
const Module = require("module");
const originalLoad = Module._load;
Module._load = function mockNextLink(request, parent, isMain) {
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

// This spins up a tiny DOM for Testing Library.
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
});
Object.defineProperty(globalThis, "window", { value: dom.window, configurable: true });
Object.defineProperty(globalThis, "document", { value: dom.window.document, configurable: true });
Object.defineProperty(global, "navigator", { value: dom.window.navigator, configurable: true });
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.Text = dom.window.Text;
global.getComputedStyle = dom.window.getComputedStyle;

// This tiny logger keeps the output human friendly.
function logTest(title, expectation) {
  console.log(`\n[Test] ${title}`);
  console.log(`- Expectation: ${expectation}`);
}

// This marks small wins.
function logPass(message) {
  console.log(`  ok: ${message}`);
}

// This stops the run if we miss a must-have.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Import the pages after the mocks are ready.
const { default: HomePage } = require("../src/app/page.tsx");
const { default: WelcomePage } = require("../src/app/welcome/page.tsx");
const { default: LearningGuideIntroPage } = require("../src/app/learning-guide-intro/page.tsx");
const { default: LearningGoalConfirmationPage } = require("../src/app/learning-goal-confirmation/page.tsx");
const { default: WhatsNextPage } = require("../src/app/whats-next/page.tsx");
const { clearPendingGoal } = require("../src/lib/pending-goal-store.ts");

// Main runner.
async function main() {
  const user = userEvent.setup({ document });

  logTest("Landing to Welcome navigation", "The Start button should point to /welcome.");
  const landing = render(React.createElement(HomePage));
  const startLink = landing.getByRole("link", { name: "Start" });
  assert(startLink.getAttribute("href") === "/welcome", "Start button should link to /welcome.");
  logPass("Landing page links to /welcome.");
  cleanup();

  logTest(
    "Welcome page content",
    "The welcome page should show the exact title, three paragraphs, and a CONTINUE button to /learning-guide-intro."
  );
  const welcome = render(React.createElement(WelcomePage));
  await welcome.findByText((content) => content.includes("Welcome to leadership-factory.cn"));
  await welcome.findByText((content) => content.includes("It's a space created to help you grow"));
  await welcome.findByText((content) => content.includes("Because every journey begins"));
  await welcome.findByText((content) => content.includes("Let's take your first step together."));
  const continueLink = welcome.getByRole("link", { name: "CONTINUE" });
  assert(continueLink.getAttribute("href") === "/learning-guide-intro", "CONTINUE should point to /learning-guide-intro.");
  logPass("Welcome page copy and link look right.");
  cleanup();

  logTest(
    "Learning-guide-intro page content & CTA",
    "This page should introduce the guide and send people to the need-analysis step."
  );
  const intro = render(React.createElement(LearningGuideIntroPage));
  await intro.findByText((content) => content.includes("I'm your learning guide, here to guide your journey of discovery and growth."));
  await intro.findByText(
    "I'll ask you a few easy questions about what you'd like to work on, such as your goals, confidence, communication, relationships, or everyday challenges."
  );
  await intro.findByText((content) => content.includes("Your answers will help me create a personalized learning path."));
  await intro.findByText((content) => content.includes("When you're ready, let's begin."));
  const readyLink = intro.getByRole("link", { name: "I'M READY" });
  assert(
    readyLink.getAttribute("href") === "/journeys/goal-clarification/steps/need-analysis",
    "I'M READY should point to the need-analysis step."
  );
  logPass("Learning-guide-intro text and CTA look right.");
  cleanup();

  logTest(
    "Learning-goal-confirmation fallback behaviour",
    "The page should show a friendly fallback and a Start again link when no pending goal is stored."
  );
  clearPendingGoal();
  const confirm = render(React.createElement(LearningGoalConfirmationPage));
  confirm.getByText("Let me see if I understood:");
  confirm.getByText("Please confirm it or edit it and I'll recommend a learning journey for you.");
  confirm.getByText("No learning goal is available. Please start from the beginning.");
  const startAgainLink = confirm.getByRole("link", { name: "Start again" });
  assert(startAgainLink.getAttribute("href") === "/learning-guide-intro", "Start again should point to /learning-guide-intro.");
  logPass("Fallback message and Start again link appear when no goal is stored.");
  cleanup();

  logTest(
    "Whats-next dummy behaviour",
    "The page should show the goal box, static paragraphs, and a no-op YES, I'M IN! button."
  );
  const whatsNext = render(React.createElement(WhatsNextPage, { searchParams: { goal: "Edited Goal Text" } }));
  whatsNext.getByText("You did it!");
  whatsNext.getByText(
    "Congratulations on writing down your learning goal. You just unlocked the very first step toward the best version of yourself."
  );
  whatsNext.getByText("Our team will now review your goal and prepare a tailor-made learning journey that fits what you shared.");
  whatsNext.getByText("We will reach out very soon. In the meantime, please make sure you are signed in so we can send the details to your inbox.");
  whatsNext.getByText("Edited Goal Text");
  const yesButton = whatsNext.getByRole("button", { name: "YES, I'M IN!" });
  let loggedMessage = "";
  const originalLog = console.log;
  console.log = (message) => {
    loggedMessage = String(message);
  };
  await user.click(yesButton);
  console.log = originalLog;
  assert(loggedMessage.includes("Next steps coming in Step 3."), "The no-op handler should log a friendly message.");
  logPass("Whats-next shows the goal and keeps the CTA as a no-op for now.");
  cleanup();

  console.log("\nPublic funnel checks completed for Step 2.");
}

main().catch((error) => {
  console.error("\nTest run failed:", error);
  process.exit(1);
});
