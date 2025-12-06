feature/202512062021-chat-v2-need-analysis

Follow AGENTS.md, prisma-database-structure.md, features.md, implementation-steps.md, visual-guidelines.md, key-pages-additional-notes.md, image-checklist.md and env-contents.md.

This step is Step 3 — /api/chat + need-analysis chat using new models

1. STEP 3 – IMPLEMENTATION (/api/chat + need-analysis chat using new models)
1.1 Goal & assumptions

Goal

Have a working need-analysis chat that:

runs on a single /api/chat endpoint,

uses the new Prisma models (LearningSessionChat, Message, LearningSessionOutline, LearningJourney, LearningJourneyStep),

loads the seeded “Goal Clarification” → “need-analysis” outline and step from DB,

builds prompts as described in features.md (section on prompt construction & botTools),

persists messages and JSON commands, including create_learning_goal.

Assumptions

Step 1 (new Prisma schema + seed “Goal Clarification”) is complete and migrations are applied.

Step 2 (public funnel pages) is implemented as Next.js App Router pages under src/app and already uses the shared visual style.

The database contains:

a standard journey "Goal Clarification" with slug = "goal-clarification",

a LearningSessionOutline with slug = "need-analysis" attached to that journey,

a LearningJourneyStep that uses that outline as its only step.

Do not touch goal confirmation, /whats-next, auth, journey creation, or admin flows in this step. Those belong to later steps.

1.2 Need-analysis step route (replace the TEST placeholder)

In Step 2, /learning-guide-intro routed the “I’M READY” button to a temporary placeholder:

/journeys/goal-clarification/steps/TEST.

For Step 3:

Remove the placeholder page at:

src/app/journeys/goal-clarification/steps/TEST/page.tsx.

Implement the real dynamic step route:

File: src/app/journeys/[slug]/steps/[stepId]/page.tsx.

Behaviour:

Route /journeys/goal-clarification/steps/need-analysis must be valid.

Treat params.slug as the journey slug and params.stepId as the session outline slug for this step (for now).

Use Prisma to find the corresponding LearningJourneyStep:

Join on LearningJourney.slug = params.slug

Join on LearningSessionOutline.slug = params.stepId for that journey.

Include:

the LearningSessionOutline record,

the LearningJourney record if needed.

If the step or outline is not found, render a simple 404-style card (same visual style) explaining that the step does not exist.

Update /learning-guide-intro CTA

In src/app/learning-guide-intro/page.tsx, update the “I’M READY” button to use next/link to:

/journeys/goal-clarification/steps/need-analysis

Keep the existing visual style and text exactly as described in key-pages-additional-notes.md.

1.3 Chat UI for the need-analysis step (client component)

Create a small, focused chat UI for the need-analysis step.

Component structure

Create a client component under the step route, e.g.:

src/app/journeys/[slug]/steps/[stepId]/NeedAnalysisChat.tsx

page.tsx (server) should:

Load the relevant LearningJourneyStep + LearningSessionOutline with Prisma.

Pass to the client component:

sessionOutlineId

journeyStepId (can be null for now if you want, but wire it if it’s available)

any display info (e.g. outline title).

UI requirements

Layout should follow the chat-style glass card described in visual-guidelines.md:

glass-effect card on top of the gradient background,

messages in bubbles, aligned left/right,

gold accents for key elements.

Elements:

scrollable message area,

text input (textarea or single line),

“Send” button (gold primary button),

typing indicator when waiting for the model response.

State & behaviour

Maintain an in-memory messages state in the client component:

Each message: { id, role: "user" | "assistant", content: string }.

Initial state:

Option A (simpler): start empty and, on first user send, backend injects firstUserMessage into the prompt.

Option B: Show LearningSessionOutline.firstUserMessage as a first “assistant” bubble on the client, and only send user replies to /api/chat.

Either is acceptable, as long as the backend uses firstUserMessage when building the LLM prompt (see 1.4).

On send:

Push the user message into local messages.

Call /api/chat with:

chatId (if known, can be null for first request),

sessionOutlineId,

journeyStepId (optional),

the list of user/assistant messages so far (excluding any system/prompt text).

Disable the input while waiting.

Append the assistant reply to messages when the response returns.

If the response contains a JSON command (see 1.5), do not render that JSON as plain text in the chat bubbles.

No streaming required for now: a simple fetch with full response is enough.

1.4 /api/chat endpoint and core chat logic

Implement a reusable chat handler plus a thin API route.

