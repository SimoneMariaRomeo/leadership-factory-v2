feature/202512121757-step-10-email-and-final-polish

Please implement the remaining gaps per docs/features.md:

Chat transcript page
Add /chats/history/[chatId]: read-only transcript for a LearningSessionChat, showing messages ordered by createdAt.
Require auth; if not logged in, prompt login and return to the transcript.
Use the existing chat fonts/styles and keep it simple (no composer).
Journey activation email
When an admin sets a personalized journey to active, send the user a “journey activated” email with a link to /journeys/[slug]?userId=....
Only send when transitioning into active; don’t resend on other updates.
Duplicate journey
In admin, add a “Duplicate” action to clone a journey (including steps) into a new journey.
New journey: isStandard=false, personalizedForUserId=null, status="draft", and a unique slug (e.g., append “-copy” with a counter).
Steps should point to the same outlines; orders preserved.
Auto-complete journey when all steps are completed
When a user completes the last step (or all steps are already completed), set journey status to completed automatically.
Do not auto-change status if the journey is draft/awaiting_review; only apply when currently active.
Keep admin override intact.
Admin view: link to chat transcripts
In admin/journeys steps list, show all chats for a step with links to /chats/history/[chatId] (once the transcript page exists).
Keep userGoalSummary in sync
When User.learningGoal changes, update userGoalSummary on the most recent non-archived personalized journey; do not change older journeys.
Ensure this runs on goal confirmation and any explicit goal updates.
