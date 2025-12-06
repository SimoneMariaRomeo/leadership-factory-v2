feature/202512062021-chat-v2-need-analysis

"[Chat] create_learning_goal JSON is stored in Message.command and not rendered as text"

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

These instructions should give you a clean, constrained Step 3:

One real chat route for the need-analysis step.

A single /api/chat entry point with proper DB integration and LLM abstraction.

Clear, focused tests that only cover need-analysis chat + JSON command, without leaking into later steps (goal confirmation, /whats-next, auth, or admin).