-- This migration adds the goal chat id to journeys.
ALTER TABLE "LearningJourney" ADD COLUMN "goalChatId" TEXT;
