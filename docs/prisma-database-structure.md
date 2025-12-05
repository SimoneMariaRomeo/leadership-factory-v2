##Prisma Database

model User {
  id                      String   @id @default(cuid())
  name                    String?
  email                   String?  @unique
  phone                   String?  @unique
  passwordHash            String
  picture                 String?
  role                    String                // "user" | "admin"
  learningGoal            String?
  learningGoalConfirmedAt DateTime?
  botRole                 String
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt

  // Relations
  chats                   LearningSessionChat[]
  journeys                LearningJourney[]      @relation("UserJourneys")    // personalized journeys
}

model LearningSessionChat {
  id                        String                @id @default(cuid())
  userId                    String?
  user                      User?                 @relation(fields: [userId], references: [id])

  sessionOutlineId          String?
  sessionOutline            LearningSessionOutline? @relation(fields: [sessionOutlineId], references: [id])

  sessionTitle              String?
  startedAt                 DateTime
  endedAt                   DateTime?
  lastMessageAt             DateTime?
  metadata                  Json?

  messages                  Message[]
}

model Message {
  id        String               @id @default(cuid())
  chatId    String
  chat      LearningSessionChat  @relation(fields: [chatId], references: [id])
  role      String               // "user" | "assistant" | "system"
  content   String
  command   Json?
  createdAt DateTime             @default(now())
}

model LearningJourney {
  id                    String    @id @default(cuid())
  slug                  String?   @unique         
  order                 Int?
  title                 String
  intro                 String?
  objectives            Json?

  isStandard            Boolean   @default(false)
  personalizedForUserId String?                      // null = template, not null = personal journey
  personalizedForUser   User?     @relation("UserJourneys", fields: [personalizedForUserId], references: [id])

  userGoalSummary       String?

  status                String    // "draft" | "awaiting_review" | "active" | "completed" | "archived"

  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  // Relations
  outlines              LearningSessionOutline[]
  steps                 LearningJourneyStep[]
}

model LearningSessionOutline {
  id               String   @id @default(cuid())
  journeyId        String
  journey          LearningJourney @relation(fields: [journeyId], references: [id])

  slug             String 
  order            Int
  live             Boolean  @default(false)
  title            String
  objective        String?
  content          String
  botTools         String             // plain text with instructions for JSON commands
  firstUserMessage String
  tags             Json?

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  steps            LearningJourneyStep[]
  @@unique([journeyId, slug])
}

model LearningJourneyStep {
  id                 String   @id @default(cuid())
  journeyId          String
  journey            LearningJourney @relation(fields: [journeyId], references: [id])

  sessionOutlineId   String
  sessionOutline     LearningSessionOutline @relation(fields: [sessionOutlineId], references: [id])

  order              Int
  status             String   // "locked" | "unlocked" | "completed"

  chatId             String?
  chat               LearningSessionChat? @relation(fields: [chatId], references: [id])

  ahaText            String?
  unlockedAt         DateTime?
  completedAt        DateTime?

  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
