feature/202512101719-step-8-9-admin-pages

follow the AGENTS.md instructions and read the project docs (features.md, prisma-database-structure.md, implementation-steps.md, visual-guidelines.md, image-checklist.md, env-contents.md) before you touch any code.

You are working on Steps 8 and 9 only. Steps 1–7 are already implemented (schema, seeding, public funnel, chat, goal commit, journeys, and step sessions), so:

- DO NOT change the Prisma schema or relations.
- DO NOT touch the public funnel pages (/ , /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next).
- DO NOT change /api/chat behaviour, need-analysis, create_learning_goal, or mark_step_completed semantics.
- DO NOT change the /journeys, /journeys/[slug], /journeys/[slug]/steps/[stepId], /my-profile, or auth flows.
- Only implement the admin pages and the tests described below.

Use the existing Next.js app, layouts, and visual guidelines (Playfair + Inter, gold-glass style) so the admin pages feel consistent but clearly “backend”.

---

## Step 8 — admin-sessions UI (CRUD for LearningSessionOutline)

**Goal:** `/admin/sessions` lets an admin manage `LearningSessionOutline` records: filter by journey, list outlines, create, edit, delete.

### 8.1 Routing & basic layout

- Create a protected route (or page) at:  
  `/admin/sessions`
- Reuse any existing admin layout if present; otherwise:
  - Left area: filters (journey selector + live toggle + search).
  - Main area: list of outlines as rows or cards.
- Require admin user:
  - If your project already has an admin guard, use it.
  - If not, add a minimal check reusing whatever you did for Step 7 admin-ish access. Do **not** invent a new auth system.

### 8.2 Data source

Use the existing Prisma models as defined in prisma-database-structure.md:

- `LearningJourney`
- `LearningSessionOutline` with fields:

  - `id: String @id`
  - `journeyId: String`
  - `slug: String`
  - `order: Int`
  - `live: Boolean`
  - `title: String`
  - `objective: String?`
  - `content: String`
  - `botTools: String`
  - `firstUserMessage: String`
  - `tags: Json?`
  - `createdAt`, `updatedAt`

**Important:**

- `slug` **IS editable** here and must be unique per journey (respect the uniqueness constraint from schema / docs).
- `content` is a **very large** textarea (for long prompt text).
- `botTools` is also a **large** textarea (multi-line; slightly smaller is fine, but not a single-line field).
- `objective` and `firstUserMessage` are normal text inputs or medium-size textareas.

### 8.3 Filters & listing behaviour

On `/admin/sessions`:

- At the top, show filters:
  - **Journey filter** (dropdown of `LearningJourney` records):
    - When a journey is selected, show only outlines for that `journeyId`.
    - When “All journeys” is selected, show all outlines.
  - **Live filter**:
    - Options: All / Live only / Not live.
  - **Search**:
    - Free text over `title` OR `slug`.

- List outlines in a table or cards:
  - Columns (at minimum): `title`, `slug`, `live`, `journey title`, `updatedAt`, and a compact “Edit” / “Delete” control.
  - Clicking a row or “Edit” opens the edit view (drawer, modal, or in-page form – your choice, but keep it simple and consistent).

### 8.4 Create / Edit outline

- Support **create**, **edit**, and **delete** actions.
- For create:
  - Require `journeyId`, `title`, `slug`, `content`, `botTools`, `firstUserMessage`.
  - Set a reasonable default for `order` (e.g. max(order) + 1 for that journey, or 1 if none exist).
  - `live` can default to `false`.

- For edit:
  - All the fields listed in features.md under admin-sessions must be editable:
    - `title`
    - `slug` (editable; unique-per-journey constraint)
    - `live`
    - `objective`
    - `content` (very large textarea)
    - `botTools` (large textarea)
    - `firstUserMessage`
    - `tags` (optional – JSON text input or a simple text field, up to you; no heavy UI needed)
  - Do **not** allow editing `id`, `createdAt`, `updatedAt` manually.

- Unsaved-edit UX:
  - If there are unsaved edits for an outline, highlight its card/row background (e.g. light yellow) until saved.
  - You can track “dirty” state in component state and use simple styling.

### 8.5 Delete rules

- Before deleting an outline:
  - Check if this `LearningSessionOutline` is used by any `LearningJourneyStep`.
  - If yes:
    - Show a confirmation message clearly stating that deleting the outline will also delete all related steps.
    - Only proceed if the admin confirms.
    - On confirm:
      - Delete the related `LearningJourneyStep` records.
      - Then delete the `LearningSessionOutline`.
  - If no steps are using it:
    - A simpler confirmation is enough (“Are you sure?”).

### 8.6 Visual style

- Use the existing admin / app styling primitives:
  - Same fonts (Playfair titles, Inter body).
  - Gold accents for primary buttons and toggles.
  - Cards can use the “glass-effect” style if already implemented or a lighter, cleaner admin variant of it.
