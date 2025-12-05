implement the step below. Check the overall features to ensure your implementation is aligned to the bigger picture/project scope.
After that, implement the tests below.

Step 1 — New DB schema + seed “Goal Clarification”

Goal: Have the new Prisma schema in place and the basic seed data for the first journey/session.

Implement the new Prisma models:

User, LearningSessionChat, Message, LearningJourney, LearningSessionOutline, LearningJourneyStep.

Add @@unique([journeyId, slug]) on LearningSessionOutline.

Write a seed script that:

Creates standard journey Goal Clarification (slug = "goal-clarification", isStandard = true, status = "active").

Creates LearningSessionOutline for need-analysis.

Creates a LearningJourneyStep for need-analysis (order = 1, status = "unlocked").


TESTS TO CREATE
Create a test file (schema-and-seed-tests) to test the project functionality (see the names below). For each test file, add natural language logs that explain what is being tested (expected behavior) with very clear, human readable explanations

1. Schema migration succeeds and models exist

Running prisma migrate dev completes without error.

All models are present in the DB: User, LearningSessionChat, Message, LearningJourney, LearningSessionOutline, LearningJourneyStep.

2. Seed creates exactly one “Goal Clarification” journey

After running the seed, there is exactly one LearningJourney with:

title = "Goal Clarification"

slug = "goal-clarification"

isStandard = true

status = "active"

personalizedForUserId = null.

3. Standard journey visibility invariants

For the seeded journey:

isStandard = true implies personalizedForUserId is null.

Test creating a second journey where:

If isStandard = true and personalizedForUserId is set → operation must fail (or be rejected by application-level validation).

4. Need-analysis outline exists and is linked to “Goal Clarification”

After seed:

There is exactly one LearningSessionOutline with:

slug = "need-analysis"

title = "Need Analysis"

journeyId matching the “Goal Clarification” journey.

5. Need-analysis outline fields match spec

For that outline, assert:

objective is non-empty and set.

content is non-empty (instructions text).

botTools contains the instruction mentioning:

JSON with "command": "create_learning_goal" and "learningGoal".

firstUserMessage is non-empty.

6. Need-analysis step exists and is correctly wired

After seed:

There is exactly one LearningJourneyStep for the “Goal Clarification” journey.

It has:

order = 1

status = "unlocked"

sessionOutlineId pointing to the need-analysis outline.

chatId = null.

7. Journey → outlines and steps relations work

Using Prisma relations:

Loading the “Goal Clarification” journey with include: { outlines: true, steps: true }:

outlines array contains the need-analysis outline.

steps array contains the expected step.

LearningJourneyStep.sessionOutline and LearningSessionOutline.journey resolve correctly.

8. LearningSessionOutline slug uniqueness per journey

Try to create a second LearningSessionOutline with:

Same journeyId and same slug = "need-analysis" → should fail due to @@unique([journeyId, slug]).

Creating an outline with slug = "need-analysis" under a different journey should succeed.

9. LearningJourney.slug uniqueness

Try to create another LearningJourney with slug = "goal-clarification" → should fail due to @unique.

Creating a journey with a different slug should succeed.

10. Defaults and timestamps

For the seeded journey, outline, and step:

createdAt is set (not null).

updatedAt is set and equal or later than createdAt.

Creating a new journey/outline/step in tests:

Confirms createdAt defaults and updatedAt auto-update behavior.