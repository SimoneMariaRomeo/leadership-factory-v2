Step 5: Auth + goal commit endpoint from /whats-next

Goal: Make /whats-next persist the confirmed learning goal and create a personalized journey for the authenticated user (no admin UI yet).

You must follow AGENTS.md, the product spec, the Prisma schema, the visual guidelines, and existing implementation notes. Do not re-invent architecture, do not add extra features, and do not break Steps 1–4.

0. Context & Assumptions

Assume the following are already working and tested from previous steps:

Prisma schema and seed for:

User, LearningJourney, LearningSessionOutline, LearningJourneyStep, LearningSessionChat, Message.

Need-analysis:

Standard journey “Goal Clarification” with need-analysis outline and step.

/journeys/goal-clarification/steps/[need-analysis-step-id] runs chat via /api/chat.

Bot can emit { "command": "create_learning_goal", "learningGoal": "..." }, handled by useChat to:

Store learningGoalPending client-side.

Navigate to /learning-goal-confirmation.

/learning-goal-confirmation:

Reads the pending goal (from client state) and displays it.

Allows inline edit.

On Confirm → stores the edited goal into pending state and redirects to /whats-next.

/whats-next:

Layout, copy, and goal box are implemented following the visual guidelines.

The YES, I’M IN! button exists but currently has either a no-op or placeholder handler.

.env values for:

JWT_SECRET

NOTIFICATION_EMAIL_*

DB URLs, DEFAULT_API, etc.

This step is only about:

