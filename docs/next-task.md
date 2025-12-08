Step 7: full working /my-profile & /journeys listing (final v1 profile)

follow the AGENTS.md instructions and implement the step below. Check the overall features to ensure your implementation is aligned to the bigger picture/project scope. After that, implement the tests below.

Read these project docs BEFORE coding anything:
- docs/features.md
- docs/prisma-database-structure.md
- docs/visual-guidelines.md
- docs/env-contents.md
- docs/image-checklist.md
- docs/implementation-steps.md
- docs/key-pages-additional-notes.md

Use Next.js 14 App Router (TypeScript + React) and the existing styling approach (Tailwind-like utility classes + gold/glass visual system). Do NOT implement new features as static HTML files under public/. All journeys and steps must be real app/ routes that can evolve and be tested properly.

Step 7 builds on:
- Step 3–4: /api/chat and need-analysis chat that emits create_learning_goal and redirects to /learning-goal-confirmation.
- Step 5: auth + goal-commit endpoint that creates personalized journeys (awaiting_review).
- Step 6: minimal /my-profile and /journeys listing (standard + personalized).

Your job now is to make journeys and step sessions fully usable, including the mark_step_completed command.


---

## 1. STEP 7 – IMPLEMENTATION (JOURNEY OVERVIEW + STEPS + mark_step_completed)

### 1.1 Scope of Step 7

Implement fully working journeys and step sessions:

- User-facing routes:
  - `/journeys` (public list of standard journeys – mostly done in Step 6, refine if needed).
  - `/journeys/[slug]` – journey overview (standard or personalized).
  - `/journeys/[slug]/steps/[stepId]` – step session chat (standard or personalized).
- Behaviour:
  - Correctly load journeys and their steps from the DB.
  - Enforce basic access rules for personalized journeys.
  - Allow users to open unlocked/completed steps and run a chat session for that step via /api/chat.
  - Implement mark_step_completed end-to-end so completing a step:
    - updates LearningJourneyStep in DB,
    - unlocks the next step,
    - and navigates the user back to the journey overview page.


### 1.2 Data & rules you must respect

Use docs/features.md and docs/prisma-database-structure.md as source of truth for semantics. In particular:

- Journeys:
  - `LearningJourney.isStandard = true` and `status = "active"` and `personalizedForUserId = null` → standard journey, public.
  - `LearningJourney.isStandard = false` and `personalizedForUserId = user.id` → personalized journey, visible only to that user.
  - Slug:
    - Used in `/journeys/[slug]` and `/journeys/[slug]/steps/[stepId]`.
    - Slugs already exist for at least:
      - “Goal Clarification” → `"goal-clarification"`.
    - Do NOT make slug editable from the UI in this step.

- Steps:
  - `LearningJourneyStep` belongs to one journey and one `LearningSessionOutline`.
  - `status` is `"locked" | "unlocked" | "completed"` (enforced by code, not necessarily DB).
  - `chatId` (on the step) links the step to its `LearningSessionChat` (one chat per step per journey per user).
  - `unlockedAt` is set when the step becomes available.
  - `completedAt` is set when the step is marked completed (once).

- Step unlocking model:
  - First step in a journey is unlocked by default when the journey becomes active (you can assume data is seeded / created accordingly).
  - A step can be opened if:
    - `status = "unlocked"` or `"completed"`.
  - When a step is marked completed:
    - Its `status` becomes `"completed"` (if not already).
    - Its `completedAt` is set (only the first time).
    - The next step (if any) becomes unlocked:
      - `status = "unlocked"` if it was `"locked"`.
      - `unlockedAt` is set if it was null.
  - Re-completing an already completed step must not regress or double-set timestamps.

- Chat model:
  - `LearningSessionChat` is the chat container.
  - For need-analysis, you already create/use a chat linked to the need-analysis outline and user.
  - For steps:
    - You must create and reuse a single chat per (journey step, user) using the `LearningJourneyStep.chatId` relation (do NOT add a journeyStepId field to LearningSessionChat).
    - Chat messages are stored in `Message` with optional `command` JSON field.


### 1.3 `/journeys` – public list of standard journeys (refine only if needed)

