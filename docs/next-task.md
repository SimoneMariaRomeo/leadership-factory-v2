# NEXT TASK — Step 6: full working /my-profile & /journeys listing (final v1 profile)

Branch: `feature/202512081003-step-6-profile-and-journey-list`

Follow **AGENTS.md** and available /docs. Reuse the patterns, style, and choices already made in Steps 1–5.

This step assumes:

- Prisma schema and seed for journeys/sessions are in place (Step 1).
- Public funnel + visual style are implemented in the real Next.js app (Step 2 rework).
- `/api/chat` + need-analysis chat work with the new models (Step 3).
- `create_learning_goal` is wired to `/learning-goal-confirmation` (Step 4).
- Auth + goal-commit from `/whats-next` are implemented and create a personalized journey (Step 5).

Your mission now: give the user a **real, meaningful home** after committing their goal: `/my-profile` + `/journeys` listing, with nav + logout and a small first-time profile tour.

---

## 1. Scope & non-goals

**In scope for Step 6**

- Implement **/my-profile** page:
  - Auth-protected.
  - Shows the user’s current goal and journeys.
  - Has a “Recommended journey” box with the latest personalized journey (if any).
  - Lists **all personalized journeys** for that user.
  - Includes links to **standard journeys**.
  - Includes a simple **first-time user tour** (client-side flag).

- Implement **/journeys** list page:
  - Lists **standard journeys only** (`isStandard = true AND status = "active"`).
  - Uses the same gold / glass visual language as the funnel pages.
  - Each journey card links to `/journeys/[slug]` (even if that page is still a placeholder for Step 7).

- Implement or extend a **shared top nav**:
  - `Home` → `/`
  - `Learning Journeys` → `/journeys`
  - `Profile` → `/my-profile`
  - Login/logout on the right side, reusing the auth state from Step 5.

- Implement a **Logout** flow (in terms of UI and wiring to existing auth), using the same cookies / session mechanism created for Step 5.

---

## 2. Behaviour & data rules

### 2.1 Auth and access rules

- `/my-profile`:
  - **Requires auth**.
  - For unauthenticated users:
    - Use the same pattern you used for `/whats-next` to force login/signup (redirect or inline modal, whichever is already implemented).
  - After successful login, redirect back to `/my-profile`.

- `/journeys`:
  - Route itself can remain technically “public”, but for Step 6:
    - In the **top nav**, show `Learning Journeys` only when the user is **logged in**.
    - If a **guest** hits `/journeys` directly:
      - Show a simple centered card: “Please sign in to explore journeys” and a button that triggers login using the existing auth flow.
    - If a **logged-in user** hits `/journeys`:
      - Show the list of **standard journeys** (see below).

### 2.2 /my-profile — what to show

On `/my-profile` for a logged-in user:

1. **Top section — Hero + current goal**

   - A hero card using the same glass / gold gradient language as the funnel.
   - Shows:
     - A welcome line like: “Welcome back, [first name or email]”.
     - If `User.learningGoal` is set:
       - Title: “Your current learning goal”
       - The goal text.
       - Optionally the date from `learningGoalConfirmedAt`.
     - If `User.learningGoal` is **not** set:
       - Friendly empty state:
         - “You haven’t committed a learning goal yet.”
         - A button linking to `/welcome` to start the flow.

2. **Recommended journey card**

   - Logic:
     - Query all **personalized journeys** for this user:
       - `isStandard = false`
       - `personalizedForUserId = currentUser.id`
       - `status NOT IN ["archived"]`
     - Pick the **latest** by `createdAt` (if tie, break by `updatedAt`).
   - If one exists:
     - Show a glass card titled “Recommended journey”.
     - Display:
       - Journey `title`
       - `status` badge (`awaiting_review`, `active`, `completed`, etc.).
       - Short snippet from `intro` (if present).
     - Add a primary button:
       - Label: “View journey”
       - Link to `/journeys/[slug]`.  
         For Step 6, `/journeys/[slug]` can be a **placeholder page** that just says “Journey details coming soon in the next step”.
   - If none exists:
     - Show a friendly placeholder card:
       - “Your recommended journey will appear here as soon as we build it from your goal.”
       - If the user has a `learningGoal`, you can mention:  
         “We’ll soon build a journey around: [goal text]”.

3. **Personalized journeys list**

   - Below the recommended journey card, show a section:
     - Title: “Your journeys”.
   - Query personalized journeys again (same criteria as above).
   - If there are journeys:
     - Render a list or grid of cards, one per journey:
       - `title`
       - `status` badge
       - Optionally `userGoalSummary` snippet.
       - A small secondary link/button: “Open journey” → `/journeys/[slug]` (placeholder for now).
   - If there are **no** journeys:
     - Show an empty-state card:
       - “You don’t have any journeys yet.”
       - If the user **has** a goal:
         - Text: “We’ll turn your goal into a journey soon. You’ll see it here.”
       - If the user **has no goal**:
         - Button: “Start from the beginning” → `/welcome`.

4. **Standard journeys access**

   - At the bottom or in a side section, add a small block:
     - Title: “Explore standard journeys”.
     - Either:
       - Add a button: “Browse journeys” → `/journeys`.
       - Or list a few top standard journeys (titles only) and a “View all” link to `/journeys`.

### 2.3 /journeys — list of standard journeys

On `/journeys`:

- Only show **standard journeys**:

  ```ts
  where: {
    isStandard: true,
    status: "active",
  }
For each standard journey:

Show:

title

intro snippet.

A small “Template” tag or similar (to distinguish from personalized journeys in future steps).

Each card links to /journeys/[slug].
For Step 6, /journeys/[slug] is still a placeholder like:

Title: journey title

Text: “Full journey view (steps + sessions) will be implemented in the next step.”

If there are no standard journeys seeded yet:

Show a neutral empty-state card:

“No standard journeys are available yet. An admin will add them soon.”

2.4 Top navigation & logout
Implement a shared nav used across the app (reuse or refactor any existing header into one consistent component).

Nav content for desktop:

Left side:

Logo / brand.

Links:

Home → /

Learning Journeys → /journeys (only show when logged in)

Profile → /my-profile (only show when logged in)

Right side:

If not logged in:

Show a Login button that triggers the existing auth mechanism from Step 5.

If logged in:

Show the user email or avatar (if available).

Show a Logout button.

Logout behaviour:

Reuse the same auth system as Step 5 (do NOT invent a new one).

Implement a small endpoint (if not already present), e.g. /api/auth/logout, that:

Clears the auth cookie / token.

Returns 200.

Hook the Logout button to:

Call the logout endpoint.

On success, redirect the user to / and refresh client-side auth state.

3. /my-profile first-time tour
Implement a lightweight client-side tour for /my-profile:

No DB migration in Step 6. Use localStorage to store a flag, e.g. lf_my_profile_seen = "true".

Behaviour:

On first visit to /my-profile (when running in the browser & user is logged in):

If localStorage.getItem("lf_my_profile_seen") is missing:

Show a dismissible tour card at the top of the page.

Example content:

Title: “Welcome to your profile”

Bullet points:

“See your current learning goal.”

“Follow your recommended journey.”

“Browse all your journeys and standard programs.”

Primary button: “Got it”.

When clicking “Got it”:

Hide the card.

Set localStorage.setItem("lf_my_profile_seen", "true").

On subsequent visits:

Do not show the tour card if the flag is set.

Make sure this logic runs only on the client (guard against SSR).

4. Implementation constraints
Do NOT touch the Prisma schema or migrations in this step.

Do NOT modify /api/chat or the goal-commit logic created in Step 5.

Do NOT change the need-analysis behaviour.

Respect the visual guidelines (fonts, colours, gold gradients, glass cards) already specified in the design docs.

Keep the CSS / component structure consistent with what you created in Steps 2–5.

5. TESTS TO CREATE — tests/profile-and-journeys-tests.js
Create a new test file:

tests/profile-and-journeys-tests.js

Add a script in package.json (if not already present):

json
Copy code
"test:profile-and-journeys": "node tests/profile-and-journeys-tests.js"
The tests should focus on real behaviour (auth, DB state, routes, and rendered content), not pure unit tests.

For each test, log a human-readable explanation before assertions (same style as test:schema-and-seed and test:public-funnel).

A. Auth gating and nav visibility
/my-profile requires login

Start with no auth cookie.

Request /my-profile.

Assert:

Response is either:

A redirect to the login/auth flow, OR

An HTML page that contains the inline auth UI (use the same pattern as /whats-next).

Log clearly which behaviour is expected based on your existing auth implementation.

Nav items depend on auth

As guest (no auth):

Fetch the home page.

Assert nav does not show links to /journeys or /my-profile.

Assert a Login button is visible.

As logged-in user:

Fetch the home page with a valid auth session.

Assert nav does show links to /journeys and /my-profile.

Assert Logout is visible.

B. /journeys standard list vs personalized
/journeys shows only standard journeys

Seed DB (or rely on existing seed) with:

At least one standard journey (isStandard = true, status = "active").

At least one personalized journey for some user (isStandard = false, personalizedForUserId not null).

As logged-in user:

Request /journeys.

Assert:

The titles of standard journeys appear.

Titles of personalized journeys do not appear.

Assert that each journey card links to /journeys/[slug].

Guest view of /journeys

As guest:

Request /journeys.

Assert you see a gating message (e.g. “Please sign in to explore journeys”) instead of the full journey list.

C. /my-profile content & journeys
Profile shows current goal and recommended journey

Use a test user who:

Has learningGoal set.

Has at least one personalized journey (created via the goal commit endpoint from Step 5).

As that user:

Request /my-profile.

Assert:

The current goal text is visible.

A “Recommended journey” card is visible.

The journey shown as recommended is the latest personalized journey for that user (by createdAt).

The card includes its title and a status label.

Profile shows all personalized journeys

For the same user, create at least two personalized journeys with different statuses.

Request /my-profile.

Assert:

A “Your journeys” section is visible.

Both journeys appear in the list with their correct statuses.

Each has some link/button pointing to /journeys/[slug].

Empty-state behaviour when no journeys

Use a user that:

Either has no learningGoal, or has a goal but no personalized journeys yet.

As that user:

Request /my-profile.

Assert:

The recommended journey card shows the empty placeholder text (no journey details).

The “Your journeys” section shows a friendly “no journeys yet” message.

There is a clear CTA to either:

Start the funnel (/welcome), or

Wait for journeys (if a goal already exists).

D. First-time /my-profile tour
Profile tour appears only on first visit (client-side)

This test can be a higher-level or pseudo-browser test if needed:

Simulate a logged-in browser context with cleared localStorage.

Load /my-profile.

Assert:

A tour card with welcome text is rendered.

Simulate clicking “Got it”.

Assert:

localStorage now contains lf_my_profile_seen = "true".

Reload /my-profile.

The tour card is no longer rendered.

If this is hard to do in pure Node tests, at minimum:

Document the expected behaviour in test logs.

Add a small check using your chosen browser/test framework later.

E. Logout flow
Logout clears session and updates nav

Start as logged-in user.

Request /my-profile (assert it loads correctly).

Trigger Logout (e.g. send POST/GET to the logout endpoint you implement).

After logout:

Request /.

Assert:

Nav no longer shows /journeys and /my-profile links.

Login button is visible again.

Request /my-profile:

Assert you are redirected / gated by auth again (same as in test A.1).