feature/202505120337-public-funnel

Follow AGENTS.md, prisma-database-structure.md, features.md, implementation-steps.md, visual-guidelines.md, key-pages-additional-notes.md, image-checklist.md and env-contents.md.

This step is Step 2 — Public funnel pages only (no chat yet)

1. STEP 2 – IMPLEMENTATION (PUBLIC FUNNEL PAGES ONLY)

Goal

/, /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next must:

be implemented as Next.js App Router pages (React),

use the shared visual style from visual-guidelines.md and key-pages-additional-notes.md

navigate correctly with fake/hard-coded data only (no DB, no chat, no auth, no emails).

1.1 Next.js app setup

If not already present, turn this repo into a Next.js 14 App Router project:

Install next, react, react-dom.

Create next.config.mjs and standard App Router structure under src/app.

Add scripts in package.json:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "generate": "prisma generate",
  "migrate": "prisma migrate dev",
  "db:seed": "prisma db seed",
  "test:schema-and-seed": "node tests/schema-and-seed-tests.js",
  "test:public-funnel": "node tests/public-funnel-tests.mjs"
}


Do not implement the funnel as standalone static HTML files in public/.
All user-facing pages for this step must be React pages under src/app.

Create a shared layout and styles:

src/app/layout.tsx with the global layout (background gradient, centered content).

src/app/globals.css (or similar) implementing the fonts, colors, glass cards, buttons etc. from visual-guidelines.md.

Use the exact wording and structure for each page from key-pages-additional-notes.md (for /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next).

1.2 Pages & navigation

Implement the following pages in the App Router:

/ – Landing

File: src/app/page.tsx.

Hero section that matches the “landing” description in features.md.

Primary Start button (text from features.md) implemented with next/link that navigates to /welcome.

/welcome

File: src/app/welcome/page.tsx.

Content and structure exactly as in key-pages-additional-notes.md → /welcome.

Gold CONTINUE button → navigates to /learning-guide-intro.

/learning-guide-intro

File: src/app/learning-guide-intro/page.tsx.

Text and layout exactly as in key-pages-additional-notes.md → /learning-guide-intro.

Gold I’M READY button → navigates to a temporary hardcoded route:

For Step 2, route to /journeys/goal-clarification/steps/TEST.

Implement a simple placeholder page:

File: src/app/journeys/goal-clarification/steps/TEST/page.tsx.

Contents: a centered card that says e.g. “Need-analysis placeholder – chat will be wired in Step 3”.

In Step 2 this route is purely visual; no chat, no API calls.

/learning-goal-confirmation

File: src/app/learning-goal-confirmation/page.tsx.

Use a dummy goal stored in React state (e.g. "Improve my executive communication skills").

Layout and static copy exactly as in key-pages-additional-notes.md → /learning-goal-confirmation, except the goal text is the dummy value.

Behaviour:

Show the goal in the paragraph area.

A simple inline edit control:

Either a small pencil icon/button or an “Edit” button that toggles a <textarea> or <input>.

Editing updates the local component state goal.

Confirm button:

For Step 2, push to /whats-next with the goal value in query string, e.g.:

router.push(`/whats-next?goal=${encodeURIComponent(goal)}`);


No DB calls, no auth, no backend yet.

/whats-next

File: src/app/whats-next/page.tsx.

Layout and static copy exactly as in key-pages-additional-notes.md → /whats-next.

Goal display:

Read goal from searchParams (Next App Router) or fall back to the same dummy text as /learning-goal-confirmation if missing.

Show it inside the purple-highlighted box as described.

YES, I’M IN! button:

For Step 2: implement a no-op handler:

On click, prevent page reload and just log to console, or show a small temporary toast “Next steps coming in Step 3”.

Do not implement login, goal commit, DB writes, or emails yet.

2. STEP 2 – TESTS (PUBLIC FUNNEL ONLY)

Create real automated tests that validate the implemented Next.js pages, not static HTML under public.

Test file: tests/public-funnel-tests.mjs (or .js if you prefer, but update the script).

Script: npm run test:public-funnel should execute this file.

You can use either:

a lightweight JSDOM setup + React Testing Library to render the page components directly, or

a minimal Playwright / headless browser setup that hits http://localhost:3000 when next dev is running.

Whatever you choose, tests must fail if the React pages or links are missing. They must not just read public/*.html.

A. Public funnel navigation & page content (Step-2 scope only)

Landing → Welcome navigation

Render / (either via dev server or by importing src/app/page.tsx).

Assert:

The primary CTA button contains the correct label from features.md.

The button/link href points to /welcome.

Simulate a click (or read the Link href) and assert navigation target is /welcome.

Welcome page content

Render /welcome.

Assert:

Title equals exactly the text defined in key-pages-additional-notes.md → /welcome.

There are three paragraphs with the exact content (two normal, one italic).

The button label is CONTINUE.

The button/link href is /learning-guide-intro.

Learning-guide-intro page content & CTA

Render /learning-guide-intro.

Assert:

Title matches the “I'm your learning guide…” sentence from key-pages-additional-notes.md.

Two body paragraphs + one italic line are present.

The button label is I’M READY.

The button/link href is /journeys/goal-clarification/steps/TEST.

Learning-goal-confirmation dummy behaviour

Render /learning-goal-confirmation.

Assert:

The header “Let me see if I understood:” is visible.

The italic instruction line from key-pages-additional-notes.md is visible.

The goal paragraph shows the dummy goal value (e.g. “Improve my executive communication skills”).

Simulate editing the goal:

Trigger the edit control, change text to a new value.

Click Confirm.

Assert that the navigation target URL is /whats-next with ?goal=<edited-goal> in the query string.

Whats-next dummy behaviour

Render /whats-next?goal=Edited%20Goal%20Text.

Assert:

Title “You did it!” is visible.

Both static explanatory paragraphs are present (texts from key-pages-additional-notes.md → /whats-next).

The goal box shows “Edited Goal Text”.

The YES, I’M IN! button is present.

Simulate click on YES, I’M IN!:

Assert that, in Step 2, it:

Does not navigate away or call any backend URL, and

Executes only the no-op behaviour (e.g. console log or simple toast).

(You can mock console.log or check that no network calls were made if using a browser test.)