If Step 6 already implemented `/journeys`, keep it and only adjust where necessary to match the rules:

- Data:
  - Query all `LearningJourney` where:
    - `isStandard = true`
    - `status = "active"`
    - `personalizedForUserId IS NULL`
  - Order by `order` or `createdAt` (you choose, but be consistent).

- UI:
  - Show a grid or list of glass-effect cards with:
    - Journey title.
    - Short intro.
  - Each card links to `/journeys/[slug]`.

- Do NOT:
  - Show personalized journeys on this page.
  - Implement any admin controls here.


### 1.4 `/journeys/[slug]` – journey overview

Implement a Next.js App Router route at `app/journeys/[slug]/page.tsx` (or equivalent) with the following behaviour:

**1. Route resolution & access rules**

- Fetch the journey by slug from the main DB.
- If no journey exists → show a friendly 404-style “Journey not found” page within the existing layout.

- If `isStandard = true`:
  - Page is accessible to anyone (even unauthenticated).
  - No user-specific restrictions.

- If `isStandard = false` (personalized):
  - Require an authenticated user.
  - Only allow access if:
    - `personalizedForUserId === currentUser.id`.
  - If anonymous or different user:
    - Redirect to `/` or `/my-profile` with a lightweight error message.
    - Do NOT leak the existence of someone else’s journey.

**2. Data to load**

For a valid journey:

- Journey fields:
  - `title`
  - `intro`
  - `objectives` (JSON array)


- Steps:
  - Load `LearningJourneyStep[]`:
    - Filter by `journeyId = journey.id`.
    - Order by `order` ascending.
  - For each step include:
    - `status`
    - Linked `LearningSessionOutline.title`

**3. UI layout**

Align with the visual guidelines -- give a minimal luxury feeling:

- Background:
  - Same luxury gradient + glass card style as the funnel pages.
- Header:
  - Journey title in Playfair Display.
- Content:
  - Journey intro in a body paragraph.
  - Objectives as a bullet list if present.
- Steps list:
  - One row/card per step with:
    - Step title (from `sessionOutline.title`).
    - Optional status pill:
      - Completed → subtle green pill - text: Completed.
      - Unlocked → gold pill - text: Start.
      - Locked → grey pill - text: Locked.


**4. Interaction**

- Clicking on a step row:

  - If `status = "locked"`:
    - Do NOT navigate.


  - If `status = "unlocked"` or `"completed"`:
    - Navigate to `/journeys/[slug]/steps/[stepId]`.

- For personalized journeys:
  - Ensure links preserve any needed query params (e.g. `/journeys/[slug]/steps/[stepId]` should be enough, as you resolve the user from session).


### 1.5 `/journeys/[slug]/steps/[stepId]` – step session chat

Implement a Next.js route at `app/journeys/[slug]/steps/[stepId]/page.tsx` (or equivalent) that hosts the chat for a specific step.

**1. Route resolution & guards**

- Load the journey by slug and step by id and ensure:
  - `step.journeyId === journey.id`.
- Apply the same access rules as in `/journeys/[slug]`:
  - Standard journeys → open to all.
  - Personalized journeys → require current user and `personalizedForUserId === currentUser.id`.

- If any of these checks fail:
  - Return a friendly error or redirect to the journey page.

**2. Get or create the step chat**

You must use the existing schema (no new columns):

- If `step.chatId` is set:
  - Load the corresponding `LearningSessionChat` (and its messages, as your chat UI expects).

- If `step.chatId` is null:
  - Create a new `LearningSessionChat` row with:
    - `userId` = current user id (or null if you decide to allow anonymous runs on standard journeys).
    - `sessionOutlineId` = `step.sessionOutlineId`.
    - Any other required fields (timestamps, metadata).
  - Update the step:
    - `chatId = newChat.id`.
    - If this is the first time the user opens this step and `status = "locked"`, you may:
      - Either prevent entry (preferable) – but since you guard via status already, this situation ideally doesn’t happen.
      - Or upgrade to `status = "unlocked"` and set `unlockedAt`.

Keep the “one chat per step per user” invariant via `chatId` on the step.

