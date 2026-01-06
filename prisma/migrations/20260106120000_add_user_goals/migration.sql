-- This migration adds user goals and moves existing goal text into the new table.
CREATE TYPE "GoalStatus" AS ENUM ('active', 'achieved');

CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "status" "GoalStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "UserGoal_userId_idx" ON "UserGoal"("userId");

ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "UserGoal" ("id", "userId", "statement", "status", "createdAt", "updatedAt")
SELECT
    md5(random()::text || clock_timestamp()::text),
    "id",
    "learningGoal",
    'active',
    COALESCE("learningGoalConfirmedAt", "createdAt", CURRENT_TIMESTAMP),
    COALESCE("learningGoalConfirmedAt", "createdAt", CURRENT_TIMESTAMP)
FROM "User"
WHERE "learningGoal" IS NOT NULL AND length(trim("learningGoal")) > 0;

ALTER TABLE "User" DROP COLUMN "learningGoal",
DROP COLUMN "learningGoalConfirmedAt";
