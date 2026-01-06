// This page introduces the learning guide and links to the placeholder chat route.
import IntroCard from "../components/IntroCard";

const guideParagraphs = [
  {
    text: "I'll ask you a few easy questions about what you'd like to work on, such as your goals, confidence, communication, relationships, or everyday challenges.",
  },
  { text: "Your answers will help me create a personalized learning path." },
  { text: "When you're ready, let's begin.", italic: true },
];

export default function LearningGuideIntroPage() {
  return (
    <IntroCard
      title="I'm here to help. Let's figure out what you want to work on."
      paragraphs={guideParagraphs}
      button={{ label: "I'M READY", href: "/define-your-goal" }}
    />
  );
}
