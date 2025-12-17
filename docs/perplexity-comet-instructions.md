<!-- This file tells Perplexity Comet what to do and how to report in a helpful way. -->
# Perplexity Comet: Real User Journeys (Go‑Live Checks)

## Your job
You are testing a leadership coaching website like a normal person would.
You will click around, try to finish the “start → chat → confirm goal → sign up → see your saved info” flow, and report anything that feels wrong.

Please do not use technical words. Say what you saw and what you felt.

## Most important check (privacy)
You MUST verify that two people cannot see each other’s chat messages.
This is the most important check.

## Test accounts (use these if you need them)
If you need to sign up or log in, you can use:
- User A email: `marsario@gmail.com`
- User B email: `marsario+2@gmail.com`
- Password (for both): `trial-marsword`
- Name to use: `Mario Sario`

If a page asks for a “learning goal”, you can use:
- “I want to become a calmer leader in stressful meetings, so I can speak clearly and set better boundaries.”

## How to report (very important)
For each journey below, write:
1) What you tried (short)
2) What happened (short)
3) Did you feel stuck? (yes/no + where)
4) Any privacy risk? (yes/no)
5) One screenshot if something looks wrong (include the full page, not just the popup)

If something is confusing, write the exact text you saw (copy/paste).
If something is slow, estimate how long (example: “about 10 seconds”).

## Setup (before you start)
You will run some steps in two browsers at the same time.
Pick TWO different browsers (example: Chrome and Firefox), or use one normal window + one Incognito/Private window.
Call them:
- Browser A
- Browser B

Do not log in until a step tells you to.

---

## 10 real user journeys to test

### Journey 1 — First visit: can you find the start?
Goal: A new person understands what to do next.
Steps:
1) Open the home page.
2) Scroll a little and look for the main “start” button.
3) Click the main start button until you reach the need-analysis chat.
What “good” looks like:
- You can find the start without guessing.
- The page explains what will happen in simple words.

### Journey 2 — Privacy check: two guests chatting at the same time
Goal: Two different people do not see each other’s chat text.
Steps:
1) In Browser A (not logged in), open the need-analysis chat and send 2 messages (example: “Hi” and “I want to work on confidence”).
2) In Browser B (not logged in), open the need-analysis chat and send 2 different messages (example: “Hello” and “I struggle with feedback”).
3) Keep both chats open and send 1 more message in each browser.
What “good” looks like:
- Browser A never shows Browser B’s messages.
- Browser B never shows Browser A’s messages.
Red flag:
- You see the other person’s text, even once.

### Journey 3 — Need-analysis chat → “goal created” moment
Goal: The chat leads you to a clear goal and moves you forward.
Steps:
1) In one browser (still not logged in), continue chatting until the app sends you to the goal confirmation page.
2) Confirm you can see a goal written on the page.
What “good” looks like:
- The chat feels natural and not confusing.
- You get moved to the next page without you hunting for it.

### Journey 4 — Goal confirmation: edit the goal and keep it
Goal: Editing works and the final saved goal matches what you edited.
Steps:
1) On the goal confirmation page, edit the goal text (change at least 5–10 words).
2) Continue to the next step.
What “good” looks like:
- Your edited goal stays edited.
- The wording on buttons and titles is clear.

### Journey 5 — Whats-next: get a journey suggestion and try “recommend another”
Goal: The recommended journey shows up and the “recommend another journey” button works.
Steps:
1) On the whats-next page, wait for the recommended journey title + intro to appear.
2) Click “Recommend another journey” once.
3) Confirm the title changes (or at least it clearly refreshes).
What “good” looks like:
- You see a clear title and intro.
- If it takes time, it says that in a friendly way.

### Journey 6 — Sign up and save: finish the funnel
Goal: You can sign up and end up with your goal saved.
Steps:
1) On the whats-next page, click “YES, I’M IN!”.
2) If you see a login/sign-up window, sign up (or log in) as User A.
3) After success, you should land on “My Profile”.
4) Confirm the saved goal matches your edited goal from Journey 4.
What “good” looks like:
- You end up on My Profile.
- Your goal text matches what you edited.
- You do not get stuck in a loop.

### Journey 7 — Chat history: you see your own chat from before login
Goal: The earlier need-analysis conversation shows up after login.
Steps:
1) On My Profile, find “Your Previous Conversations”.
2) Open the most recent conversation.
3) Confirm it contains the same topic you talked about before login.
What “good” looks like:
- The chat is there and looks like your conversation.
- It does not show someone else’s messages.

### Journey 8 — Privacy check: User B cannot see User A’s chat
Goal: A different logged-in user cannot open someone else’s chat link.
Steps:
1) Copy the URL of User A’s chat page.
2) Log out (if needed).
3) Log in as User B.
4) Paste User A’s chat URL in the address bar and open it.
What “good” looks like:
- You see a “not available” message (or you get redirected away).
- You do NOT see the chat messages.

### Journey 9 — Journeys page access rules (guest vs logged in)
Goal: Journeys are protected by login.
Steps:
1) Log out.
2) Try to open `/journeys` by typing it in the address bar.
3) Confirm you are asked to log in.
4) Log in as User A and open `/journeys` again.
What “good” looks like:
- Guests are blocked with a clear message.
- Logged-in users can see the journeys list.

### Journey 10 — “Bad day” tests: errors are clear + admin is blocked
Goal: If something goes wrong, the user gets a clear message. Normal users cannot access admin.
Steps (Part A: bad day):
1) While on a chat page, turn off internet briefly (or use airplane mode).
2) Try to send a chat message.
3) Turn internet back on and try again.
What “good” looks like:
- You get a clear error message.
- You can recover and continue.

Steps (Part B: admin blocked):
1) While logged in as User A (normal user), try to open `/admin`.
2) Try `/admin/journeys` and `/admin/sessions` too.
3) Optional: open `/api/admin/journeys` in the browser address bar.
What “good” looks like:
- You are blocked from admin screens.
- If you see a message, it is clear and polite.

---

## Final summary (1 page)
Please end with:
- A short “overall feeling” (calm / confusing / trustworthy / etc.)
- The single biggest risk you saw (if any)
- The top 3 things to fix before launch (simple words)
