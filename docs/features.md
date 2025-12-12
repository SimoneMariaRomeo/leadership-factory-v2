# leadership-factory-v2

1. Product Objective & Core Flow
1.1 High-level user flow

User lands on the website (/ → home).

They see 1–2 intro pages explaining how the platform works.

They are sent to the need-analysis session (a special LearningSessionOutline).

The bot runs a conversation and eventually emits a JSON command to propose a learning goal.

Frontend intercepts the command and navigates the user to /learning-goal-confirmation.

/learning-goal-confirmation shows the proposed goal; the user can edit/confirm it.

On confirm, the user is redirected to /whats-next.

/whats-next:

If the user is not logged in, forces signup/login (email/password).

After login:

Saves the confirmed goal to User.learningGoal and User.learningGoalConfirmedAt.

Creates a new personalized LearningJourney (awaiting_review).

Sends:

a cheerful email to the user about their new learning goal.

an email to the admin with user email, goal, and link to admin journey view.

Redirects the user to /my-profile.

From /my-profile, the user can:

Explore their profile and see their journeys.

Open standard journeys from a “Learning Journeys” menu.

Later, when admin activates their personalized journey, the user receives another email with a direct link to that journey.

Admin side:

Admin reviews the new user’s goal and the AI-generated journey (draft).

Admin creates/edits LearningSessionOutlines if needed.

Admin updates the journey’s steps (LearningJourneyStep) to select the right sessions and order.

Admin sets journey status to active via an admin action.

On activation, an email is sent to the user with a link to their journey.

1.2 Behaviour when user repeats need-analysis

If a user who already has a confirmed learning goal runs need-analysis again:

User.learningGoal is overwritten with the new goal.

A new personalized journey is created.

Old journeys remain available; the user can have multiple personalized journeys.

1.3 Behaviour for guests who never log in

If the user does the need-analysis as a guest and leaves before login:

The provisional goal and chat are not persisted to a user.

Effectively, everything is lost from their perspective.

2. Data Model: Key Concepts
2.1 LearningJourney types

Unify standard and personalized journeys into a single model with flags:

Standard journey (global, reusable):

isStandard = true

personalizedForUserId = null

status = active → visible in public “Learning Journeys” list.

Personalized journey (one user, AI or manually created):

isStandard = false

personalizedForUserId = user.id

Used as the user-specific plan.

Constraints (UI should enforce):

If isStandard = true ⇒ personalizedForUserId must be null.

If personalizedForUserId is set ⇒ isStandard must be false.

Admins can:

Toggle isStandard on/off (respecting the above constraint).

Assign/Change personalizedForUser (for non-standard journeys).

Duplicate journeys (e.g. from standard to personalized copy).

2.2 Key relations

User:

Has many LearningSessionChat (need-analysis and step chats).

Has many LearningJourney where personalizedForUserId = User.id.

LearningJourney:

Optional slug (used for routing to standard journeys and personalized journeys; slug should become non-editable once journey is active).

Has many LearningJourneyStep (ordered steps).

LearningSessionOutline:

Global pool; does not belong to a single journey. Slug is unique globally. Steps point to an outline to reuse it across journeys.

LearningJourneyStep:

Belongs to one LearningJourney.

References one LearningSessionOutline (no “content-only” steps).

Optionally references a LearningSessionChat when the user runs that step.

LearningSessionChat:

References an optional User, an optional LearningSessionOutline, and an optional LearningJourneyStep.

Contains many Message records.

3. Prompt Construction & Assistant Commands
3.1 Prompt structure for LearningSessionChat

For any chat (need-analysis or step session), backend builds the system/user message for the LLM using:

User.botRole

LearningSessionOutline.objective

LearningSessionOutline.content

LearningSessionOutline.botTools

LearningJourney.userGoalSummary (when available)

Recommended structure (for coding assistant):

[User.botRole]

Session objective:
[LearningSessionOutline.objective]

Instructions:
[LearningSessionOutline.content]

Tools and JSON commands you can use:
[LearningSessionOutline.botTools]

Current user goal:
[LearningJourney.userGoalSummary or "not defined yet"]


For the first turn (before user types), the backend also includes:

LearningSessionOutline.firstUserMessage as the first user message.

3.2 JSON commands emitted by the assistant

We support two commands in v2:

Create learning goal (need-analysis only)

Recommended JSON shape (more consistent than using the key as command name):

{
  "command": "create_learning_goal",
  "learningGoal": "string"
}


Behaviour:

useChat intercepts command === "create_learning_goal".

It stores the learningGoal in client state (e.g. sessionStorage.learningGoalPending).

Navigates to /learning-goal-confirmation.

Important: the goal is only saved to DB after login on /whats-next.

Mark step completed

When running a journey step session, the assistant can emit:

{
  "command": "mark_step_completed"
}


Behaviour:

useChat calls a backend endpoint to:

set LearningJourneyStep.status = "completed"

set completedAt if not already set.