- Keep it functional: this is a backend tool, not a marketing page.

---

## Step 9 — admin-journey UI (Full control over journeys and steps)

**Goal:** `/admin/journeys` lets an admin:

- Filter & browse `LearningJourney` records.
- Edit core journey fields (title, slug, intro, objectives, isStandard, personalizedForUser, status, userGoalSummary).
- Manage steps (`LearningJourneyStep`): add, assign outlines, see / edit ahaText, reorder, and inspect chat links.

### 9.1 Routing & layout

- Create a protected route at:  
  `/admin/journeys`
- Main sections:
  - Left/top: **journey filters** (see below).
  - Middle: list of journeys.
  - Right / detail panel or separate route: **journey detail with steps**.

### 9.2 Filters

At the top of `/admin/journeys`:

- Filter by:
  - `isStandard` (All / Standard only / Non-standard).
  - `personalizedForUser.email` (searchable dropdown or input-autocomplete).
  - `status` (All / draft / awaiting_review / active / completed / archived).

Use the Prisma relations as defined; you don’t need new schema fields.

### 9.3 Journey list & selection

- Show a list/table of journeys with:
  - `title`
  - `slug`
  - `isStandard`
  - `personalizedForUser.email` (if any)
  - `status`
  - `updatedAt`
- Clicking a journey opens its detail view (either inline panel or a dedicated page like `/admin/journeys/[id]` – choose whatever is simplest in this codebase).

### 9.4 Journey detail: editable fields

For the selected `LearningJourney`, the admin must be able to **view and edit**:

- `title` (text input)
- `slug` (text input, **BUT** non-editable when `status === "active"` – disable the field in that case)
- `intro` (textarea)
- `objectives` (textarea where each line is one objective; map to/from `Json` array)
  - On save: split by newline → JSON array `["line 1", "line 2", ...]`.
  - On load: join array with `\n`.
- `isStandard` (checkbox / toggle)
  - If `isStandard === true`:
    - Enforce `personalizedForUserId` / `personalizedForUser` is `null` in the backend logic.
- `personalizedForUser.email`
  - Only editable when `isStandard === false`.
  - Use a searchable user selector (or a simple email-backed input that looks up a user and sets `personalizedForUserId`).
- `userGoalSummary` (textarea)
  - Display-only semantics are fine for this step (do **not** implement new logic to auto-update it – just allow viewing and editing).
- `status` (select: `"draft" | "awaiting_review" | "active" | "completed" | "archived"`)
  - Respect the transitions described in features.md:
    - Default for manually created: `draft`.
    - AI-created journeys after need-analysis: `awaiting_review` (already handled by earlier steps; don’t re-implement).
    - Allow transitions as per spec (draft ↔ awaiting_review ↔ active, active ↔ completed, active → draft).

Also:

- If the journey has a step using the **need-analysis** outline and that step has a `chatId`:
  - Show a “Need-analysis chat” link that goes to `/chats/history/[chatId]`.

### 9.5 Steps list & editing

Below the journey fields, show the steps (`LearningJourneyStep[]`) for that journey, ordered by `order`.

For each step, display:

- `order` (index or number).
- `sessionOutline.title` (and maybe slug).
- `status` (`locked | unlocked | completed`).
- `unlockedAt`, `completedAt` (read-only; small text).
- `chatId` (if present) and a link to `/chats/history/[chatId]`.
- `ahaText` (short textarea).

Editable aspects:

- **sessionOutline**:
  - Provide a dropdown to change `sessionOutlineId` to another `LearningSessionOutline`.
  - The dropdown can show outlines from:
    - The same journey first.
    - Or all outlines (with some indication of which journey they belong to).
- **ahaText**:
  - Editable textarea per step.
- **Optional status override**:
  - If you want to support admin override (as allowed in features.md), you can expose a status dropdown for `locked/unlocked/completed`. If that adds too much complexity, you can keep status read-only for now and rely on existing Step 7 behaviour.

Adding steps:

- Provide an “Add step” button that:
  - Lets admin pick a `LearningSessionOutline` from a dropdown.
  - Creates a new step with:
    - `journeyId` = current journey.
    - `sessionOutlineId` = selected outline.
    - `order` = max order + 1.
    - `status` = `"locked"` by default (or reasonable default aligned with your existing step logic).

Reordering:

- Implement **some** way to reorder steps:
  - Ideal: drag & drop that updates `order` for all steps when dropped, saving to backend.
  - Acceptable fallback if drag&drop is too heavy:
    - Up/Down arrows per step that swap `order` with the adjacent step and persist.
- After reorder, the UI must reflect the new order without full-page reload.

### 9.6 Journey creation

