/welcome — Additional Notes 

Purpose

First emotional introduction after landing.

Leads directly to /learning-guide-intro.

Structure

One centered glass-effect card (same style as global guidelines).

Large Playfair Display title.

Three paragraphs: two normal + one italic.

Content (verbatim)

Title: Welcome to leadership-factory.cn!

P1: It’s a space created to help you grow, reflect, and become the best version of yourself.

P2: Because every journey begins with a single step.

P3 italic: Let’s take your first step together.

Button

Label: CONTINUE

Action: navigate to /learning-guide-intro.

Icon

Gold circular icon on the top-left inside the card (same icon style already defined).

Responsive

Card centered on all screen sizes.

On mobile: width ~90%, font sizes adapt.

/learning-guide-intro — Additional Notes

Purpose

Introduces the “learning guide” persona.

Prepares the user for the need-analysis session.

Leads directly to the chat trigger.

Text Content (verbatim)

Title (Playfair):
“I'm your learning guide, here to guide your journey of discovery and growth.”

Body paragraph 1:
“I'll ask you a few easy questions about what you'd like to work on, such as your goals, confidence, communication, relationships, or everyday challenges.”

Body paragraph 2:
“Your answers will help me create a personalized learning path.”

Italic line:
“When you're ready, let's begin.”

Button

Label: I’M READY

Action: navigate to /journeys/goal-clarification/steps/[need-analysis-step-id].

Icon

Same gold circular icon as /welcome, top-left inside the card.

Layout

Same glass card style as /welcome.

Identical spacing and typography structure.

/learning-goal-confirmation — Additional Notes

Purpose

Shows the AI-generated learning goal summary.

Lets the user edit or confirm their learning goal.

When confirmed, user proceeds to /whats-next.

Layout

Same centered glass card as previous pages.

Same gold circular icon top-left.

Content (static parts only)
Title (Playfair Display)

“Let me see if I understood:”

Goal Text

Inserted dynamically from bot JSON (learningGoal).

Positioned as a full-width paragraph.

Includes a small edit icon (pencil) inline on the right side.

Instruction line (italic, Inter)

“Please confirm it or edit it and I'll recommend a learning journey for you.”

Interactions
Edit icon (pencil)

Opens an inline text editor (same card) or a modal — your choice.

Edited text replaces the dynamic goal text.

Confirm Button

Label: Confirm

On click:

Save the goal into temporary state (sessionStorage or client state).

Redirect to /whats-next.

/whats-next — Additional Notes

Purpose

Confirms to the user that their goal was received.

Shows the goal again inside a highlighted box.

Informs them that the team (or system) will prepare their personalized journey.

Ensures the user is logged in.

The main CTA commits the goal → triggers journey creation → redirects to profile.

Static Content (verbatim, excluding goal text)
Main title (Playfair)

“You did it!”

Intro paragraph

“Congratulations on writing down your learning goal. You just unlocked the very first step toward the best version of yourself.”

Learning Goal Box

Full-width rounded rectangle.

Background: soft lavender/purple tint (not used elsewhere).

Header inside the box:
YOUR LEARNING GOAL (uppercase, small, muted purple).

Under it: AI-generated goal text (dynamic).

Below the Box (two paragraphs)

“Our team will now review your goal and prepare a tailor-made learning journey that fits what you shared.”

“We will reach out very soon. In the meantime, please make sure you are signed in so we can send the details to your inbox.”

Button

Label: YES, I’m in!

Style: gold pill button (same as other pages).

On click:

Ensure user is logged in
(open inline auth modal or redirect if needed).

Save the learning goal into DB.

Create the personalized journey (draft).

Redirect to /my-profile.

Layout

Same centered glass card.

No icon in this screen.

More vertical padding than /learning-guide-intro.