**3. Chat UI integration**

- Reuse the same chat component / hook you implemented for need-analysis (Step 3–4), but configured for step sessions:
  - Pass the `sessionOutlineId` and `step.id` (journeyStepId) into the initial call to `/api/chat`.
- The step page should:
  - Render the chat UI with the coach avatar, bubbles, etc., using the existing visual style.
  - Show the step title and a short description at the top (from `LearningSessionOutline`).

**4. /api/chat extension for step sessions**

Extend the existing `/api/chat` implementation (do not create a new endpoint) so that it supports both modes:

- Need-analysis (already done).
- Journey step sessions (new for Step 7).

For journey step sessions:

- The client should include:
  - `sessionOutlineId` (always).
  - `journeyStepId` (for step sessions).
  - Chat identifier (if you already use one); or the backend can infer the `LearningSessionChat` via `journeyStepId` → `chatId`.

Backend behaviour (high-level):

- Resolve the correct `LearningSessionChat` for the step:
  - If `step.chatId` exists → use that.
  - If not → create the chat and update the step as described above.
- Build the prompt using:
  - `User.botRole`
  - `LearningSessionOutline.objective`
  - `LearningSessionOutline.content`
  - `LearningSessionOutline.botTools`
  - `LearningJourney.userGoalSummary` (if applicable)
- Stream / return messages as in need-analysis.
- Persist `Message` rows as you already do.
- If the assistant returns a JSON command, set `Message.command` for that assistant message.


### 1.6 mark_step_completed command handling

Implement the full flow for:

```json
{
  "command": "mark_step_completed"
}
generated by the assistant at the end of a step session.

1. Assistant side (botTools)

For step session outlines (not need-analysis), ensure LearningSessionOutline.botTools includes instructions telling the assistant:

When the user has clearly finished the step, send exactly:

{"command": "mark_step_completed"} as a pure JSON message (no extra text).

Only once per completion.

Do NOT break or change the need-analysis botTools (which use create_learning_goal).

2. Frontend – useChat handling

In your chat client logic (hook/component):

Detect when the last assistant message has command.command === "mark_step_completed" (or equivalent depending on how you store it).

When that happens:

Do NOT render the raw JSON in the chat bubbles.

Call a dedicated endpoint (see below) to mark the step as completed in the DB.

After a successful response:

Navigate back to /journeys/[slug].

Optionally show a minimal inline toast / banner “Step completed” on the journey page.

3. Backend – mark-step-completed endpoint

Implement a small API endpoint, e.g.:

POST /api/journeys/steps/[stepId]/complete

Or similar; pick a sane, REST-like path.

Behaviour:

Require an authenticated user if the journey is personalized (and enforce ownership).

Validate that the step exists and belongs to a journey the user is allowed to access.

Update the step:

If status !== "completed":

Set status = "completed".

Set completedAt = now() if null.

If already completed, keep completedAt unchanged.

Unlock next step (if any):

Load all steps for that journey ordered by order.

Find the next step after the completed one.

If next step’s status is "locked":

Set status = "unlocked".

Set unlockedAt = now() if null.

Return a JSON payload with the information the frontend needs to redirect and/or refresh:

nextUrl: "/journeys/[slug]".

Optionally, a summary of step statuses (but not required for this step).

Do NOT:

Write complex business logic into the route handler; prefer to extract a small helper function (e.g. completeStepAndUnlockNext(stepId, userId)) into a separate module (e.g. src/lib/journeys.ts) that you can test directly.

1.7 Edge cases / guardrails
Handle at least these cases gracefully:

User tries to open a personalized journey or step that belongs to another user:

Respond with a redirect or minimal error message, no data leakage.

User tries to call the mark-step-completed endpoint for a step they don’t own:

Return 403 and do not update the DB.

User opens a step where:

status = "locked":

They should not be able to run the chat; either redirect or show a “locked” message instead of the chat UI.

status = "completed":

They can re-open the chat, but mark_step_completed should be idempotent (no double unlocks or inconsistent state).

2. STEP 7 – TESTS (JOURNEYS + STEPS + mark_step_completed)
Create a new test file and script for Step 7.

2.1 Test harness setup
Add a new script in package.json:

"test:journeys-and-steps": "node tests/journeys-and-steps-tests.js"

Create tests/journeys-and-steps-tests.js that:

Uses plain Node.js (no heavy test framework).

Connects to the same Postgres DB as other tests, using the existing prisma config.

Prints clear, human-readable logs:

"[Test] ..."

" - Expectation: ..."

" ok: ..." / " FAIL: ..." with error details.

Cleans up any test data it creates (or uses a dedicated test schema if that’s already established).

Do NOT:

Call real LLM APIs or send real emails in tests.

Hit Next.js pages through a browser; focus on DB + server-side logic and small helper functions.

2.2 Tests to implement
You don’t need dozens of tests, but each of the following behaviours should be covered at least once. Feel free to factor out helpers to keep the file readable.

A. Journey access rules
Test: Standard journey is publicly visible

Seed or create a standard journey:

isStandard = true, status = "active", personalizedForUserId = null.

Check that your “load journey by slug” helper (the same logic used by /journeys/[slug]) returns the journey when no user is provided.

Log that standard journeys are visible without auth.

Test: Personalized journey is only visible to the owner

Create:

User A, User B.

Journey J with isStandard = false, personalizedForUserId = userA.id.

Using your load helper:

With user A → journey is returned.

With user B → journey is rejected (null / error).

With no user → journey is rejected.

Log these behaviours clearly.

B. Step list + statuses
Test: Steps are returned ordered and decorated correctly

For a given journey, create three steps with explicit order and varying statuses:

Step1: order = 1, status = "completed", completedAt set.

Step2: order = 2, status = "unlocked", unlockedAt set, completedAt = null.

Step3: order = 3, status = "locked".

Call a small helper used by /journeys/[slug] to fetch and map steps into the UI shape.

Assert:

Steps are in order 1, 2, 3.

The mapped statuses match.

Completed step includes a completedAt value; unlocked step has no completedAt.

C. Step chat wiring
Test: Opening a step creates (or reuses) a chat and links it via chatId

Set up a journey + step with status = "unlocked" and chatId = null.

Call a helper that encapsulates what the step page does for chat resolution (e.g. getOrCreateStepChat({ stepId, userId })).

Assert:

A LearningSessionChat record is created with:

sessionOutlineId = step.sessionOutlineId.

userId = user.id (if passed).

The step now has chatId = chat.id.

Call the helper again for the same step and user:

Assert it reuses the same chat (no new DB row created).

D. mark_step_completed behaviour
Test: Completing a step updates its status and unlocks the next

Prepare:

Journey J with three steps S1, S2, S3 ordered 1, 2, 3:

S1: status = "unlocked".

S2: status = "locked".

S3: status = "locked".

Call the same helper used by /api/journeys/steps/[stepId]/complete, e.g. completeStepAndUnlockNext(stepId, userId) on S1.

Assert in DB:

S1:

status = "completed".

completedAt is set (around now).

S2:

status = "unlocked".

unlockedAt is set.

S3:

Still status = "locked".

Test: Completing an already completed step is idempotent

Call the helper again on S1.

Assert:

completedAt for S1 did NOT change.

S2 and S3 statuses remain the same.

Log clearly that the operation is idempotent.

E. Access control on completion
Test: User cannot complete another user’s personalized step

Create:

User A, User B.

Personalized journey J owned by A with one step S (unlocked).

Call completeStepAndUnlockNext(S.id, userB.id) or hit the API with a mocked session for user B.

Assert:

The function/API returns an error/forbidden result.

S’s status, completedAt, and next steps are unchanged.

F. Integration glue (lightweight)
You don’t need full E2E, but add at least one “integration-style” check that the JSON returned from your completion endpoint is sane.

Test: Completion endpoint returns a nextUrl

Simulate an HTTP-like call to the completion endpoint handler with:

Valid user.

Valid step.

Assert:

The response status is 200.

The JSON payload contains:

nextUrl (e.g. /journeys/goal-clarification or the relevant slug).

Log that the frontend can safely redirect based on this.