- Allow creating a new journey from the admin UI:
  - Minimum fields: `title` (required), `isStandard` (default false), optional `slug`, `intro`.
  - Default:
    - `status = "draft"`.
    - `isStandard = false`.
    - `personalizedForUserId = null`.
- You do **not** need to implement AI journey generation here – this page is for manual maintenance.

### 9.7 Visibility rules (do not change behaviour)

Journey visibility rules for the **front-end user experience** are already implemented in previous steps. From the admin UI:

- Do **not** change how /journeys behaves.
- Just ensure that:
  - A journey appears as a **standard journey** when `isStandard = true`, `personalizedForUserId = null`, and `status = "active"`.
  - Personalized journeys stay tied to their user; you are not exposing public access here, only admin editing.

---

## Tests for Steps 8 & 9

Create **two** Node-based test files, following the existing style (like `tests/schema-and-seed-tests.js` and `tests/public-funnel-tests.js`):

- `tests/admin-sessions-tests.js`
- `tests/admin-journey-tests.js`

Use the same approach as previous tests:

- Plain Node (`node tests/admin-sessions-tests.js` etc.).
- Console logs with clear, human-readable descriptions of what’s being tested.
- Use Prisma directly where needed to assert DB state.
- No new test frameworks or dependencies.

### 10.1 tests/admin-sessions-tests.js

Focus on application behaviour of `/admin/sessions`:

1. **List & filter outlines**
   - Log: “[Test] admin-sessions lists outlines by journey and live status”.
   - Seed or assume there are at least two journeys and multiple outlines.
   - Programmatically simulate:
     - Fetching outlines for a specific journey via the backend handler (or direct Prisma + any API you expose).
     - Applying a “live only” filter.
   - Assert:
     - All returned outlines have the expected `journeyId`.
     - When “live only” is applied, all returned outlines have `live === true`.

2. **Create outline with large content and botTools**
   - Create a new outline with:
     - Long `content` (multi-line, large string).
     - Multi-line `botTools`.
   - Assert:
     - The outline is persisted with the same `content` and `botTools` values.
     - `slug` is unique within the journey.

3. **Edit outline fields (including slug)**
   - Update `title`, `slug`, `live`, `objective`, `content`, `botTools`, `firstUserMessage`.
   - Assert:
     - All fields are updated correctly in DB.
     - Editing `slug` respects the uniqueness constraint (e.g. trying to duplicate slug within the same journey should fail gracefully; you can log this as a negative test).

4. **Delete outline with and without steps**
   - Case A: Outline without steps:
     - Delete it.
     - Assert it is removed from DB and no steps were affected.
   - Case B: Outline with associated `LearningJourneyStep` records:
     - Delete it via the same logic as the UI.
     - Assert:
       - All related `LearningJourneyStep` records are also deleted.
       - The outline is deleted.

Each test should print a clear explanation of the expectation and whether it passed.

### 10.2 tests/admin-journey-tests.js

Focus on `/admin/journeys` behaviour:

1. **Filter journeys**
   - Log: “[Test] admin-journey filters journeys by isStandard, status, and user email”.
   - Assert:
     - `isStandard` filter returns only journeys with matching flag.
     - `status` filter returns journeys with matching status.
     - Filtering by `personalizedForUser.email` returns only journeys linked to that user.

2. **Edit journey fields**
   - Pick a journey in `draft` status.
   - Update:
     - `title`, `slug`, `intro`, `objectives` (multi-line -> JSON array), `isStandard`, `userGoalSummary`, `status`.
   - Assert:
     - The JSON `objectives` field matches the lines you set.
     - `slug` cannot be changed once you set `status = "active"` and re-save (i.e. your code prevents or rejects it).

3. **Assign / change personalized user**
   - For a non-standard journey:
     - Assign `personalizedForUser` by email.
     - Assert DB has `personalizedForUserId` set correctly.
   - Try to set `isStandard = true` while `personalizedForUserId` is not null:
     - Assert the backend prevents this (e.g. error or validation).

4. **Steps: add, edit, reorder**
   - Add a new step via the admin logic:
     - Choose an outline.
     - Assert a `LearningJourneyStep` is created with correct `journeyId`, `sessionOutlineId`, and `order`.
   - Update `ahaText` and (optionally) status for a step:
     - Assert changes are persisted.
   - Reorder two steps (via your reorder function):
     - Assert their `order` values are swapped or updated as intended.
     - Assert a subsequent query returns them in the new order.

5. **Need-analysis chat link**
   - Setup:
     - A journey with a step whose outline slug is `need-analysis` (or however you detect it) and a non-null `chatId`.
   - Assert:
     - The admin detail view exposes a link that would go to `/chats/history/[chatId]` for that step.

As with other tests, each block should log a human-friendly description of:

- What behaviour is expected.
- What was actually checked.