Core handler (testable function)

Create a pure async function in e.g.:

src/server/chat/handleChat.ts

Suggested signature (you can adjust names, but keep the idea):

export async function handleChat({
  userId,               // string | null
  sessionOutlineId,     // string
  journeyStepId,        // string | null
  chatId,               // string | null
  messages              // Array<{ role: "user" | "assistant"; content: string }>
}): Promise<{
  chatId: string;
  assistantMessage: { role: "assistant"; content: string | null; command: any | null };
}>


Responsibilities:

Load DB entities

Load the LearningSessionOutline by sessionOutlineId.

If journeyStepId is provided, load the LearningJourneyStep and its LearningJourney.

If journeyStepId is null (for a pure outline-based session), you can skip loading the step and journey, but still handle chat creation.

Build the LLM prompt (as in features.md → prompt structure):

Use:

User.botRole if userId is available, or a safe default if not.

LearningSessionOutline.objective

LearningSessionOutline.content

LearningSessionOutline.botTools

LearningJourney.userGoalSummary when available (otherwise “not defined yet” or omitted).

LearningSessionOutline.firstUserMessage as the first user message for the model on the backend side.

The client messages represent the interactive part; backend combines them with the static preamble.

LLM provider abstraction

Implement a small callChatModel helper in e.g. src/server/llm/client.ts:

Reads process.env.DEFAULT_API ("aliyun" or "chatgpt").

Dispatches to either:

Aliyun Qwen client (using ALIBABA_CLOUD_API_KEY), or

OpenAI ChatGPT client (using OPENAI_API_KEY).

No need for streaming; return the full assistant text as a string.

handleChat calls callChatModel(...) with the constructed prompt.

Persist chat and messages

If chatId is null:

Create a new LearningSessionChat row with:

userId (can be null for guests at this stage),

sessionOutlineId,

journeyStepId (if provided),

appropriate timestamps (startedAt, lastMessageAt).

If chatId is provided:

Load that LearningSessionChat and update lastMessageAt.

For every user message in the request, ensure there is a Message row with:

chatId,

role = "user",

content as provided.

Create a Message row for the assistant reply with:

role = "assistant",

content = full raw assistant reply as string, even if it is JSON.

command = parsed JSON object if the content is exactly a JSON command, otherwise null.

(Parsing rules in 1.5.)

Return value to the API route

Return:

chatId (newly created or existing),

assistantMessage object with:

content = plain text content if it’s a normal reply, or null if the reply was a pure JSON command,

command = parsed JSON command object if a valid create_learning_goal command was detected, otherwise null.

API route

File: src/app/api/chat/route.ts.

Implement export async function POST(req: Request) that:

Parses JSON body with:

chatId (string | null),

sessionOutlineId (string),

journeyStepId (string | null),

messages (the client-side messages array).

Calls handleChat({ ... }).

Returns JSON:

{
  "chatId": "...",
  "assistantMessage": {
    "content": "string | null",
    "command": { ... } | null
  }
}


Handles errors with a 500 status and a simple JSON error structure (and console.error in dev).

Client wiring

The NeedAnalysisChat component should:

Call /api/chat on submit, passing the current chatId (if any), sessionOutlineId, journeyStepId, and messages.

Update local chatId from the response.

If assistantMessage.content is non-null, append it to the chat bubbles.

If assistantMessage.command is non-null, do not render the raw JSON; for Step 3, you can:

log it to the console, or

show a small non-intrusive banner like “Goal command detected (Step 4 will use this).”

Important: Do not implement the redirect to /learning-goal-confirmation yet. That belongs to Step 4.

2. STEP 3 – TESTS (NEED-ANALYSIS CHAT + JSON COMMAND)

Create a dedicated test file for Step 3 only.

File: tests/need-analysis-chat-tests.mjs (or .js, but be consistent).

Add a script in package.json (do not remove existing ones):

"scripts": {
  ...
  "test:need-analysis-chat": "node tests/need-analysis-chat-tests.mjs"
}


Follow the same style as tests/schema-and-seed-tests.js and the updated tests/public-funnel-tests.mjs:

Node script, no Jest.

Natural-language logs that describe expectations and results.

The tests must focus strictly on Step 3 scope:

Need-analysis route → chat UI.

/api/chat behaviour and prompt wiring.

JSON command persistence and non-visualisation.

No goal-confirmation redirects, no /whats-next, no profile/journey creation.