Then navigates back to the journey page (e.g. /journeys/[slug]?userId=...).

3.3 botTools meaning

LearningSessionOutline.botTools is plain text, not JSON.

It explains to the assistant which JSON commands it can emit and under which conditions (e.g. when to call confirm_learning_goal or mark_step_completed).

Example content:

“At the end of the conversation, if the user is ready to commit to a learning goal, emit a JSON object: { "command": "create_learning_goal", "learningGoal": "..." }. Do not emit this command until the goal is clear and specific.”

4. admin-sessions (Session Outlines Management)
4.1 Scope

admin-sessions is the backend UI to manage global LearningSessionOutline records.

4.2 Behaviour

Admin can:

Create a new outline (global).

Edit an existing outline.

Delete an outline.

Fields editable in admin-sessions:

title: String

slug: String (unique globally)

live: Boolean

objective: String?

content: String (large textarea)

botTools: String (free text explaining JSON tools)

firstUserMessage: String

Optionally, some tags/metadata (tags).

Behavioural touches:

If there are unsaved edits, the outline row/card background turns light yellow.

Search/filter options:

Filter by journey (show outlines that are linked to steps in that journey).

Filter by live status.

Search by title or slug.

Deletion rules:

If an outline is used by any LearningJourneyStep, the UI must:

Show a confirmation that deleting it will also delete all those steps.

On confirm, delete the steps and then the outline.

No drag&drop ordering here:

Ordering of steps is managed in admin-journey, not admin-sessions.

5. admin-journey (Journeys & Steps Management)
5.1 Scope

admin-journey is the backend UI to manage LearningJourney and LearningJourneyStep.

5.2 Filters

Admins can filter journeys by:
 

isStandard (true/false)

personalizedForUser.email (dropdown or searchable selector)

status (“draft”, “awaiting_review”, “active”, “completed”, “archived”)

5.3 Editable fields for each journey

For each LearningJourney, admin can see and edit:

title: String

slug: String?

Slug used in routes like /journeys/[slug]?userId=....

Slug not editable once status = "active".

intro: String?

objectives: Json?

UI: a textarea where each line is an objective.

Backend: lines → ["line1", "line2", ...].

isStandard: Boolean

If true, personalizedForUser must be empty.

personalizedForUser.email

Dropdown or search to assign a user (only allowed when isStandard = false).

userGoalSummary: String?

Snapshot of the goal at creation; updated whenever user changes goal (per your decision). When User.learningGoal changes, update userGoalSummary on the most recent non-archived personalized journey; older journeys keep their original snapshot.

If the journey has a step using the need-analysis outline, show a Need-analysis chat link using the most recent chat for that step (if present).

Link opens the transcript view (e.g. /chats/[chatId]).

status: "draft" | "awaiting_review" | "active" | "completed" | "archived"

Journey status logic:

When admin manually creates a journey:

status = "draft" by default.

When AI creates a journey after need-analysis:

status = "awaiting_review".

Admin can transition:

draft → awaiting_review (optional)

draft → active

awaiting_review → active

active → draft (if they want to “pull it back”)

active → completed and vice versa if needed (though normally completed should be triggered by user progress).

completed is ideally set automatically:

When all steps are marked completed for that journey.

5.4 Steps list & editing

For each journey, admin sees a list of LearningJourneyStep ordered by order.

Editable aspects:

sessionOutlineId: selected via dropdown of available LearningSessionOutlines (can list all outlines or those filtered by journey).

Steps are created by:

“Add step” → pick a sessionOutline from dropdown → step created at end with next order value.

Reordering:

Admin can drag & drop steps to reorder them.

On drop, order is auto-saved by calling a reorder endpoint.

If this is too heavy to implement immediately, it can be marked as “nice to have”; core logic still assumes order exists and is maintained somehow.

Non-editable/flexible aspects:

status: "locked" | "unlocked" | "completed"

Normally controlled by user progress:

First step is unlocked by default.

Subsequent steps become unlocked when previous step is completed.

Admin is allowed to override this manually in the backend if needed.

chatId / chat

Set when the user runs the step.

Admin can see a link to the chat transcript.

ahaText: String?

Short reflection / takeaway.

Editable by admin (for corrections or anonymization).

Unlock/completion semantics (recommended correction):

unlockedAt: set when the step itself becomes unlocked for the user.

completedAt: set when the step is marked completed (via mark_step_completed command or explicit action).

6. Standard Journeys & Navigation
6.1 Standard journeys definition

A standard journey is a global template journey, displayed under the “Learning Journeys” menu:

isStandard = true

status = active

personalizedForUserId = null

Users can always access standard journeys, even if they have active/pending personalized journeys.

6.2 Personalized journeys & email links

Personalized journeys:

isStandard = false

personalizedForUserId = user.id

status is irrelevant for global visibility; they are only visible to that user.

Canonical route to open a personalized journey from an email:

/journeys/[slug]?userId=...

