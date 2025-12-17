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
global.fetch = async (url) => {
  if (typeof url === "string" && url.includes("/api/auth/me")) {
    return { ok: true, status: 200, json: async () => ({ user: null }) };
  }
  if (typeof url === "string" && url.includes("/api/recommend-journey")) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ title: "Test Journey Title", intro: "Test intro text crafted for the goal." }),
    };
  }
  if (typeof url === "string" && url.includes("/api/whats-next")) {
    return { ok: true, status: 200, json: async () => ({ success: true, journeyId: "test-journey-id" }) };
  }
  return { ok: true, status: 200, json: async () => ({}) };
};

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
const { clearPendingGoal, setPendingGoal } = require("../src/lib/pending-goal-store.ts");

// Main runner.
async function main() {
  const user = userEvent.setup({ document });

  logTest("Home page is the welcome page", "The home page should show the welcome text and a START link to /learning-guide-intro.");
  const landing = render(React.createElement(HomePage));
  await landing.findByText((content) => content.includes("Welcome!"));
  await landing.findByText((content) => content.includes("Simone & Robin"));
  await landing.findByText((content) => content.includes("If you believe that improvement is a choice"));
  const startLink = landing.getByRole("link", { name: "START" });
  assert(startLink.getAttribute("href") === "/learning-guide-intro", "START should point to /learning-guide-intro.");
  logPass("Home page shows the welcome content and points to the guide intro.");
  cleanup();

  logTest(
    "Welcome page content",
    "The welcome page should show the title, two paragraphs, and a START button to /learning-guide-intro."
  );
  const welcome = render(React.createElement(WelcomePage));
  await welcome.findByText((content) => content.includes("Welcome!"));
  await welcome.findByText((content) => content.includes("Simone & Robin"));
  await welcome.findByText((content) => content.includes("If you believe that improvement is a choice"));
  const continueLink = welcome.getByRole("link", { name: "START" });
  assert(continueLink.getAttribute("href") === "/learning-guide-intro", "START should point to /learning-guide-intro.");
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
    readyLink.getAttribute("href") === "/need-analysis",
    "I'M READY should point to the public need-analysis page."
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
    "Whats-next shows pending goal and opens auth modal",
    "The page should read the stored goal and show the auth modal when clicking the CTA while logged out."
  );
  clearPendingGoal();
  setPendingGoal("Edited Goal Text");
  const whatsNext = render(React.createElement(WhatsNextPage, { searchParams: {} }));
  await whatsNext.findByText("You did it!");
  whatsNext.getByText("Here is a personalized learning suggestion based on what you shared.");
  whatsNext.getByText("Our team will now create the detailed sessions and steps for this journey.");
  whatsNext.getByText("If you want a different angle, ask for another recommendation, then confirm to lock it in.");
  whatsNext.getByText("Please make sure you are signed in so we can send the details to your inbox.");
  await whatsNext.findByText("Test Journey Title");
  whatsNext.getByText("Test intro text crafted for the goal.");
  whatsNext.getByRole("button", { name: "Recommend another journey" });
  const yesButton = whatsNext.getByRole("button", { name: "YES, I'M IN!" });
  await user.click(yesButton);
  whatsNext.getByText("Welcome back");
  const loginButtons = whatsNext.getAllByRole("button", { name: "Login" });
  assert(loginButtons.length >= 1, "At least one Login control should appear.");
  whatsNext.getByRole("button", { name: "Sign up" });
  logPass("Whats-next shows the saved goal and opens the auth modal for guests.");
  cleanup();

  logTest(
    "Whats-next shows fallback when no pending goal",
    "With no stored goal, the page should show a safe message and a Start again link."
  );
  clearPendingGoal();
  const whatsNextFallback = render(React.createElement(WhatsNextPage, { searchParams: {} }));
  whatsNextFallback.getByText("No learning goal found. Please start again from the beginning.");
  const fallbackStartLink = whatsNextFallback.getByRole("link", { name: "Start again" });
  assert(
    fallbackStartLink.getAttribute("href") === "/learning-guide-intro",
    "Start again should point to /learning-guide-intro."
  );
  logPass("Whats-next fallback message and link appear when no goal is stored.");
  cleanup();

  console.log("\nPublic funnel checks completed for Step 2.");
}

main().catch((error) => {
  console.error("\nTest run failed:", error);
  process.exit(1);
});
