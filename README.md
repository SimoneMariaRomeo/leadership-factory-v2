## Project Description

**leadership-factory-v2** is a digital coaching platform that guides users from clarifying their personal development goal to following a fully personalized learning journey, supported and refined by an admin backoffice.

The core flow begins with a public funnel (`/`, `/welcome`, `/learning-guide-intro`) that leads into a **need-analysis** session: an AI-powered chat that, through structured prompts and JSON commands, helps the user articulate a clear and specific **learning goal**. When the assistant emits the `create_learning_goal` command, the frontend routes the user to `/learning-goal-confirmation`, where they can review or edit the generated goal. Once confirmed, `/whats-next` handles login/signup, persists the goal, and creates the user’s first **personalized LearningJourney**.

The data model unifies **standard journeys** (reusable and publicly visible) and **personalized journeys** (unique to a user) into a single `LearningJourney` entity, with ordered steps (`LearningJourneyStep`) linked to reusable **session templates** (`LearningSessionOutline`). Actual chat sessions (`LearningSessionChat` + `Message`) reference both the template and the step, enabling tracking of step status (“locked/unlocked/completed”), unlock/completion timestamps, and optional takeaways.

From the user perspective, the private area `/my-profile` shows the confirmed learning goal, active personalized journeys, and access to all **standard journeys** (`/journeys`, `/journeys/[slug]`). Step sessions run as coaching chats (`/journeys/[slug]/steps/[stepId]`), and transcripts are available in `/chats/history/[chatId]`.  
On the admin side, two dedicated interfaces — **`admin-sessions`** for creating and editing session outlines, and **`admin-journey`** for managing journeys, steps, statuses, and user assignments — allow admins to review AI-generated journeys, activate them, archive them, or manually adjust their structure.

The platform uses Prisma with PostgreSQL (`User`, `LearningJourney`, `LearningSessionOutline`, `LearningJourneyStep`, `LearningSessionChat`, `Message`), includes JWT-based authentication, and sends transactional emails (learning goal creation, journey activation) via SMTP.  
The visual layer follows a consistent luxury-inspired design system (gold palette, glass-effect cards, Playfair Display + Inter typography) and relies on a shared set of graphical assets (logo, favicon, avatar set) to ensure a premium and cohesive coaching experience across all pages.

## Emails (where the text lives)

All email subjects and email text are in `src/server/notifications/email.ts`.

- Learning goal confirmed email: `sendGoalCommitEmails(...)` (triggered by `src/app/api/whats-next/route.ts`).
- Journey activated email: `sendJourneyActivatedEmail(...)` (triggered when an admin changes a personalized journey into `active`).

All links inside emails use `PRODUCTION_URL` from `.env`, for example:

- Profile link: `${PRODUCTION_URL}/my-profile`
- Journey activated link: `${PRODUCTION_URL}/journeys/<slug-or-id>?userId=<user-id>`

Important: the `userId` in the link does NOT log the person in. If they are not logged in, they will be asked to log in first, and then they will return to the same journey page.

Available in /docs:

env-contents.md 
prisma-database-structure.md 
visual-guidelines.md
