Step 4: Wire create_learning_goal → /learning-goal-confirmation

Step 4 — /api/chat → /learning-goal-confirmation

Goal: When the bot emits create_learning_goal, the app must navigate to /learning-goal-confirmation and show the real goal from the need-analysis chat (no more dummy text).

0. Context (read-only, do not re-specify)

Before you start, re-read these project docs and treat them as the single source of truth:

docs/features.md – overall product flow, routes, JSON commands (create_learning_goal), and behaviour of /learning-goal-confirmation.

docs/prisma-database-structure.md – Prisma models and relations (User, LearningSessionChat, LearningJourney, LearningSessionOutline, LearningJourneyStep).

docs/visual-guidelines.md – fonts, gradients, glass cards, gold buttons, motion, etc.

docs/image-checklist.md – required assets in public/.

docs/env-contents.md – .env variables, including DEFAULT_API for Aliyun/ChatGPT.

docs/implementation-steps.md – overall Step 1–5 roadmap.

Assume Step 1–3 are already done correctly:

DB schema + seed for Goal Clarification journey and need-analysis outline (with correct botTools containing the create_learning_goal JSON spec).

Next.js app router is in place (src/app/**), with the public funnel pages (/, /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next) implemented visually per the visual guidelines.

The need-analysis step page (/journeys/goal-clarification/steps/[stepId]) renders chat UI using src/lib/useChat.ts and calls POST /api/chat, which:

builds prompts from User, LearningSessionOutline, LearningJourney,

persists LearningSessionChat + Message records,

supports Message.command JSON, including { "command": "create_learning_goal", "learningGoal": "..." } for need-analysis.

Do not change any of that unless explicitly requested below.

1. Scope of Step 4 (what you must implement)

High-level objective

When the assistant, during the need-analysis chat, emits:

{
  "command": "create_learning_goal",
  "learningGoal": "<final goal text>"
}


the frontend must:

Capture this command from the chat response.

Store the learningGoal on the client (pending goal state).

Navigate the browser to /learning-goal-confirmation.

Render the goal on /learning-goal-confirmation using that stored value, with a safe fallback if none is available.

1.1. Command handling in the chat flow

Work in the frontend chat layer, not in the DB or API schema.

Extend src/lib/useChat.ts (or the module that currently handles assistant messages) to:

Inspect the latest assistant message for Message.command with command === "create_learning_goal" and a string learningGoal.

When detected:

Do not render the raw JSON as a visible assistant bubble.

Call a small helper to store the goal in a client-side “pending goal” store.

Trigger navigation to /learning-goal-confirmation via the Next.js App Router.

Guard against double-fire:

Ensure you only react once to a given create_learning_goal command (e.g., via a hasPendingGoalRedirect flag in hook state or checking if a pending goal is already set).

1.2. Pending goal storage (client-side)

Create a tiny abstraction for the “pending learning goal”, instead of poking window.sessionStorage directly all over the code:

New file: src/lib/pending-goal-store.ts (or similar), exporting three helpers:

setPendingGoal(goal: string): void

getPendingGoal(): string | null

clearPendingGoal(): void

Implementation details:

Use sessionStorage only in the browser; guard with typeof window !== "undefined".

If sessionStorage is unavailable (SSR), getPendingGoal() should just return null and setPendingGoal() should no-op.

useChat should use setPendingGoal when it sees create_learning_goal.

1.3. /learning-goal-confirmation behaviour with real data

Update the existing Next.js page at src/app/learning-goal-confirmation/page.tsx (or its current location) so that:

On initial render (client side), it calls getPendingGoal() to retrieve the goal text.

It uses that goal to populate the goal paragraph / edit field that is already present from Step 2 (do not change the copy or layout beyond what is necessary to inject data).

It does not hardcode any dummy goal text anymore.

Fallback when there is no pending goal

Define clear behaviour for direct access or stale state:

If getPendingGoal() returns null or an empty string:

Show a safe fallback message inside the same card, such as:

“No learning goal is available. Please start from the beginning.”

Show a button “Start again” that links back to /learning-guide-intro.

Do not redirect silently; make the behaviour explicit and testable.

Keeping the existing UX

Do not redesign this page. Preserve:

Title: “Let me see if I understood:”

The italic instruction line.

The edit behaviour (pencil icon) and Confirm button from Step 2.

Just change where the goal text comes from (pending store instead of dummy).

Important: Step 4 only wires data into /learning-goal-confirmation. The /whats-next page can still use dummy goal text for now; real goal wiring to /whats-next and goal commit/journey creation belong to later steps.

2. Non-goals (what you must NOT touch)

To avoid scope creep and breaking previous steps:

Do not change the Prisma schema or any migration files.

Do not modify seeded journeys/outlines or botTools JSON spec for create_learning_goal.

Do not alter the visual design in ways that conflict with docs/visual-guidelines.md.

Do not implement the login, goal commit, or journey creation logic for /whats-next (that’s a separate step).

Do not introduce new routes beyond those already defined in the spec.

Do not add tests marked as “pending”. Every test you add for Step 4 must assert real behaviour.

If you feel something must change outside this scope to make Step 4 work, keep the change minimal and document it clearly in comments and test logs.

3. Implementation checklist (Step 4 only)

Follow this sequence:

Create pending goal helper

Add src/lib/pending-goal-store.ts with setPendingGoal, getPendingGoal, clearPendingGoal.

Use sessionStorage under a typeof window !== "undefined" guard.

Extend chat command handling

In src/lib/useChat.ts (or equivalent):

After receiving an assistant message from /api/chat, inspect its command payload.

When command === "create_learning_goal" and learningGoal is a non-empty string:

Call setPendingGoal(learningGoal).

Avoid rendering the raw JSON message as user-visible text.

Use the Next.js router (useRouter().push("/learning-goal-confirmation")) to navigate.

Prevent double redirects for the same command.

Wire /learning-goal-confirmation to the pending goal

Mark the page as "use client" if necessary to access the pending goal store.

On mount, read getPendingGoal() and:

If you have a goal:

Use it as the initial value of the displayed/editable goal text.

If you don’t:

Show the fallback message and “Start again” button → /learning-guide-intro.

Keep the existing headings, italic text, layout, and edit/Confirm UI logic.

Manual sanity check

Run the app.

Go through:

/welcome → /learning-guide-intro → start need-analysis.

Use a mocked/chat shortcut to force an assistant response with a valid create_learning_goal command.

Confirm:

You are redirected to /learning-goal-confirmation.

The goal on the page matches the value in the JSON command.

If you hit /learning-goal-confirmation fresh in a new tab, you see the fallback message and “Start again” button.

4. Tests checklist for Step 4

Add or extend a test file, e.g. tests/step4-create-learning-goal-tests.js, and a script in package.json:

"scripts": {
  "test:step4-create-learning-goal": "node tests/step4-create-learning-goal-tests.js"
}


You can use node + minimal mocks; you don’t have to spin up a full browser, but tests must check real code paths (helpers, command handlers, etc.), not just files on disk.

4.1. Command handling → pending goal + redirect

Test name: create_learning_goal command stores pending goal and requests redirect

Arrange:

Import the command-handling helper or a small wrapper you expose from useChat for tests (e.g. handleAssistantCommandForTest), so you can pass in a fake message and a fake router object.

Act:

Call it with a message whose command payload is:

{
  "command": "create_learning_goal",
  "learningGoal": "Improve my executive communication skills"
}


Assert:

getPendingGoal() returns that exact string.

The fake router was called with "/learning-goal-confirmation".

No second redirect happens if you call it again with the same command.

4.2. /learning-goal-confirmation renders pending goal

Test name: learning-goal-confirmation shows the pending goal when available

Arrange:

Use the pending goal store to set a goal (e.g. "Become a more confident public speaker").

Render the component logic in a minimal JS/JSX harness or call a function that computes its initial state (whichever you expose for testability).

Assert:

The heading text “Let me see if I understood:” is present.

The italic instruction line matches the spec from the design docs.

The goal text matches the pending goal set in the store.

4.3. Fallback behaviour without goal

Test name: learning-goal-confirmation shows fallback when no pending goal

Arrange:

Ensure pending goal is cleared (clearPendingGoal()).

Render the page logic as above.

Assert:

A fallback message is present (e.g. containing “No learning goal is available”).

There is a button or link labelled “Start again”.

That button points to /learning-guide-intro.

When Step 4 is done:

Chat → create_learning_goal → /learning-goal-confirmation is fully wired with real data.

/learning-goal-confirmation no longer uses dummy goals and behaves safely when accessed in isolation.