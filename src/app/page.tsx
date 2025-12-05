// This page shows the public landing hero with the main Start button.
import GoldButton from "./components/GoldButton";

export default function HomePage() {
  // This keeps the landing focused on a single glowing Start action.
  return (
    <main className="page-shell">
      <div className="bg-orbs" aria-hidden="true" />
      <div className="start-hero">
        <div className="start-ring" aria-hidden="true" />
        <GoldButton href="/welcome" className="solo-start">
          Start
        </GoldButton>
      </div>
    </main>
  );
}