This implies:

Personalized journeys that are emailed must have a slug.

Slug is non-editable once the journey is active.

7. UI Routes (v2)

Rename legacy /topics routes to /journeys:

/

Public landing (if user is not logged in).

If user is logged in, you can redirect to /my-profile.

/welcome

Intro card → continues to /learning-guide-intro.

/learning-guide-intro

Explains how the platform works, then starts need-analysis session.

/learning-goal-confirmation

Reads the proposed goal from client (e.g. sessionStorage.learningGoalPending).

Lets the user edit and confirm.

/whats-next

Explains what happens next (journey creation, profile, emails).

Forces login/signup if needed.

After successful login:

Save goal to DB.

Create personalized journey.

Send emails.

Redirect to /my-profile.

/journeys

Public list page of standard journeys (isStandard = true AND status = active).

Shows title + intro.

/journeys/[slug]

Journey overview page (either standard or personalized, based on isStandard and user context).

Shows intro, objectives, and ordered steps.

Step links go to /journeys/[slug]/steps/[stepId].

/journeys/[slug]/steps/[stepId]

Main coaching chat for that step.

Uses /api/chat with sessionOutlineId and journeyStepId.

/chats/history/[chatId]

Read-only transcript of a LearningSessionChat.

/my-profile

Signed-in area; top menu includes “Home”, “Learning Journeys”, “Profile”, and login/logout.

Shows:

Current learningGoal

Personalized journeys and their status

Links to standard journeys

8. API & Chat Behaviour (high-level)

You asked not to design every endpoint in detail here, but the core behaviour should be:

/api/chat:

Used for both need-analysis and journey steps.

Receives:

sessionOutlineId (always).

journeyStepId (when running a journey step session).

Creates or updates a LearningSessionChat record with those FKs.

Persists Message entries.

Emits commands (create_learning_goal, mark_step_completed) in Message.command.

Goal confirmation + journey creation:

Implemented in /whats-next backend logic (or a dedicated endpoint it calls).

Must:

Require authenticated user.

Update User.learningGoal and learningGoalConfirmedAt.

Create new LearningJourney (non-standard, personalized).

Send user + admin emails.

Admin activation:

A dedicated endpoint e.g. /api/admin/journeys/:id/activate-user-journey.

Sets status = "active".

Ensures journey is only visible to that user.

Sends a “journey activated” email with link /journeys/[slug]?userId=....

LLM Provider Selection
The platform can run on either Aliyun Qwen or OpenAI ChatGPT as the underlying LLM provider.
The active provider is controlled through the environment variable:

DEFAULT_API="aliyun"   # set to "chatgpt" to switch providers


All /api/chat requests route through a unified abstraction layer that selects the correct API client based on this setting. The default provider is Aliyun; switching to ChatGPT requires no code changes—only updating the environment variable.

9. Content, Prompts & Logging

Source of truth for journeys and sessions is the database (LearningJourney, LearningSessionOutline).

A file-based prompt template for journey generation is kept at e.g. /prompts/learning-journey-creation.txt and used as a user message in the AI call that generates title, intro, objectives for new personalized journeys.

Raw AI requests/responses should be logged in dev mode (e.g. server logs) to aid debugging.

10. Need-analysis as part of a standard journey

Define a standard journey called “Goal Clarification” that contains the need-analysis session as a step.

10.1 Standard Journey definition

LearningJourney

title = "Goal Clarification"

slug = "goal-clarification"

isStandard = true

personalizedForUserId = null

status = "active"

This is your official entry-point journey.

10.2. Need-analysis session outline

Create a LearningSessionOutline:

journeyId → “Goal Clarification”

slug = "need-analysis"

title = "Need Analysis"

status = active

objective = "Help the user clarify and articulate a concrete learning goal."

content = complete instructions describing how the bot facilitates the goal-clarification conversation.

firstUserMessage = whatever opening line you want (e.g., “Before we begin, tell me briefly what brings you here.”).

botTools must specify the JSON command below (see section 3).

10.3. Correct botTools content (final)

This is the instruction your coding assistant should embed in the DB row for the need-analysis outline.

Use this:

You have one special JSON command available in this session.

When the user reaches a clear, specific and agreed-upon learning goal, you must send a single assistant message whose content is exactly this JSON object (and nothing else):

{
  "command": "create_learning_goal",
  "learningGoal": "<final goal text>"
}

Rules:
- Only send this JSON when the goal is concrete and validated with the user.
- Do not include any text before or after the JSON.
- Do not send this JSON more than once.
- Until the goal is clear, continue asking clarifying questions.


This ensures:

The frontend can reliably detect the command.

The chat is fully controlled.

The JSON parsing always works.

10.4. Need-analysis step inside the “Goal Clarification” journey

Create a LearningJourneyStep:

journeyId → “Goal Clarification”

sessionOutlineId → need-analysis outline ID

order = 1

status = "unlocked" for template

chatId = null (each user will have their own)