2.1 Test: Need-analysis route uses the correct outline

Name suggestion: "[Chat] Need-analysis route loads correct outline and step"

Steps:

Use Prisma in the test to confirm that the DB contains:

A LearningJourney with slug = "goal-clarification".

A LearningSessionOutline with journey.slug = "goal-clarification" and slug = "need-analysis".

A LearningJourneyStep that references that outline.

Assert:

LearningJourneyStep.sessionOutlineId matches the LearningSessionOutline.id.

The outline has non-empty objective, content, botTools, and firstUserMessage.

Log clear messages like:

"ok: found Goal Clarification journey and need-analysis outline."

"ok: need-analysis step correctly wired to the outline."

2.2 Test: Chat handler creates and reuses LearningSessionChat

Name suggestion: "[Chat] handleChat creates and reuses LearningSessionChat records"

Steps:

Import handleChat directly from src/server/chat/handleChat.ts in the test.

Prepare:

A fake LLM function that always returns a simple assistant message, e.g. "Hello, this is a test reply.".

First call:

Call handleChat with:

userId: null,

the real sessionOutlineId and journeyStepId from the DB (from 2.1),

chatId: null,

messages: [{ role: "user", content: "Hi, I'd like to improve my communication." }],

callChatModel: fakeModel.

Assert:

The returned chatId is a non-empty string.

Prisma now has exactly one LearningSessionChat row with that id, pointing to the correct sessionOutlineId and journeyStepId.

Prisma has one user Message + one assistant Message for that chat.

Second call:

Call handleChat again with the same chatId and a new user message.

Assert:

No new LearningSessionChat is created.

Additional Message rows are appended for that same chatId.

2.3 Test: Prompt construction includes outline fields and goal summary

Name suggestion: "[Chat] handleChat builds prompt with outline fields and goal summary"

Goal: Verify that handleChat uses the required fields when calling the model.

Steps:

Modify the fake LLM function in this test to record the prompt it receives and then return a dummy reply.

Call handleChat for the need-analysis step.

Assert (via logs):

The prompt text passed to callChatModel contains:

The objective of the outline.

The content of the outline.

The botTools block (or at least a recognisable portion).

The phrase “Current user goal:” followed by either the actual userGoalSummary or “not defined yet”.

It also uses LearningSessionOutline.firstUserMessage as the first user turn, either in the constructed messages or clearly in the prompt structure.

You don’t need to check for exact string equality; checking inclusion of key substrings is enough.

2.4 Test: Assistant can emit create_learning_goal JSON and it is parsed correctly

Name suggestion: "[Chat] create_learning_goal JSON is stored in Message.command and not rendered as text"

Steps:

Write a fake LLM function that returns exactly the JSON string:

{
  "command": "create_learning_goal",
  "learningGoal": "Improve my executive communication skills"
}


as the assistant’s reply.

Call handleChat with this fake model.

After the call:

Use Prisma to fetch the latest assistant Message for that chatId.

Assert:

Message.content equals the raw JSON string (the content as returned by the model).

Message.command is a parsed object with:

command === "create_learning_goal",

learningGoal === "Improve my executive communication skills".

Check the handler’s return value:

assistantMessage.content is null (or an empty string) because pure JSON commands should not be rendered as normal text.

assistantMessage.command is the same parsed object.

(Optional, but recommended) In a small React test helper or manual check, confirm that the chat UI:

Does not show the raw JSON as a bubble.

Can detect that assistantMessage.command is non-null (e.g. by logging a message).

No redirect or navigation to /learning-goal-confirmation should happen in Step 3 tests.

2.5 Test: /api/chat POST roundtrip for need-analysis

Name suggestion: "[Chat] /api/chat POST works end-to-end for need-analysis"

Goal: Validate the JSON contract between the client and the API route.

Steps:

In the test, import the POST handler from src/app/api/chat/route.ts (or better, the underlying handleChat plus a thin wrapper that mimics the route).

Create a fake Request object with a JSON body containing:

chatId: null,

real sessionOutlineId and journeyStepId,

messages: [{ role: "user", content: "I want to work on my confidence." }].

Call POST(request) and parse the JSON response.

Assert:

Status is 200.

Response JSON has a non-empty chatId.

assistantMessage exists with either:

content being a string and command null, or

content null and command an object, in the JSON-command case.

Use Prisma to confirm that the returned chatId corresponds to a LearningSessionChat row with the correct foreign keys, and that there are Message rows created as expected.