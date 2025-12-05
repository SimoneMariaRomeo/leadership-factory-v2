follow the AGENTS.md instructions and implement the step below. Check the overall features to ensure your implementation is aligned to the bigger picture/project scope.
After that, implement the tests below.

Step 2 — Public funnel pages only (no chat yet)

Goal: /, /welcome, /learning-guide-intro, /learning-goal-confirmation, /whats-next exist visually and navigate correctly with fake data.

Implement layout + visual style (fonts, gradients, glass cards, buttons).

Implement:

/ with Start → /welcome.

/welcome → /learning-guide-intro.

/learning-guide-intro → temporary hardcoded route (e.g. /journeys/goal-clarification/steps/TEST) or just a placeholder page.

/learning-goal-confirmation that shows a dummy goal from local hardcoded state.

/whats-next showing a dummy goal and the YES, I’M IN! button with a no-op handler.


TESTS TO CREATE
Create a test file (public-funnel-tests) to test the project functionality (see the names below). For each test file, add natural language logs that explain what is being tested (expected behavior) with very clear, human readable explanations

A. Public funnel navigation & page content

Landing → Welcome navigation

Open /.

Click the primary Start button.

Assert redirect to /welcome.

Welcome page content

On /welcome, assert:

Title: “Welcome to leadership-factory.cn!”

Three paragraphs with the exact texts specified.

Button label: CONTINUE.

Click CONTINUE → assert redirect to /learning-guide-intro.

Learning-guide-intro page content & CTA

On /learning-guide-intro, assert:

Title text matches the “I'm your learning guide…” sentence.

Two body paragraphs + italic line.

Button label: I’M READY.

Click I’M READY → assert navigation to the need-analysis entry route
/journeys/goal-clarification/steps/[need-analysis-step-id].

B. Need-analysis chat + JSON command

Need-analysis chat uses the correct outline

From /learning-guide-intro, click I’M READY.

Assert:

The page renders chat UI.

The backend /api/chat is called with the sessionOutlineId of the seeded need-analysis outline and the journeyStepId of the correct step.

Prompt construction fields are present

On the first request to /api/chat for need-analysis, assert (via test logs/mocks) that:

User.botRole is included.

LearningSessionOutline.objective, content, botTools, firstUserMessage are included.

LearningJourney.userGoalSummary is “not defined yet” (or omitted) for first-time users.

Assistant can emit create_learning_goal JSON

Simulate/model the assistant response containing:

{ "command": "create_learning_goal", "learningGoal": "Improve my executive communication skills" }


Assert:

The response is stored in Message.command for the last message in DB.

useChat detects the command and does not render it as plain text.

Redirect to /learning-goal-confirmation on create_learning_goal

After the assistant sends the above JSON:

Assert useChat stores the learningGoal client-side (e.g. sessionStorage key exists).

Assert the browser is redirected to /learning-goal-confirmation.

C. Learning-goal-confirmation behaviour

Goal text is displayed correctly

On /learning-goal-confirmation after the previous step:

Assert the goal paragraph equals the learningGoal from the JSON.

Assert the header “Let me see if I understood:” is visible.

Assert the italic instruction line is visible.

Inline edit of goal

Click the pencil icon.

Change the goal text to a new value.

Click the Confirm button.

Assert:

The edited value is what gets saved in client state (check sessionStorage or the next page).

Browser navigates to /whats-next.

Direct access without pending goal

Open /learning-goal-confirmation in a fresh browser session without any prior chat.

Assert:

Either a safe fallback is shown (e.g. “No goal available, please start from the beginning”)

Or the user is redirected back to / or /learning-guide-intro (define expected behaviour and assert).

D. Whats-next: login, goal commit & journey creation

Whats-next displays the goal and explaining text

After confirming on /learning-goal-confirmation, on /whats-next:

Assert the goal box shows the edited goal text.

Assert the static texts (“You did it!”, “Congratulations…”, “Our team will now review…”, etc.) are present.

Assert the YES, I’M IN! button is visible.

YES, I’M IN! forces login for guests

Start as not logged-in user.

Reach /whats-next with a pending goal.

Click YES, I’M IN!.

Assert:

Auth modal / login form appears.

No call to the goal-commit endpoint is made before successful login.

Goal commit for a new user

From /whats-next, after successful login:

Click YES, I’M IN!.

Assert:

The frontend sends a request to the goal-commit backend (e.g. POST /api/goal/commit) with the goal from client state.

Response status is 200.

DB state after goal commit

After the goal-commit response:

Assert in DB:

User.learningGoal equals the confirmed goal.

User.learningGoalConfirmedAt is set (within a small time window).

Exactly one new LearningJourney exists with:

isStandard = false

personalizedForUserId = current user.id

userGoalSummary = confirmed goal

status = "awaiting_review"

Assert the user is redirected to /my-profile.

Emails are triggered

In test mode, mock the email service.

After goal commit:

Assert one email to the user address is sent with:

Subject/body mentioning the learning goal.

Assert one email to the admin address is sent with:

User email.

Learning goal.

A link pointing to the admin journey view (e.g. /admin/journeys/... or equivalent).

/my-profile content after commit

On /my-profile immediately after redirect:

Assert:

Shows User.learningGoal.

Lists the newly created personalized journey with status = "awaiting_review".

Standard journeys (if any) are listed under a “Learning Journeys” or equivalent section.

E. Repeat need-analysis behaviour

User with existing goal runs need-analysis again

Use a logged-in user who already has learningGoal and at least one personalized journey.

Run the entire funnel again (from /learning-guide-intro → chat → /learning-goal-confirmation → /whats-next → YES, I’M IN!).

Assert:

After commit:

User.learningGoal is overwritten with the new goal.

User.learningGoalConfirmedAt is updated.

A new personalized LearningJourney is created (status = "awaiting_review").

The previous journeys are still present in DB (not deleted).

Multiple journeys shown in profile

After the second commit:

On /my-profile, assert the user now sees two personalized journeys (old + new) with their respective statuses.

F. Guest abandonment behaviour

Guest abandons before login

As a not-logged-in user, run need-analysis until create_learning_goal is emitted and /learning-goal-confirmation is shown.

Then:

Close the tab or navigate away without ever clicking YES, I’M IN! on /whats-next.

Assert:

No new User is created (if you rely on explicit signup).

No LearningJourney is created.

No emails are sent.

G. Security / isolation checks

Cannot create journey for another user

While logged in as user A:

Attempt, via crafted request, to call the goal-commit endpoint with another userId in the payload.

Assert:

Backend ignores the client-provided userId and uses the authenticated user.

No journey is created for any user other than A.

Personalized journeys are not public

After at least one personalized journey exists for user A:

As anonymous OR logged-in user B:

Visit /journeys (public list).

Assert personalized journeys are not shown there.

If you try to hit /journeys/[slug]?userId=A as user B:

Assert access is denied or redirected (according to your access rules).