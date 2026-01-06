-- This migration removes the old step chatId link if it is still around.
ALTER TABLE "LearningJourneyStep" DROP CONSTRAINT IF EXISTS "LearningJourneyStep_chatId_fkey";
DROP INDEX IF EXISTS "LearningJourneyStep_chatId_key";
ALTER TABLE "LearningJourneyStep" DROP COLUMN IF EXISTS "chatId";
