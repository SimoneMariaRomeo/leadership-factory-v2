-- Remove redundant step reference from chats and align relations
ALTER TABLE "LearningSessionChat" DROP CONSTRAINT IF EXISTS "LearningSessionChat_journeyStepId_fkey";
ALTER TABLE "LearningSessionChat" DROP COLUMN IF EXISTS "journeyStepId";

-- Drop old relation index if it exists
DROP INDEX IF EXISTS "LearningSessionChat_journeyStepId_key";
DROP INDEX IF EXISTS "LearningSessionChat_journeyStepId_idx";
