// This page shows the welcome screen using the shared intro card.
import IntroCard from "../components/IntroCard";

const welcomeParagraphs = [
  { text: "It's a space created to help you grow, reflect, and become the best version of yourself." },
  { text: "Because every journey begins with a single step." },
  { text: "Let's take your first step together.", italic: true },
];

export default function WelcomePage() {
  return (
    <IntroCard
      title="Welcome to leadership-factory.cn!"
      paragraphs={welcomeParagraphs}
      button={{ label: "CONTINUE", href: "/learning-guide-intro" }}
    />
  );
}
