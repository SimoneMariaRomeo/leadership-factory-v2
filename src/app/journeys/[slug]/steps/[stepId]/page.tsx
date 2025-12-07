// This page loads the need-analysis step by slug and shows the chat card.
import NeedAnalysisChat from "./NeedAnalysisChat";
import { prisma } from "../../../../../server/prismaClient";

type StepPageProps = {
  params: { slug: string; stepId: string };
};

// This keeps the step page dynamic so it always loads fresh data.
export const dynamic = "force-dynamic";

export default async function JourneyStepPage({ params }: StepPageProps) {
  const step = await prisma.learningJourneyStep.findFirst({
    where: {
      journey: { slug: params.slug },
      sessionOutline: { slug: params.stepId },
    },
    include: {
      sessionOutline: true,
      journey: true,
    },
  });

  if (!step || !step.sessionOutline) {
    return (
      <main className="page-shell">
        <div className="bg-orbs" aria-hidden="true" />
        <div className="glass-card">
          <h1 className="hero-title">This step does not exist.</h1>
          <p className="hero-lead">Please return to your journey list and pick a valid step.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <NeedAnalysisChat
        sessionOutlineId={step.sessionOutline.id}
        journeyStepId={step.id}
        firstUserMessage={step.sessionOutline.firstUserMessage}
      />
    </main>
  );
}
