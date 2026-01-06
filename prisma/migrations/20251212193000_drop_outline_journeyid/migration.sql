-- This migration removes the obsolete journeyId/live columns from outlines.
ALTER TABLE "LearningJourneyStep" DROP CONSTRAINT IF EXISTS "LearningJourneyStep_journeyId_sessionOutlineId_fkey";
ALTER TABLE "LearningSessionOutline" DROP CONSTRAINT IF EXISTS "LearningSessionOutline_journeyId_fkey";
DROP INDEX IF EXISTS "LearningSessionOutline_journeyId_slug_key";
DROP INDEX IF EXISTS "LearningSessionOutline_journeyId_id_key";
DROP INDEX IF EXISTS "LearningSessionOutline_slug_key";
ALTER TABLE "LearningSessionOutline" DROP COLUMN IF EXISTS "journeyId";
ALTER TABLE "LearningSessionOutline" DROP COLUMN IF EXISTS "live";
CREATE UNIQUE INDEX "LearningSessionOutline_slug_key" ON "LearningSessionOutline"("slug");
ALTER TABLE "LearningJourneyStep" DROP CONSTRAINT IF EXISTS "LearningJourneyStep_sessionOutlineId_fkey";
ALTER TABLE "LearningJourneyStep"
  ADD CONSTRAINT "LearningJourneyStep_sessionOutlineId_fkey"
    FOREIGN KEY ("sessionOutlineId") REFERENCES "LearningSessionOutline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Reintroduce the chat step reference that matches the Prisma schema.
ALTER TABLE "LearningSessionChat" DROP CONSTRAINT IF EXISTS "LearningSessionChat_stepId_fkey";
ALTER TABLE "LearningSessionChat" ADD COLUMN IF NOT EXISTS "stepId" TEXT;
ALTER TABLE "LearningSessionChat"
  ADD CONSTRAINT "LearningSessionChat_stepId_fkey"
    FOREIGN KEY ("stepId") REFERENCES "LearningJourneyStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
