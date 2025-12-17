// This page shows the welcome screen using the shared intro card.
import IntroCard from "../components/IntroCard";

const welcomeParagraphs = [
  {
    text: "This is a space created by Simone & Robin, two L&D professionals, to support anyone who wants to become the best version of themselves.",
  },
  { text: "If you believe that improvement is a choice, click below:" },
];

export default function WelcomePage() {
  return (
    <IntroCard
      title="Welcome!"
      paragraphs={welcomeParagraphs}
      button={{ label: "START", href: "/learning-guide-intro" }}
    />
  );
}
