Step 1 — New DB schema + seed “Goal Clarification”

Goal: Have the new Prisma schema in place and the basic seed data for the first journey/session.

Step 2 — Public funnel pages only (no chat yet)

Goal: /, /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next exist visually and navigate correctly with fake data.

Step 3 — /api/chat + need-analysis chat using new models

Goal: Have a working chat that uses the new schema and emits create_learning_goal.

Step 4 — Wire create_learning_goal → /learning-goal-confirmation

Goal: When the bot emits create_learning_goal, you land on /learning-goal-confirmation with real data.

Step 5 — Auth + goal commit endpoint from /whats-next

Goal: Make /whats-next persist the goal and create a personalized journey (no admin UI yet).

Step 6 — Full working /my-profile + /journeys listing

Goal: Give the user somewhere meaningful to land and see their journeys.

Step 7 — Journey overview + steps + mark_step_completed

Goal: Fully working journeys and step sessions.

Step 8 — admin-sessions UI

Goal: CRUD for LearningSessionOutline.

Step 9 — admin-journey UI

Goal: Full control over journeys and steps.

Step 10 — Email infrastructure & polish

Goal: Production-grade notifications and logging.

Git branches for each implementation:

feature/202512051223-step-1-schema-and-seed

feature/202512051537-step-2-public-funnel

feature/202512062021-step-3-chat-v2-need-analysis

feature/202512071559-step-4-goal-confirmation-flow

feature/202512072009-step-5-auth-whats-next-commit-goal

feature/202512081003-step-6-profile-and-journey-list

feature/2025xx-journeys-and-steps

feature/2025xx-admin-sessions

feature/2025xx-admin-journeys

feature/2025xx-email-and-ai-logging