Implementing minimal email/password auth with JWT cookies (/api/auth/*) so we can know currentUser.

Implementing a goal-commit backend (via /api/whats-next) that:

Requires an authenticated user.

Writes User.learningGoal and User.learningGoalConfirmedAt.

Creates a non-standard, personalized LearningJourney for that user.

Sends user + admin emails.

Wiring /whats-next so that YES, I’M IN! correctly:

Forces login/signup if needed.

Calls the goal-commit endpoint.

Redirects to /my-profile on success.

No admin UI. No journey steps generation. No AI call for journey content yet.

1. Implementation — Auth (/api/auth/*)
1.1 Backend routes

Implement the following Next.js route handlers in src/app/api/auth (App Router style), matching the behaviour described in the product spec:

POST /api/auth/signup

Body: { email: string, password: string, name?: string }.

Validate email format and minimum password length.

If a user with that email already exists → return 400 with a clear error.

Hash password using a standard algorithm (e.g. bcrypt) and store in User.passwordHash.

Create User row; leave learningGoal and other optional fields as null.

Generate a JWT with at least userId and set it as HttpOnly cookie (respecting JWT_SECRET).

Response: 200 with a small JSON payload such as { user: { id, email, name } }.

POST /api/auth/login

Body: { email: string, password: string }.

Look up user by email; compare password with stored hash.

On failure → 401 with generic “invalid credentials” (don’t leak which field is wrong).

On success → issue the same HttpOnly JWT cookie as in signup.

Response: 200 with { user: { id, email, name, learningGoal? } }.

POST /api/auth/logout

Clear the JWT cookie (set expired).

Response: 200 { success: true }.

GET /api/auth/me

Read JWT cookie, verify using JWT_SECRET.

If invalid or missing → 200 with { user: null }.

If valid → load user from DB and return { user: { id, email, name, learningGoal? } }.

1.2 Auth utility

Create a small shared helper (e.g. src/server/auth/session.ts):

getCurrentUser(req):

Reads JWT from request cookies.

Verifies token and fetches the user row (id, email, name, learningGoal).

Returns null when not authenticated.

requireUser(req):

Uses getCurrentUser.

If no user → throws/returns a 401 response.

If user exists → returns the user.

Use this helper in /api/whats-next (see below) and for any future endpoints that need auth.

1.3 Frontend auth usage (for this step)

Do not build full nav-level login/logout yet.

You only need enough auth hooks for /whats-next:

A tiny useAuth helper or inline logic that can:

Call GET /api/auth/me (on mount or on demand) to know if the user is logged in.

Open a minimal auth modal when the user clicks YES, I’M IN! and they’re not authenticated.

Inside the modal:

Toggle between Login and Sign up modes.

Call the corresponding /api/auth/login or /api/auth/signup.

On success, close the modal and mark the user as logged in.

Keep UI minimal and consistent with existing styles (Playfair + Inter, glass cards, gold buttons). Reuse the gold button styling already in the project; do not invent a new style system.

2. Implementation — Goal commit endpoint (/api/whats-next)
2.1 Route handler

Implement POST /api/whats-next as the single source of truth for:

Persisting the confirmed goal for the current user.

Creating a fresh personalized journey.

Triggering emails.

Returning redirect info to the frontend.

Input:

JSON body: { learningGoal: string }.

Frontend must send the final goal text shown in /whats-next (which originated from need-analysis + possible edits).

Auth:

Use requireUser(req) to ensure the user is authenticated.

If unauthenticated → return 401, do not write anything to DB, do not send emails.

2.2 DB logic (Prisma)

Using a single Prisma transaction:

Update the user:

user.learningGoal = learningGoal (from request).

user.learningGoalConfirmedAt = new Date() (now).

Create a personalized journey:

Model: LearningJourney.

Fields:

title: simple placeholder for now, e.g. Personal journey for: ${learningGoal}.

intro: null (AI-driven intro will be added in a later step).

objectives: null or [] (will be populated later).

isStandard = false.

personalizedForUserId = user.id.

userGoalSummary = learningGoal.

status = "awaiting_review".

slug = null for now (slugging and email links for journeys will be handled in a later step; don’t over-engineer).

Do not create steps yet. This step only creates the journey “shell”.

Make sure the transaction returns the created journey (at least id and personalizedForUserId) to the handler.

2.3 Email sending

Using the SMTP config from .env:

User email:

To: current user email.

Subject: something like “Your new learning goal is confirmed”.

Body (plain text or simple HTML):

Congratulate the user.

Include the goal text.

Mention that their personalized journey is being prepared.

Provide a link to https://www.leadership-factory.cn/my-profile (hardcode domain for now).

Admin email:

To: NOTIFICATION_EMAIL_TO.

Subject: e.g. “New learning goal from ${user.email}”.

Body:

User email.

Learning goal text.

New journey id (and possibly status).

A future-facing link such as https://www.leadership-factory.cn/admin/journeys/${journey.id} (even if admin UI is not implemented yet).

Implement email sending in a small utility (e.g. src/server/notifications/email.ts) so tests can stub/mock it:

The goal-commit handler should not contain raw SMTP wiring; it should call a function like sendGoalCommitEmails({ user, learningGoal, journey }).

If sending fails, log the error and still return 200 if DB writes succeeded (for now). Do not roll back the whole transaction on email failure.

2.4 Response shape

Return 200 with JSON like:

{
  "success": true,
  "journeyId": "<new-journey-id>"
}


No redirect from the API itself; frontend will handle navigation to /my-profile.

3. Implementation — Wiring /whats-next

Update /whats-next page to follow this exact behaviour:

3.1 Goal display

Read the pending goal from the same client state used in Step 4 (e.g. sessionStorage.learningGoalPending or an equivalent mechanism already implemented).

If a goal is available:

Show it inside the highlighted learning goal box (purple-tinted background).

If no goal is available:

Show a safe fallback message like:

“No learning goal found. Please start again from the beginning.”

Disable/hide the YES, I’M IN! button or link back to /learning-guide-intro.

Do not call the backend in this case.

3.2 YES, I’M IN! button logic

When the user clicks YES, I’M IN!:

If no pending goal → do nothing except maybe redirect back as per fallback (see 3.1).

If goal present but user not authenticated:

Open the auth modal.

After successful login/signup:

Close the modal.

Automatically proceed to Step 3 (commit).

If goal present and user authenticated:

Call POST /api/whats-next with body { learningGoal }.

While the request is in flight:

Disable the button or show a small loading state.

On 200:

Clear the pending goal from client state (learningGoalPending).

Redirect the user to /my-profile.

On error (4xx/5xx):

Show a simple error message on the page.

Re-enable the button.

Important: Do not call /api/whats-next before the user is logged in.

4. Tests — tests/goal-commit-tests.js

Create a new Node test script tests/goal-commit-tests.js and wire it in package.json:

"scripts": {
  ...
  "test:goal-commit": "node tests/goal-commit-tests.js"
}


Follow the style of existing tests:

No external test framework required (you can just console.log and throw on failure).

Each test block logs a human-readable description of what is being validated.

Reuse the existing Prisma setup/tests pattern (e.g. from tests/schema-and-seed-tests.js).

You do not need to spin up a full HTTP server. Instead:

Import the POST handler from src/app/api/whats-next/route and the auth helpers.

Use Prisma directly to inspect DB state.

For auth, you can:

Either generate a JWT manually and mock a NextRequest with cookies.

Or factor the goal commit logic into a pure function that takes { userId, learningGoal } and test that directly, leaving the route handler thin.

4.1 Suggested test scenarios

You must cover at least the following:

Unauthenticated user cannot commit goal

Arrange: no JWT / getCurrentUser returns null.

Act: call POST /api/whats-next with a learningGoal.

Assert:

Response status is 401.

No User.learningGoal is changed in DB.

No new LearningJourney is created.

Goal commit persists user goal and timestamp

Arrange:

Create a User via Prisma with learningGoal = null.

Act:

Simulate an authenticated request as that user, calling POST /api/whats-next with learningGoal = "Improve my executive communication skills".

Assert:

Response status 200 and success: true.

User row now has:

learningGoal === "Improve my executive communication skills".

learningGoalConfirmedAt is set to a recent timestamp.

Goal commit creates a personalized journey

Arrange:

Same user as in test 2 (or reset).

Act:

Call the endpoint with a goal.

Assert:

Exactly one new LearningJourney is created for that user with:

isStandard === false.

personalizedForUserId === user.id.

userGoalSummary === learningGoal.

status === "awaiting_review".

No steps are created for that journey yet.

Repeat commit creates additional journeys, keeps history

Arrange:

Existing user with one personalized journey already.

Act:

Call POST /api/whats-next again with a different goal.

Assert:

User.learningGoal is overwritten with the new goal.

learningGoalConfirmedAt is updated.

A second LearningJourney is created (total two).

The old journey still exists and retains its original userGoalSummary.

Emails are triggered with correct payload (mocked)

Arrange:

Stub/mocking layer for the email utility so that it records calls instead of sending real emails.

Act:

Successful goal commit for a user with email test@example.com.

Assert:

Email mock records:

One email to the user address including the goal in the body.

One email to the admin address (NOTIFICATION_EMAIL_TO) including:

User email.

Goal.

Created journey id (or URL containing it).

Endpoint ignores client-supplied userId

Arrange:

User A (authenticated) and some fake userId B.

Act:

Call POST /api/whats-next with body { learningGoal, userId: "B" }.

Assert:

The journey is created only for user A (personalizedForUserId === A.id).

No journey is created for any other user.

This confirms backend derives user solely from auth, not from request body.