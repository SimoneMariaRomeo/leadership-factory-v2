-- This migration creates the base tables for users, chats, journeys, outlines, and steps.
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "picture" TEXT,
    "role" TEXT NOT NULL,
    "learningGoal" TEXT,
    "learningGoalConfirmedAt" TIMESTAMP(3),
    "botRole" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningSessionChat" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionOutlineId" TEXT,
    "journeyStepId" TEXT,
    "sessionTitle" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "lastMessageAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "LearningSessionChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "command" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningJourney" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "order" INTEGER,
    "title" TEXT NOT NULL,
    "intro" TEXT,
    "objectives" JSONB,
    "isStandard" BOOLEAN NOT NULL DEFAULT false,
    "personalizedForUserId" TEXT,
    "userGoalSummary" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningSessionOutline" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "live" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "objective" TEXT,
    "content" TEXT NOT NULL,
    "botTools" TEXT NOT NULL,
    "firstUserMessage" TEXT NOT NULL,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningSessionOutline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningJourneyStep" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "sessionOutlineId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "chatId" TEXT,
    "ahaText" TEXT,
    "unlockedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningJourneyStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "LearningJourney_slug_key" ON "LearningJourney"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearningSessionOutline_journeyId_slug_key" ON "LearningSessionOutline"("journeyId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearningJourneyStep_chatId_key" ON "LearningJourneyStep"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningJourneyStep_journeyId_order_key" ON "LearningJourneyStep"("journeyId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "LearningSessionOutline_journeyId_id_key" ON "LearningSessionOutline"("journeyId", "id");

-- AddCheck
ALTER TABLE "LearningJourney" ADD CONSTRAINT "LearningJourney_standard_requires_null_user" CHECK (("isStandard" = true AND "personalizedForUserId" IS NULL) OR "isStandard" = false);

-- AddForeignKey
ALTER TABLE "LearningSessionChat" ADD CONSTRAINT "LearningSessionChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningSessionChat" ADD CONSTRAINT "LearningSessionChat_sessionOutlineId_fkey" FOREIGN KEY ("sessionOutlineId") REFERENCES "LearningSessionOutline"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningSessionChat" ADD CONSTRAINT "LearningSessionChat_journeyStepId_fkey" FOREIGN KEY ("journeyStepId") REFERENCES "LearningJourneyStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "LearningSessionChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningJourney" ADD CONSTRAINT "LearningJourney_personalizedForUserId_fkey" FOREIGN KEY ("personalizedForUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningSessionOutline" ADD CONSTRAINT "LearningSessionOutline_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "LearningJourney"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningJourneyStep" ADD CONSTRAINT "LearningJourneyStep_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "LearningJourney"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningJourneyStep" ADD CONSTRAINT "LearningJourneyStep_journeyId_sessionOutlineId_fkey" FOREIGN KEY ("journeyId", "sessionOutlineId") REFERENCES "LearningSessionOutline"("journeyId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningJourneyStep" ADD CONSTRAINT "LearningJourneyStep_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "LearningSessionChat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
